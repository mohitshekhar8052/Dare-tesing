"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { auth, db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
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
  Zap,
  Star,
  Check
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user: authUser, loading: authLoading, hasProfile } = useAuth(true, true)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authUser || !hasProfile) {
    return null
  }

  // User data from Firebase
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    college: "",
    joinDate: "",
    bio: "",
    stats: {
      daresCompleted: 0,
      rank: 0,
      points: 0,
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
      { id: 1, title: "Dance in Public", completed: true, points: 150, date: "2 days ago" },
      { id: 2, title: "Talk to 5 Strangers", completed: true, points: 120, date: "3 days ago" },
      { id: 3, title: "Sing Karaoke Solo", completed: true, points: 200, date: "5 days ago" }
    ]
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setProfileData(prev => ({
              ...prev,
              name: userData.name || user.displayName || "User",
              email: userData.email || user.email || "",
              college: userData.college || "",
              joinDate: userData.joinDate || "Recently",
              bio: userData.bio || "Dare enthusiast | Challenge seeker | Always up for an adventure 🔥",
              stats: userData.stats || prev.stats
            }))
          } else {
            // Fallback to auth data if no Firestore document
            setProfileData(prev => ({
              ...prev,
              name: user.displayName || "User",
              email: user.email || ""
            }))
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
          // Fallback to auth data
          setProfileData(prev => ({
            ...prev,
            name: user.displayName || "User",
            email: user.email || ""
          }))
        }
      } else {
        router.push("/auth")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pastel-coral/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-1">My Profile</h1>
            <p className="text-slate-600">Manage your account and view your stats</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all text-red-600 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-black text-white">
                  {profileData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-slate-100">
                <Edit2 className="w-4 h-4 text-primary" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">{profileData.name}</h2>
                  <p className="text-slate-600 text-sm mb-3">{profileData.bio}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                  <span className="text-sm">{profileData.college}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-4 h-4 text-pastel-coral" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Dares Completed", value: profileData.stats.daresCompleted, icon: Target, color: "from-primary to-purple-600" },
            { label: "Current Rank", value: `#${profileData.stats.rank}`, icon: Trophy, color: "from-secondary to-blue-600" },
            { label: "Total Points", value: profileData.stats.points, icon: Zap, color: "from-pastel-coral to-pink-600" },
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
                  <div className="text-primary font-black text-sm">+{dare.points}</div>
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
