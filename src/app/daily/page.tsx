"use client"

import { useState, useEffect } from "react"
import { Star, Zap, Flame, Timer, Coins, Users, TrendingUp, Calendar, Award, Target, Trophy } from "lucide-react"

export default function DailyDarePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 32,
    seconds: 45
  })

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const dailyDare = {
    title: "The Ultimate Social Dare",
    description: "Compliment 10 strangers in creative ways and capture their genuine reactions. Spread positivity and make someone's day brighter! Share your most heartwarming moment.",
    category: "Social Good",
    difficulty: "Legendary",
    coins: 2500,
    timeLimit: "24h",
    acceptedCount: 1247,
    completedToday: 342,
    successRate: 87,
    emoji: "🏆"
  }

  const previousDares = [
    { title: "Dance in Public", coins: 500, completed: 456, emoji: "💃" },
    { title: "Random Act of Kindness", coins: 750, completed: 389, emoji: "❤️" },
    { title: "Learn a Magic Trick", coins: 800, completed: 267, emoji: "🎩" },
    { title: "30-Day Fitness Challenge", coins: 1000, completed: 198, emoji: "💪" },
  ]

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4 animate-pulse">
            <Star className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FEATURED CHALLENGE
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">
            Dare of the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pastel-coral animate-gradient-shift">
              Day
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The ultimate challenge awaits. Complete it before time runs out!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="soft-card p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Challenge Expires In</div>
                <div className="flex items-center gap-2 font-display text-3xl font-bold text-primary">
                  <span className="tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">New dare in</div>
              <div className="text-lg font-bold text-foreground">{timeLeft.hours + 1}h</div>
            </div>
          </div>
        </div>

        {/* Main Dare Card */}
        <div className="relative mb-12">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-4 border-primary/20 rounded-full animate-ping-slow" />
            <div className="absolute w-80 h-80 border-4 border-secondary/20 rounded-full animate-ping-slower" />
            <div className="absolute w-96 h-96 border-4 border-pastel-coral/20 rounded-full animate-ping-slowest" />
          </div>

          {/* Central Card */}
          <div className="relative soft-card p-8 md:p-12 shadow-2xl border-2 border-primary/30 hover:scale-[1.02] transition-all duration-500">
            {/* Sparkle Effects */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full blur-md animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }} />
            
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-pastel-coral rounded-2xl blur-xl opacity-50 animate-pulse" />
                <div className="relative text-6xl md:text-7xl animate-bounce-gentle">
                  {dailyDare.emoji}
                </div>
              </div>
            </div>

            {/* Category & Difficulty */}
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                {dailyDare.category}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg animate-pulse">
                🔥 {dailyDare.difficulty}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-center mb-6 text-foreground">
              {dailyDare.title}
            </h2>

            {/* Description */}
            <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {dailyDare.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <Coins className="w-6 h-6 mx-auto mb-2 text-pastel-yellow" />
                <div className="font-bold text-2xl text-foreground">{dailyDare.coins}</div>
                <div className="text-xs text-muted-foreground">Coins</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20">
                <Timer className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="font-bold text-2xl text-foreground">{dailyDare.timeLimit}</div>
                <div className="text-xs text-muted-foreground">Time Limit</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-pastel-coral/5 to-pastel-coral/10 border border-pastel-coral/20">
                <Users className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <div className="font-bold text-2xl text-foreground">{dailyDare.acceptedCount}</div>
                <div className="text-xs text-muted-foreground">Accepted</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="font-bold text-2xl text-foreground">{dailyDare.successRate}%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                {/* Glow effect behind button */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-pastel-coral rounded-full opacity-75 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse" />
                
                {/* Rotating ring */}
                <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '8s' }} />
                
                {/* Main button */}
                <button className="relative overflow-hidden px-12 py-6 rounded-full text-lg font-bold text-white shadow-2xl transform transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:shadow-[0_20px_60px_rgba(124,58,237,0.5)]">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-flow" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="w-6 h-6 animate-bounce-gentle group-hover:rotate-12 transition-transform" />
                    Accept the Challenge
                    <Flame className="w-6 h-6 animate-bounce-gentle group-hover:rotate-12 transition-transform" style={{ animationDelay: '0.2s' }} />
                  </span>
                  
                  {/* Particle effects on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full animate-ping" />
                    <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                    <div className="absolute bottom-3 left-16 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                    <div className="absolute bottom-4 right-20 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                  </div>
                </button>
                
                {/* Floating icons around button */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity" style={{ animationDelay: '0.2s' }}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-pastel-coral flex items-center justify-center text-white shadow-lg">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground animate-pulse">
                {dailyDare.completedToday} people completed this dare today
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="soft-card p-8 mb-12">
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            🎁 Complete & Earn Rewards
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <Award className="w-10 h-10 mx-auto mb-3 text-yellow-600" />
              <div className="font-bold text-lg text-foreground mb-1">Daily Badge</div>
              <div className="text-sm text-muted-foreground">Exclusive daily completion badge</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <Coins className="w-10 h-10 mx-auto mb-3 text-primary" />
              <div className="font-bold text-lg text-foreground mb-1">2500 Coins</div>
              <div className="text-sm text-muted-foreground">Use in the rewards shop</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-100 border border-orange-200">
              <Flame className="w-10 h-10 mx-auto mb-3 text-orange-500" />
              <div className="font-bold text-lg text-foreground mb-1">Streak Bonus</div>
              <div className="text-sm text-muted-foreground">Build your daily streak</div>
            </div>
          </div>
        </div>

        {/* Previous Daily Dares */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Previous Daily Dares
            </h3>
            <Calendar className="w-6 h-6 text-muted-foreground" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {previousDares.map((dare, index) => (
              <div
                key={index}
                className="soft-card p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{dare.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-1">{dare.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-pastel-yellow" />
                        {dare.coins}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-green-500" />
                        {dare.completed} completed
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Expired
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
