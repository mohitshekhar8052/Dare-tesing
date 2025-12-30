"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { auth, db, storage } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { 
  User, 
  Mail, 
  GraduationCap, 
  Trophy, 
  Flame, 
  Target, 
  Crown, 
  LogOut, 
  Edit2, 
  Settings, 
  Award,
  TrendingUp,
  Calendar,
  Share2,
  Bell,
  Shield,
  ChevronRight,
  Coins,
  Star,
  Check,
  Camera,
  X,
  Save
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user: authUser, userData, loading: userLoading, refreshUserData } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [profileImage, setProfileImage] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Editable fields
  const [editedName, setEditedName] = useState("")
  const [editedCollege, setEditedCollege] = useState("")
  const [editedBio, setEditedBio] = useState("")

  // User data from Firebase (now from context with fallback badges)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    college: "",
    joinDate: "",
    bio: "",
    stats: {
      daresCompleted: 0,
      rank: 0,
      coins: 0,
      streak: 0
    },
    badges: [
      { id: 1, name: "First Dare", icon: "🎯", unlocked: true, date: "Jan 2024" },
      { id: 2, name: "Week Warrior", icon: "⚡", unlocked: true, date: "Jan 2024" },
      { id: 3, name: "Social Star", icon: "⭐", unlocked: true, date: "Feb 2024" },
      { id: 4, name: "Champion", icon: "🏆", unlocked: true, date: "Feb 2024" },
      { id: 5, name: "Legend", icon: "👑", unlocked: false, date: null },
      { id: 6, name: "Elite", icon: "💎", unlocked: false, date: null }
    ],
    recentDares: [
      { id: 1, title: "Dance in Public", completed: true, coins: 150, date: "2 days ago" },
      { id: 2, title: "Talk to 5 Strangers", completed: true, coins: 120, date: "3 days ago" },
      { id: 3, title: "Sing Karaoke Solo", completed: true, coins: 200, date: "5 days ago" }
    ]
  })

  useEffect(() => {
    // Redirect if not authenticated
    if (!userLoading && !authUser) {
      router.push('/auth')
      return
    }

    // Update profile data from context
    if (userData) {
      setProfileData(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        college: userData.college,
        joinDate: userData.joinDate,
        bio: userData.bio,
        stats: userData.stats
      }))
      setEditedName(userData.name)
      setEditedCollege(userData.college)
      setEditedBio(userData.bio)
      setProfileImage(userData.profileImage || "")
    }
  }, [authUser, userData, userLoading, router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !authUser) return

    try {
      setUploadingImage(true)
      
      // Create a reference to the storage location
      const imageRef = ref(storage, `profile-images/${authUser.uid}/${Date.now()}_${file.name}`)
      
      // Upload the file
      await uploadBytes(imageRef, file)
      
      // Get the download URL
      const downloadURL = await getDownloadURL(imageRef)
      
      // Update Firestore
      const userDocRef = doc(db, "users", authUser.uid)
      await updateDoc(userDocRef, {
        profileImage: downloadURL,
        updatedAt: new Date().toISOString()
      })
      
      setProfileImage(downloadURL)
      await refreshUserData()
      
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!authUser) {
      alert("You must be logged in to update your profile")
      return
    }

    try {
      setIsSaving(true)
      setError("")
      
      const userDocRef = doc(db, "users", authUser.uid)
      
      // First check if document exists
      const userDoc = await getDoc(userDocRef)
      
      if (!userDoc.exists()) {
        // Create the document if it doesn't exist
        await setDoc(userDocRef, {
          name: editedName,
          email: authUser.email || "",
          college: editedCollege,
          bio: editedBio,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          stats: {
            daresCompleted: 0,
            rank: 0,
            coins: 0,
            streak: 0
          },
          profileCompleted: true
        })
      } else {
        // Update existing document
        await updateDoc(userDocRef, {
          name: editedName,
          college: editedCollege,
          bio: editedBio,
          updatedAt: new Date().toISOString()
        })
      }
      
      // Refresh user data from context
      await refreshUserData()
      
      setIsEditing(false)
      alert("Profile updated successfully!")
      
    } catch (error: any) {
      console.error("Error updating profile:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)
      
      let errorMessage = "Failed to update profile. "
      
      if (error.code === 'permission-denied') {
        errorMessage += "You don't have permission to update this profile."
      } else if (error.code === 'not-found') {
        errorMessage += "Profile not found. Try logging out and back in."
      } else if (error.code === 'unavailable') {
        errorMessage += "Network error. Check your connection."
      } else {
        errorMessage += error.message || "Please try again."
      }
      
      alert(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    // Reset to original values
    if (userData) {
      setEditedName(userData.name)
      setEditedCollege(userData.college)
      setEditedBio(userData.bio)
    }
    setIsEditing(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Auth guards - after all hooks
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authUser) {
    return null
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white pb-24 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pastel-coral/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-0 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-1">My Profile</h1>
            <p className="text-slate-600">Manage your account and view your stats</p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 transition-all text-slate-700 font-semibold"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Save</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all text-primary font-semibold"
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all text-red-600 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
                {uploadingImage ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : profileImage ? (
                  <img src={profileImage} alt={profileData.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-white">
                    {profileData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-slate-100 disabled:opacity-50"
              >
                <Camera className="w-4 h-4 text-primary" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="mb-4">
                {isEditing ? (
                  <>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 font-semibold mb-3"
                      placeholder="Your name"
                    />
                  </>
                ) : (
                  <h2 className="text-2xl font-black text-slate-800 mb-3">{profileData.name}</h2>
                )}

                {isEditing ? (
                  <>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                    <textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-600 text-sm resize-none mb-4"
                      rows={3}
                      placeholder="Tell us about yourself"
                    />
                  </>
                ) : (
                  <p className="text-slate-600 text-sm mb-4">{profileData.bio}</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                {isEditing ? (
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-4 h-4 text-secondary mt-3" />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={editedCollege}
                        onChange={(e) => setEditedCollege(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="Your college name"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap className="w-4 h-4 text-secondary" />
                    <span className="text-sm">{profileData.college || "Add your college"}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-4 h-4 text-pastel-coral" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Dares Completed", value: profileData.stats.daresCompleted, icon: Target, color: "from-primary to-purple-600" },
            { label: "Current Rank", value: `#${profileData.stats.rank}`, icon: Trophy, color: "from-secondary to-blue-600" },
            { label: "Total Coins", value: profileData.stats.coins, icon: Coins, color: "from-pastel-coral to-pink-600" },
            { label: "Day Streak", value: `${profileData.stats.streak} 🔥`, icon: Flame, color: "from-pastel-mint to-green-600" }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-black text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Badges */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Badges & Achievements
              </h3>
              <span className="text-sm text-slate-600 font-semibold">
                {profileData.badges.filter(b => b.unlocked).length}/{profileData.badges.length}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {profileData.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-3 transition-all ${
                    badge.unlocked
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:scale-105"
                      : "bg-slate-100 border-2 border-slate-200 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                    {badge.name}
                  </div>
                  {badge.unlocked && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Recent Dares
            </h3>
            <div className="space-y-3">
              {profileData.recentDares.map((dare) => (
                <div key={dare.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 text-sm truncate">{dare.title}</div>
                    <div className="text-xs text-slate-600">{dare.date}</div>
                  </div>
                  <div className="text-primary font-black text-sm">+{dare.coins}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Account Settings
          </h3>
          <div className="space-y-2">
            {[
              { icon: Bell, label: "Notifications", description: "Manage notification preferences" },
              { icon: Shield, label: "Privacy & Security", description: "Control your privacy settings" },
              { icon: Share2, label: "Share Profile", description: "Share your achievements" },
              { icon: Star, label: "Preferences", description: "Customize your experience" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-slate-800 text-sm">{item.label}</div>
                    <div className="text-xs text-slate-600">{item.description}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
