"use client"

import { useState } from "react"
import { 
  Zap, 
  Trophy, 
  Users, 
  Camera, 
  Heart, 
  Laugh, 
  Flame, 
  Target, 
  Star,
  TrendingUp,
  Filter,
  Search,
  Clock,
  Award,
  ChevronRight
} from "lucide-react"

export default function DaresPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Dares", icon: Zap, color: "from-primary to-purple-600" },
    { id: "social", name: "Social", icon: Users, color: "from-secondary to-blue-600" },
    { id: "fun", name: "Fun", icon: Laugh, color: "from-pastel-coral to-pink-600" },
    { id: "creative", name: "Creative", icon: Camera, color: "from-pastel-mint to-green-600" },
    { id: "extreme", name: "Extreme", icon: Flame, color: "from-red-500 to-orange-600" }
  ]

  const dares = [
    {
      id: 1,
      title: "Dance in Public",
      description: "Dance for 30 seconds in a busy public area",
      category: "social",
      difficulty: "medium",
      points: 150,
      duration: "30 sec",
      participants: 1247,
      trending: true
    },
    {
      id: 2,
      title: "Talk to 5 Strangers",
      description: "Start a conversation with 5 random people",
      category: "social",
      difficulty: "easy",
      points: 120,
      duration: "20 min",
      participants: 892,
      trending: false
    },
    {
      id: 3,
      title: "Sing Karaoke Solo",
      description: "Perform a full song at a karaoke bar alone",
      category: "fun",
      difficulty: "hard",
      points: 200,
      duration: "5 min",
      participants: 654,
      trending: true
    },
    {
      id: 4,
      title: "Random Act of Kindness",
      description: "Do something nice for a stranger and record it",
      category: "social",
      difficulty: "easy",
      points: 100,
      duration: "10 min",
      participants: 2103,
      trending: false
    },
    {
      id: 5,
      title: "Create Street Art",
      description: "Make temporary chalk art in a public space",
      category: "creative",
      difficulty: "medium",
      points: 180,
      duration: "30 min",
      participants: 456,
      trending: false
    },
    {
      id: 6,
      title: "Ice Bath Challenge",
      description: "Stay in ice-cold water for 2 minutes",
      category: "extreme",
      difficulty: "hard",
      points: 250,
      duration: "2 min",
      participants: 789,
      trending: true
    },
    {
      id: 7,
      title: "Compliment 10 People",
      description: "Give genuine compliments to 10 strangers",
      category: "social",
      difficulty: "easy",
      points: 80,
      duration: "15 min",
      participants: 1456,
      trending: false
    },
    {
      id: 8,
      title: "Flash Mob Dance",
      description: "Join or create a flash mob performance",
      category: "fun",
      difficulty: "hard",
      points: 300,
      duration: "10 min",
      participants: 321,
      trending: true
    },
    {
      id: 9,
      title: "Poetry Slam",
      description: "Perform an original poem in front of an audience",
      category: "creative",
      difficulty: "medium",
      points: 170,
      duration: "3 min",
      participants: 567,
      trending: false
    },
    {
      id: 10,
      title: "Make 100 New Friends",
      description: "Exchange contact info with 100 new people in a day",
      category: "social",
      difficulty: "extreme",
      points: 500,
      duration: "8 hours",
      participants: 123,
      trending: false
    },
    {
      id: 11,
      title: "Stand-up Comedy",
      description: "Perform a 3-minute stand-up comedy routine",
      category: "fun",
      difficulty: "hard",
      points: 220,
      duration: "3 min",
      participants: 445,
      trending: true
    },
    {
      id: 12,
      title: "Photo Challenge",
      description: "Take creative photos with 20 strangers",
      category: "creative",
      difficulty: "medium",
      points: 140,
      duration: "1 hour",
      participants: 678,
      trending: false
    }
  ]

  const filteredDares = dares.filter(dare => {
    const matchesCategory = selectedCategory === "all" || dare.category === selectedCategory
    const matchesSearch = dare.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dare.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700 border-green-200"
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "hard": return "bg-orange-100 text-orange-700 border-orange-200"
      case "extreme": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pastel-lavender/30 to-white pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pastel-coral/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">Browse Dares</h1>
              <p className="text-slate-600">Find your next challenge</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dares..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 shadow-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r " + category.color + " text-white shadow-lg scale-105"
                      : "bg-white/80 text-slate-600 hover:bg-white hover:shadow-md border border-white/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{filteredDares.length}</div>
                <div className="text-xs text-slate-600 font-medium">Available Dares</div>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{dares.filter(d => d.trending).length}</div>
                <div className="text-xs text-slate-600 font-medium">Trending Now</div>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pastel-coral to-pink-600 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">
                  {(dares.reduce((sum, d) => sum + d.participants, 0) / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-slate-600 font-medium">Total Participants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dares Masonry Grid with Animations */}
        <div className="space-y-6">
          {/* Featured Trending Dares - Large Cards */}
          {filteredDares.filter(d => d.trending).length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6 text-primary" />
                Hot Right Now
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDares.filter(d => d.trending).slice(0, 2).map((dare, index) => (
                  <div
                    key={dare.id}
                    className="group relative bg-gradient-to-br from-white via-white to-pastel-lavender/20 backdrop-blur-xl border-2 border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-[0_25px_50px_rgba(124,58,237,0.25)] transition-all duration-500 overflow-hidden animate-scale-in hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-pastel-coral/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Glowing Border Effect */}
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary via-secondary to-pastel-coral opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500" />

                    {/* Floating Particles */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-ping" />
                    <div className="absolute top-8 right-12 w-1.5 h-1.5 rounded-full bg-secondary animate-ping" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-6 right-20 w-1 h-1 rounded-full bg-pastel-coral animate-ping" style={{ animationDelay: '2s' }} />

                    <div className="relative z-10">
                      {/* Trending Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold mb-4 shadow-lg animate-bounce-gentle">
                        <Flame className="w-4 h-4 animate-pulse" />
                        Trending Now
                      </div>

                      {/* Difficulty Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ml-2 ${getDifficultyColor(dare.difficulty)}`}>
                        <Star className="w-3 h-3" />
                        {dare.difficulty.charAt(0).toUpperCase() + dare.difficulty.slice(1)}
                      </div>

                      {/* Content */}
                      <h3 className="text-3xl font-black text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                        {dare.title}
                      </h3>
                      <p className="text-slate-600 mb-6 text-base">
                        {dare.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold">{dare.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-secondary" />
                          </div>
                          <span className="text-sm font-semibold">{dare.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Points & Action */}
                      <div className="flex items-center justify-between pt-6 border-t-2 border-slate-200">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6 text-primary animate-float" />
                          <div>
                            <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{dare.points}</span>
                            <span className="text-sm text-slate-600 font-medium ml-1">points</span>
                          </div>
                        </div>
                        <button className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] text-white font-bold hover:shadow-2xl transition-all group-hover:scale-105 overflow-hidden animate-gradient-flow">
                          <span className="relative z-10 flex items-center gap-2">
                            Accept Challenge
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Dares - Infinite Horizontal Scroll */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-secondary" />
              All Challenges
            </h2>
            <div className="relative overflow-hidden">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-pastel-lavender/20 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-pastel-lavender/20 to-transparent z-10 pointer-events-none" />
              
              {/* Scrolling Container */}
              <div className="flex gap-6 animate-scroll-infinite">
                {/* Original Set */}
                {filteredDares.filter(d => !d.trending || filteredDares.filter(fd => fd.trending).indexOf(d) >= 2).map((dare) => (
                  <div
                    key={`original-${dare.id}`}
                    className="flex-shrink-0 w-80 group relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-[0_15px_40px_rgba(124,58,237,0.2)] transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-pastel-coral/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

                    {/* Subtle Background Gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Trending Badge */}
                      {dare.trending && (
                        <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg animate-bounce-gentle">
                          <TrendingUp className="w-3 h-3 animate-pulse" />
                          Hot
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getDifficultyColor(dare.difficulty)} shadow-sm`}>
                        <Star className="w-3 h-3 animate-pulse" />
                        {dare.difficulty.charAt(0).toUpperCase() + dare.difficulty.slice(1)}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-primary transition-colors duration-300">
                        {dare.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {dare.description}
                      </p>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-4 h-4 text-primary group-hover:animate-pulse" />
                          <span className="text-xs font-medium">{dare.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4 text-secondary group-hover:animate-pulse" />
                          <span className="text-xs font-medium">{dare.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Points & Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary group-hover:animate-bounce-gentle" />
                          <span className="text-2xl font-black text-primary">{dare.points}</span>
                          <span className="text-xs text-slate-600 font-medium">pts</span>
                        </div>
                        <button className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all hover:gap-2 hover:scale-105">
                          Go
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate Set for Seamless Loop */}
                {filteredDares.filter(d => !d.trending || filteredDares.filter(fd => fd.trending).indexOf(d) >= 2).map((dare) => (
                  <div
                    key={`duplicate-${dare.id}`}
                    className="flex-shrink-0 w-80 group relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-[0_15px_40px_rgba(124,58,237,0.2)] transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-pastel-coral/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

                    {/* Subtle Background Gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Trending Badge */}
                      {dare.trending && (
                        <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg animate-bounce-gentle">
                          <TrendingUp className="w-3 h-3 animate-pulse" />
                          Hot
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getDifficultyColor(dare.difficulty)} shadow-sm`}>
                        <Star className="w-3 h-3 animate-pulse" />
                        {dare.difficulty.charAt(0).toUpperCase() + dare.difficulty.slice(1)}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-primary transition-colors duration-300">
                        {dare.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {dare.description}
                      </p>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-4 h-4 text-primary group-hover:animate-pulse" />
                          <span className="text-xs font-medium">{dare.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4 text-secondary group-hover:animate-pulse" />
                          <span className="text-xs font-medium">{dare.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Points & Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary group-hover:animate-bounce-gentle" />
                          <span className="text-2xl font-black text-primary">{dare.points}</span>
                          <span className="text-xs text-slate-600 font-medium">pts</span>
                        </div>
                        <button className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all hover:gap-2 hover:scale-105">
                          Go
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredDares.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No dares found</h3>
            <p className="text-slate-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  )
}
