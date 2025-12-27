"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Flame, Coins, TrendingUp, Crown, Star, Zap } from "lucide-react"

interface LeaderboardUser {
  id: number
  name: string
  avatar: string
  score: number
  dares: number
  streak: number
  level: number
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month" | "all">("week")

  // Mock data with Indian names
  const initialData: LeaderboardUser[] = [
    { id: 1, name: "Mohit Kumar Shekhar", avatar: "🦁", score: 15420, dares: 234, streak: 45, level: 28 },
    { id: 2, name: "Priya Verma", avatar: "🔥", score: 14890, dares: 198, streak: 38, level: 26 },
    { id: 3, name: "Rehan Ashraf", avatar: "⚡", score: 13750, dares: 176, streak: 32, level: 24 },
    { id: 4, name: "Guru Sharma", avatar: "💎", score: 12340, dares: 165, streak: 28, level: 22 },
    { id: 5, name: "Shubhi", avatar: "🚀", score: 11580, dares: 152, streak: 25, level: 21 },
    { id: 6, name: "Sneha Gupta", avatar: "🌟", score: 10920, dares: 143, streak: 22, level: 20 },
    { id: 7, name: "Vishwajit", avatar: "⭐", score: 10240, dares: 138, streak: 20, level: 19 },
    { id: 8, name: "Priya", avatar: "💫", score: 9870, dares: 129, streak: 18, level: 18 },
    { id: 9, name: "Shashikant", avatar: "🎯", score: 9450, dares: 122, streak: 16, level: 17 },
    { id: 10, name: "Mulkit", avatar: "✨", score: 9120, dares: 118, streak: 15, level: 16 },
  ]

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>(initialData)
  const currentUserId = 5 // Mock current user

  // Shuffle and update scores every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardData((prevData) => {
        const newData = [...prevData].map((user) => ({
          ...user,
          score: user.score + Math.floor(Math.random() * 200) - 50, // Random score change
          dares: user.dares + Math.floor(Math.random() * 3),
        }))
        
        // Sort by score descending
        return newData.sort((a, b) => b.score - a.score)
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600"
    if (rank === 2) return "from-slate-300 to-slate-400"
    if (rank === 3) return "from-orange-400 to-orange-600"
    return "from-primary to-secondary"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-500" />
    return <Trophy className="w-5 h-5 text-slate-400" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white pb-24">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-[32rem] h-[32rem] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">COMPETE & CONQUER</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pastel-coral">
              Leaderboard
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            See who's dominating the dare challenge!
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {(["today", "week", "month", "all"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                timeframe === period
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm text-slate-600 hover:text-primary border border-slate-200 hover:border-primary/30"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-3xl border-4 border-white shadow-xl">
                {leaderboardData[1].avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                2
              </div>
            </div>
            <h3 className="font-bold text-foreground text-sm mb-1">{leaderboardData[1].name}</h3>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <Star className="w-3 h-3" />
              {leaderboardData[1].score.toLocaleString()}
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-4xl border-4 border-white shadow-2xl ring-4 ring-yellow-200">
                {leaderboardData[0].avatar}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-500 drop-shadow-lg animate-bounce" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
                1
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-1">{leaderboardData[0].name}</h3>
            <div className="flex items-center gap-1 text-sm text-primary font-bold">
              <Star className="w-4 h-4" />
              {leaderboardData[0].score.toLocaleString()}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-3xl border-4 border-white shadow-xl">
                {leaderboardData[2].avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                3
              </div>
            </div>
            <h3 className="font-bold text-foreground text-sm mb-1">{leaderboardData[2].name}</h3>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <Star className="w-3 h-3" />
              {leaderboardData[2].score.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData.map((user, index) => {
            const rank = index + 1
            const isCurrentUser = user.id === currentUserId

            return (
              <div
                key={user.id}
                className={`soft-card p-4 transition-all duration-300 hover:shadow-large hover:-translate-y-1 ${
                  isCurrentUser
                    ? "ring-2 ring-primary shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {rank <= 3 ? (
                      getRankIcon(rank)
                    ) : (
                      <span className="text-lg font-bold text-slate-400">#{rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center text-2xl border-2 border-white shadow-md`}>
                      {user.avatar}
                    </div>
                    {rank <= 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center">
                        <span className="text-xs">🔥</span>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground mb-1 flex items-center gap-2">
                      {user.name}
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          You
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {user.dares} dares
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {user.streak} streak
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Lvl {user.level}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-primary font-bold text-lg mb-1">
                      <Star className="w-5 h-5" />
                      {user.score.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="soft-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Competitors</div>
          </div>

          <div className="soft-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Coins className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">500K+</div>
            <div className="text-sm text-muted-foreground">Total Points Earned</div>
          </div>

          <div className="soft-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-pastel-coral/10 flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 text-pastel-coral" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">2,500+</div>
            <div className="text-sm text-muted-foreground">Dares Completed Today</div>
          </div>
        </div>
      </div>
    </div>
  )
}
