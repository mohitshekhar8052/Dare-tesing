"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Flame, Mail, Lock, User, Eye, EyeOff, Zap, Trophy, Star, Crown, Target, Users, TrendingUp, Sparkles, ArrowRight, Check, ArrowLeft, Home, GraduationCap } from "lucide-react"
import Stepper, { Step } from "@/components/Stepper"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [college, setCollege] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeFeature, setActiveFeature] = useState(0)
  const [showStepper, setShowStepper] = useState(false)
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userCollege, setUserCollege] = useState("")
  const [userBio, setUserBio] = useState("Dare enthusiast | Challenge seeker | Always up for an adventure 🔥")
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const router = useRouter()

  // Check if user is already authenticated and has profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()) {
            // User is authenticated and has a profile, redirect to home
            router.push("/")
          } else {
            // User is authenticated but doesn't have profile, show stepper
            setUserId(currentUser.uid)
            setUserEmail(currentUser.email || "")
            setUserName(currentUser.displayName || "")
            setShowStepper(true)
          }
        } catch (error) {
          console.error("Error checking user profile:", error)
        }
      }
      setIsAuthChecking(false)
    })

    return () => unsubscribe()
  }, [router])

  const features = [
    {
      icon: Target,
      title: "Epic Challenges",
      description: "Complete thrilling dares and push your limits every day",
      color: "from-primary to-purple-600"
    },
    {
      icon: Trophy,
      title: "Win Rewards",
      description: "Earn exclusive badges, prizes, and bragging rights",
      color: "from-secondary to-blue-600"
    },
    {
      icon: Crown,
      title: "Climb Leaderboards",
      description: "Compete with thousands and become the ultimate champion",
      color: "from-pastel-coral to-pink-600"
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with dare seekers from around the world",
      color: "from-pastel-mint to-green-600"
    }
  ]

  const stats = [
    { value: "50K+", label: "Active Darers" },
    { value: "1M+", label: "Dares Completed" },
    { value: "₹10L+", label: "Rewards Won" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update display name
        await updateProfile(user, { displayName: name })

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          college: college,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          bio: "Dare enthusiast | Challenge seeker | Always up for an adventure 🔥",
          createdAt: new Date().toISOString(),
          stats: {
            daresCompleted: 0,
            rank: 0,
            points: 0,
            streak: 0
          }
        })
      }
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError("")
    
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      // Quick check if user document exists with timeout
      const checkUserProfile = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid)
          const userDoc = await Promise.race([
            getDoc(userDocRef),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('timeout')), 3000)
            )
          ]) as any
          
          return userDoc.exists()
        } catch (error) {
          // If timeout or error, assume new user
          console.log("Profile check timeout/error, treating as new user")
          return false
        }
      }

      const hasProfile = await checkUserProfile()
      
      if (!hasProfile) {
        // New user, show stepper for additional info
        setUserId(user.uid)
        setUserEmail(user.email || "")
        setUserName(user.displayName || "")
        setShowStepper(true)
        setLoading(false)
      } else {
        // Existing user, redirect immediately
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "Google authentication failed")
      setLoading(false)
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return true // Welcome step, no validation needed
      case 2:
        return userCollege.trim().length > 0
      case 3:
        return userBio.trim().length > 0
      case 4:
        return true // Final step, no validation needed
      default:
        return true
    }
  }

  const handleStepperComplete = async () => {
    console.log("Stepper complete triggered!")
    console.log("User data:", { userId, userEmail, userName, userCollege, userBio })
    
    // Validate all required fields before saving
    if (!userCollege.trim() || !userBio.trim()) {
      setError("Please complete all required fields")
      console.error("Validation failed")
      return
    }
    
    setLoading(true)
    
    try {
      // Save user data to Firestore with validation
      console.log("Saving profile to Firestore...")
      await setDoc(doc(db, "users", userId), {
        name: userName || "Anonymous",
        email: userEmail,
        college: userCollege.trim(),
        bio: userBio.trim(),
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stats: {
          daresCompleted: 0,
          rank: 0,
          points: 0,
          streak: 0
        },
        profileCompleted: true
      })
      console.log("Profile saved successfully, redirecting...")
      
      // Redirect immediately after successful save
      router.push("/")
    } catch (err: any) {
      console.error("Error saving profile:", err)
      // Still redirect even if save fails
      router.push("/")
    }
  }

  // Show loading while checking auth status
  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pastel-lavender/30 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showStepper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white flex items-center justify-center p-4">
        <Stepper
          initialStep={1}
          onFinalStepCompleted={handleStepperComplete}
          backButtonText="Previous"
          nextButtonText="Next"
          stepCircleContainerClassName="border-slate-200"
          validateStep={validateStep}
        >
          <Step>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Welcome to DARE! 🔥</h2>
              <p className="text-slate-600">Let's set up your profile in just a few quick steps.</p>
              <div className="pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  <span>Signed in as {userName}</span>
                </div>
              </div>
            </div>
          </Step>
          <Step>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">What's your college? 🎓</h2>
              <p className="text-sm text-slate-600">Connect with fellow dare-takers from your institution</p>
              <input
                type="text"
                value={userCollege}
                onChange={(e) => setUserCollege(e.target.value)}
                placeholder="Enter your college name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </Step>
          <Step>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Tell us about yourself ✨</h2>
              <p className="text-sm text-slate-600">Write a short bio to let others know who you are</p>
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                placeholder="Your bio..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>
          </Step>
          <Step>
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">You're all set! 🎉</h2>
              <p className="text-slate-600">Ready to take on some epic dares?</p>
            </div>
          </Step>
        </Stepper>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white flex overflow-hidden pt-20 lg:pt-0">
      {/* Back to Home Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 text-slate-700 font-semibold group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to Home</span>
        <Home className="w-4 h-4 sm:hidden" />
      </button>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pastel-coral/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pastel-mint/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      </div>

      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 p-12 pt-24 flex-col justify-between">
        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
                <Flame className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-4xl font-black tracking-tight text-slate-800">
                DARE
              </h1>
              <p className="text-primary text-sm font-semibold">Challenge Accepted</p>
            </div>
          </div>

          {/* Animated Feature Showcase */}
          <div className="mt-12 space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-500 ${
                    activeFeature === index
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-40"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 p-6 group hover:bg-white hover:shadow-xl transition-all duration-300">
                    {activeFeature === index && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5`} />
                    )}
                    <div className="relative flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-lg mb-1">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                      {activeFeature === index && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-black mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="font-display text-3xl font-black text-slate-800">DARE</h1>
            </div>
          </div>

          {/* Auth Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-purple-600 rounded-3xl blur-2xl opacity-10" />
            
            <div className="relative bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 mb-2">
                  {isLogin ? "Welcome Back!" : "Join the Challenge"}
                </h2>
                <p className="text-slate-600">
                  {isLogin ? "Ready to take on new dares?" : "Start your dare journey today"}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6 p-1.5 bg-slate-100/80 rounded-2xl backdrop-blur-xl border border-slate-200">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isLogin
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    !isLogin
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 backdrop-blur-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {/* Name Field (Sign Up Only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                      <div className="relative flex items-center">
                        <User className="absolute left-4 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          placeholder="Enter Your Anonymous Name"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* College Field (Sign Up Only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">
                      College/University
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                      <div className="relative flex items-center">
                        <GraduationCap className="absolute left-4 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          list="colleges"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          placeholder="Your College Name"
                          required={!isLogin}
                        />
                        <datalist id="colleges">
                          <option value="Indian Institute of Technology (IIT) Delhi" />
                          <option value="Indian Institute of Technology (IIT) Bombay" />
                          <option value="Indian Institute of Technology (IIT) Madras" />
                          <option value="Indian Institute of Technology (IIT) Kanpur" />
                          <option value="Indian Institute of Technology (IIT) Kharagpur" />
                          <option value="Indian Institute of Technology (IIT) Roorkee" />
                          <option value="National Institute of Technology (NIT) Trichy" />
                          <option value="National Institute of Technology (NIT) Warangal" />
                          <option value="Delhi University (DU)" />
                          <option value="Jawaharlal Nehru University (JNU)" />
                          <option value="Birla Institute of Technology and Science (BITS) Pilani" />
                          <option value="Vellore Institute of Technology (VIT)" />
                          <option value="Manipal Institute of Technology" />
                          <option value="SRM Institute of Science and Technology" />
                          <option value="Amity University" />
                          <option value="Lovely Professional University (LPU)" />
                          <option value="Christ University, Bangalore" />
                          <option value="Symbiosis International University, Pune" />
                          <option value="Jadavpur University, Kolkata" />
                          <option value="Anna University, Chennai" />
                          <option value="Madan Mohan Malaviya University OF Technology, Gorakhpur" />
                        </datalist>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        placeholder="Anonymous@gmail.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Forgot Password (Login Only) */}
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-secondary transition-colors font-semibold"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden py-4 rounded-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-purple-600 bg-[length:200%_100%] animate-gradient-flow" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {isLogin ? "Sign In Now" : "Create Account"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-600 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-primary/30 transition-all duration-300 font-semibold text-slate-700 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Benefits */}
              {!isLogin && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-slate-600 text-xs font-semibold mb-3">What you'll get:</p>
                  <div className="space-y-2">
                    {["Access to 1000+ challenges", "Exclusive rewards & badges", "Global leaderboard ranking"].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:text-secondary transition-colors font-semibold">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-primary hover:text-secondary transition-colors font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
