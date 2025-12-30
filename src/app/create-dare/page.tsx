"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { 
  Flame, 
  Zap, 
  Users, 
  Camera, 
  Laugh, 
  Target,
  ArrowLeft,
  Plus,
  Sparkles
} from "lucide-react"

export default function CreateDarePage() {
  const router = useRouter()
  const { user, loading: authLoading, hasProfile } = useAuth(false, false) // Temporarily disable auth requirement for testing
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "fun",
    difficulty: "easy",
    coins: 50,
    timeLimit: "24h",
    requirements: ""
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const categories = [
    { id: "social", name: "Social", icon: Users, color: "from-secondary to-blue-600" },
    { id: "fun", name: "Fun", icon: Laugh, color: "from-pastel-coral to-pink-600" },
    { id: "creative", name: "Creative", icon: Camera, color: "from-pastel-mint to-green-600" },
    { id: "extreme", name: "Extreme", icon: Flame, color: "from-red-500 to-orange-600" }
  ]

  const difficulties = [
    { id: "easy", name: "Easy", coins: 50, color: "text-green-600 bg-green-50" },
    { id: "medium", name: "Medium", coins: 150, color: "text-yellow-600 bg-yellow-50" },
    { id: "hard", name: "Hard", coins: 300, color: "text-orange-600 bg-orange-50" },
    { id: "extreme", name: "Extreme", coins: 500, color: "text-red-600 bg-red-50" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      await addDoc(collection(db, "dares"), {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.trim(),
        createdBy: user.uid,
        createdByName: user.displayName || "Anonymous",
        status: "pending", // pending, approved, rejected
        participants: 0,
        completions: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/dares")
      }, 2000)
    } catch (err: any) {
      console.error("Error creating dare:", err)
      setError(err.message || "Failed to create dare")
    } finally {
      setLoading(false)
    }
  }

  const handleDifficultyChange = (difficultyId: string) => {
    const difficulty = difficulties.find(d => d.id === difficultyId)
    setFormData({
      ...formData,
      difficulty: difficultyId,
      coins: difficulty?.coins || 50
    })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Temporarily commented out for testing
  // if (!user || !hasProfile) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white pt-20 pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            Create a Dare
          </h1>
          <p className="text-slate-600">Challenge the community with your creative dare!</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Dare Created Successfully!</h3>
              <p className="text-sm text-green-700">Redirecting to dares page...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Dare Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Dance in Public for 30 Seconds"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              maxLength={100}
              required
            />
            <p className="text-xs text-slate-500 mt-1">{formData.title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your dare in detail..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              maxLength={500}
              required
            />
            <p className="text-xs text-slate-500 mt-1">{formData.description.length}/500 characters</p>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.category === category.id
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-slate-700" />
                    <p className="text-sm font-medium text-slate-700">{category.name}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  type="button"
                  onClick={() => handleDifficultyChange(difficulty.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.difficulty === difficulty.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 mb-1">{difficulty.name}</p>
                  <p className="text-xs text-slate-600">{difficulty.coins} coins</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Time Limit
            </label>
            <select
              value={formData.timeLimit}
              onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="1h">1 Hour</option>
              <option value="6h">6 Hours</option>
              <option value="12h">12 Hours</option>
              <option value="24h">24 Hours</option>
              <option value="3d">3 Days</option>
              <option value="7d">7 Days</option>
            </select>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Proof Requirements (Optional)
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="What kind of proof is needed? (e.g., video, photo, witness)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              maxLength={300}
            />
            <p className="text-xs text-slate-500 mt-1">{formData.requirements.length}/300 characters</p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Dare
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
