"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  Trophy, 
  Zap, 
  ArrowRight,
  Check,
  Flame,
  Target,
  Heart
} from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState("")
  
  // Form data
  const [nickname, setNickname] = useState("")
  const [college, setCollege] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [bio, setBio] = useState("")

  const totalSteps = 4

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth")
      } else {
        setUserId(user.uid)
        // Check if user already completed onboarding
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists() && userDoc.data().onboardingCompleted) {
          router.push("/")
        }
      }
    })

    return () => unsubscribe()
  }, [router])

  const experienceLevels = [
    { id: "beginner", label: "Beginner", icon: Sparkles, description: "New to dares" },
    { id: "intermediate", label: "Intermediate", icon: Target, description: "Done a few challenges" },
    { id: "advanced", label: "Advanced", icon: Trophy, description: "Regular dare taker" },
    { id: "expert", label: "Expert", icon: Flame, description: "Dare legend" }
  ]

  const interestOptions = [
    { id: "social", label: "Social", icon: "🎉" },
    { id: "fun", label: "Fun", icon: "😄" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "extreme", label: "Extreme", icon: "🔥" },
    { id: "fitness", label: "Fitness", icon: "💪" },
    { id: "knowledge", label: "Knowledge", icon: "🧠" },
    { id: "skill", label: "Skill", icon: "⚡" },
    { id: "kindness", label: "Kindness", icon: "❤️" }
  ]

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    if (!userId) {
      alert("User not authenticated. Please try again.")
      return
    }
    
    setLoading(true)
    try {
      const userDocRef = doc(db, "users", userId)
      
      // Update user document with onboarding data
      await updateDoc(userDocRef, {
        name: nickname.trim(),
        college: college.trim(),
        experienceLevel: experienceLevel,
        interests: interests,
        bio: bio.trim() || "Dare enthusiast | Challenge seeker | Always up for an adventure 🔥",
        onboardingCompleted: true,
        updatedAt: new Date().toISOString()
      })
      
      // Verify the data was saved
      const verifyDoc = await getDoc(userDocRef)
      if (verifyDoc.exists()) {
        const data = verifyDoc.data()
        console.log("✅ Onboarding data saved successfully:", {
          name: data.name,
          college: data.college,
          experienceLevel: data.experienceLevel,
          interests: data.interests,
          bio: data.bio,
          onboardingCompleted: data.onboardingCompleted
        })
        
        // Redirect to home
        router.push("/")
      } else {
        throw new Error("Failed to verify onboarding data")
      }
    } catch (error: any) {
      console.error("❌ Error completing onboarding:", error)
      alert(`Failed to save your information: ${error.message}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch(currentStep) {
      case 1: return nickname.trim().length > 0
      case 2: return college.trim().length > 0
      case 3: return experienceLevel.length > 0
      case 4: return interests.length > 0
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/20 to-white flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">WELCOME TO DARE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-3 animate-fade-in">
            Let's Set Up Your Profile
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in">
            Help us personalize your dare experience
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                index + 1 < currentStep 
                  ? 'bg-primary border-primary' 
                  : index + 1 === currentStep
                  ? 'bg-white border-primary scale-110'
                  : 'bg-white border-slate-300'
              }`}>
                {index + 1 < currentStep ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`font-semibold ${
                    index + 1 === currentStep ? 'text-primary' : 'text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                  index + 1 < currentStep ? 'bg-primary' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 md:p-12">
          {/* Step 1: Nickname */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">What should we call you?</h2>
                  <p className="text-sm text-muted-foreground">Choose a nickname for your profile</p>
                </div>
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: College */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Where do you study?</h2>
                  <p className="text-sm text-muted-foreground">Tell us your college or university</p>
                </div>
              </div>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college name"
                className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all text-lg font-medium"
                autoFocus
              />
            </div>
          )}

          {/* Step 3: Experience Level */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">What's your dare level?</h2>
                  <p className="text-sm text-muted-foreground">Select your experience with challenges</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experienceLevels.map((level) => {
                  const Icon = level.icon
                  return (
                    <button
                      key={level.id}
                      onClick={() => setExperienceLevel(level.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        experienceLevel === level.id
                          ? 'border-primary bg-primary/5 scale-105 shadow-lg'
                          : 'border-slate-200 hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 mx-auto ${
                        experienceLevel === level.id ? 'text-primary' : 'text-slate-400'
                      }`} />
                      <h3 className="font-bold text-foreground mb-1">{level.label}</h3>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Interests */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-pastel-coral/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pastel-coral" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">What interests you?</h2>
                  <p className="text-sm text-muted-foreground">Select all that apply (at least one)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      interests.includes(interest.id)
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <p className="text-sm font-semibold text-foreground">{interest.label}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 1
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Back
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed() || loading}
                className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  canProceed() && !loading
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Completing...' : 'Complete'}
                <Zap className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
