"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/FeatureCard"
import { StatBadge } from "@/components/StatBadge"
import { HowItWorksStep } from "@/components/HowItWorksStep"
import { SlideToAccept } from "@/components/SlideToAccept"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  Flame,
  Trophy,
  Zap,
  Target,
  Users,
  Shield,
  Star,
  Sparkles,
  Timer,
  Coins,
  TrendingUp,
  ArrowRight
} from "lucide-react"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white overflow-x-hidden pb-24">
      {/* Soft Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-[32rem] h-[32rem] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pastel-coral/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 overflow-hidden min-h-[calc(100vh-6rem)] flex items-center py-12">
        {/* Background Video */}
        <video 
          src="/assets/hero-characters.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-right z-0 opacity-60"
        />
        
        {/* Overlay to enhance text readability - stronger on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-[1]" />
        
        <div className="max-w-6xl mx-auto relative z-10 w-full px-2 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center py-8">
            {/* Hero Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 py-4 lg:py-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-3 md:mb-4 animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-pastel-coral" />
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">The Ultimate Dare Platform</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-foreground leading-tight mb-3 md:mb-5 opacity-0 animate-fade-in font-extrabold" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                Accept the{" "}
                <span className="text-primary">Dare</span>
                <br />
                Become a{" "}
                <span className="text-secondary">Legend</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-5 md:mb-6 opacity-0 animate-fade-in leading-relaxed" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                Challenge friends, complete epic dares, earn coins & rewards. 
                Build your streak and prove you're the ultimate dare champion!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center lg:justify-start mb-5 md:mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                      <Zap className="w-4 h-4 group-hover:animate-bounce" />
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                      <Zap className="w-4 h-4 group-hover:animate-bounce" />
                      Start Your Journey
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="lg">
                  <Trophy className="w-4 h-4" />
                  View Leaderboard
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start opacity-0 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                <StatBadge value="50K+" label="Dare Takers" icon="🔥" bgClass="bg-muted" />
                <StatBadge value="1M+" label="Dares Complete" icon="⚡" bgClass="bg-muted" />
                <StatBadge value="100+" label="Colleges" icon="🎓" bgClass="bg-muted" />
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2 flex justify-center items-center min-h-[250px] lg:min-h-[350px]">
              <div className="relative w-full max-w-sm">
                {/* Tagline */}
                <div className="text-center mb-6 lg:mb-0">
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground/80 whitespace-nowrap select-none font-extrabold">
                    DARE ME
                  </span>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-2 top-10 lg:top-12 animate-float-delayed">
                  <div className="soft-card px-2.5 py-1.5 lg:px-3 lg:py-2 flex items-center gap-1.5 shadow-medium border border-pastel-coral/20 bg-gradient-to-br from-background to-pastel-coral/5">
                    <Flame className="w-3 h-3 text-pastel-coral animate-pulse" />
                    <span className="font-semibold text-foreground text-xs">7 Day Streak!</span>
                  </div>
                </div>
                <div className="absolute -left-2 bottom-16 lg:bottom-20 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="soft-card px-2.5 py-1.5 lg:px-3 lg:py-2 flex items-center gap-1.5 shadow-medium border border-pastel-yellow/20 bg-gradient-to-br from-background to-pastel-yellow/5">
                    <Coins className="w-3 h-3 text-pastel-yellow animate-bounce" />
                    <span className="font-semibold text-foreground text-xs">+500 Coins</span>
                  </div>
                </div>
                
                {/* Additional Floating Trophy Badge */}
                <div className="absolute -right-4 bottom-10 lg:bottom-12 animate-float-delayed" style={{ animationDelay: "1.5s" }}>
                  <div className="soft-card px-2 py-1.5 flex items-center gap-1.5 shadow-medium border border-primary/20 bg-gradient-to-br from-background to-primary/5">
                    <Trophy className="w-3 h-3 text-primary" />
                    <span className="font-semibold text-foreground text-xs">Top 10!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce-gentle">
            <Star className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm font-bold text-primary">START YOUR JOURNEY</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 font-extrabold">
            Ready to Accept the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pastel-coral">
              Challenge?
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of dare legends. Sign in to start completing challenges, 
            earning coins, and climbing the leaderboards!
          </p>

          {/* CTA Button */}
          {user ? (
            <Link href="/dashboard">
              <Button variant="hero" size="xl" className="group animate-pulse-slow">
                <Trophy className="w-5 h-5 group-hover:animate-bounce" />
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <div className="relative inline-flex">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-pastel-coral rounded-full blur-lg opacity-75 animate-pulse" />
              <Link href="/auth" className="relative z-10">
                <button className="inline-flex items-center gap-3 px-8 py-4 text-lg font-extrabold text-white bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 border-2 border-white/20 hover:border-white/40">
                  <Zap className="w-5 h-5" />
                  Sign In to Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="soft-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Epic Challenges</h3>
              <p className="text-sm text-muted-foreground">Complete dares and prove yourself</p>
            </div>
            
            <div className="soft-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">Collect coins and unlock badges</p>
            </div>
            
            <div className="soft-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-full bg-pastel-coral/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-pastel-coral" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Leaderboards</h3>
              <p className="text-sm text-muted-foreground">Compete and become a legend</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dare Cards Carousel */}
      <section className="relative z-10 py-20 overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 font-extrabold">
              Today's <span className="text-primary">Hot Dares</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Swipe to accept and become a legend!
            </p>
          </div>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-infinite">
            {/* First set of cards */}
            {[
              {
                title: "Dance Challenge",
                description: "Perform a 30-second dance in a public place",
                category: "Fun",
                coins: 500,
                difficulty: "Easy",
                emoji: "💃"
              },
              {
                title: "Fitness Beast",
                description: "Complete 50 push-ups without stopping",
                category: "Fitness",
                coins: 750,
                difficulty: "Medium",
                emoji: "💪"
              },
              {
                title: "Random Act",
                description: "Buy coffee for a stranger and share their story",
                category: "Social Good",
                coins: 1000,
                difficulty: "Easy",
                emoji: "☕"
              },
              {
                title: "Skill Master",
                description: "Learn and perform a magic trick",
                category: "Skill",
                coins: 800,
                difficulty: "Hard",
                emoji: "🎩"
              },
              {
                title: "Brain Teaser",
                description: "Solve 10 riddles in under 5 minutes",
                category: "Knowledge",
                coins: 600,
                difficulty: "Medium",
                emoji: "🧠"
              }
            ].map((dare, index) => (
              <div 
                key={`dare-1-${index}`}
                className="flex-shrink-0 w-80 soft-card p-6 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{dare.emoji}</div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {dare.category}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {dare.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dare.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-pastel-yellow" />
                    <span className="font-semibold text-foreground">{dare.coins}</span>
                  </div>
                  <span className={`text-xs font-medium ${
                    dare.difficulty === 'Easy' ? 'text-green-500' : 
                    dare.difficulty === 'Medium' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {dare.difficulty}
                  </span>
                </div>

                {/* Slide to Accept */}
                <SlideToAccept onAccept={() => console.log(`Accepted: ${dare.title}`)} />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {[
              {
                title: "Dance Challenge",
                description: "Perform a 30-second dance in a public place",
                category: "Fun",
                coins: 500,
                difficulty: "Easy",
                emoji: "💃"
              },
              {
                title: "Fitness Beast",
                description: "Complete 50 push-ups without stopping",
                category: "Fitness",
                coins: 750,
                difficulty: "Medium",
                emoji: "💪"
              },
              {
                title: "Random Act",
                description: "Buy coffee for a stranger and share their story",
                category: "Social Good",
                coins: 1000,
                difficulty: "Easy",
                emoji: "☕"
              },
              {
                title: "Skill Master",
                description: "Learn and perform a magic trick",
                category: "Skill",
                coins: 800,
                difficulty: "Hard",
                emoji: "🎩"
              },
              {
                title: "Brain Teaser",
                description: "Solve 10 riddles in under 5 minutes",
                category: "Knowledge",
                coins: 600,
                difficulty: "Medium",
                emoji: "🧠"
              }
            ].map((dare, index) => (
              <div 
                key={`dare-2-${index}`}
                className="flex-shrink-0 w-80 soft-card p-6 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{dare.emoji}</div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {dare.category}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {dare.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dare.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-pastel-yellow" />
                    <span className="font-semibold text-foreground">{dare.coins}</span>
                  </div>
                  <span className={`text-xs font-medium ${
                    dare.difficulty === 'Easy' ? 'text-green-500' : 
                    dare.difficulty === 'Medium' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {dare.difficulty}
                  </span>
                </div>

                {/* Slide to Accept */}
                <SlideToAccept onAccept={() => console.log(`Accepted: ${dare.title}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dare of the Day */}
      <section className="relative z-10 px-6 py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-bounce-gentle">
              <Star className="w-5 h-5 text-primary animate-spin-slow" />
              <span className="text-sm font-bold text-primary">FEATURED</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 font-extrabold animate-fade-in">
              Dare of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pastel-coral animate-gradient-shift">Day</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The ultimate challenge awaits. Are you brave enough?
            </p>
          </div>

          {/* Main Dare Card */}
          <div className="relative">
            {/* Animated Background Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-primary/20 rounded-full animate-ping-slow" />
              <div className="absolute w-80 h-80 border-4 border-secondary/20 rounded-full animate-ping-slower" />
              <div className="absolute w-96 h-96 border-4 border-pastel-coral/20 rounded-full animate-ping-slowest" />
            </div>

            {/* Central Card */}
            <div className="relative soft-card p-8 md:p-12 shadow-2xl border-2 border-primary/30 animate-float-slow hover:scale-105 transition-all duration-500">
              {/* Sparkle Effects */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full blur-md animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-pastel-coral rounded-2xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative text-6xl md:text-7xl animate-bounce-gentle">
                    🏆
                  </div>
                </div>
              </div>

              {/* Category & Difficulty */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                  EPIC CHALLENGE
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg animate-pulse">
                  🔥 LEGENDARY
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-center mb-6 text-foreground animate-fade-in">
                The Ultimate Social Dare
              </h3>

              {/* Description */}
              <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Compliment 10 strangers in creative ways and capture their genuine reactions. 
                Spread positivity and make someone's day brighter! Share your most heartwarming moment.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-2xl bg-muted/50 border border-border animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <Coins className="w-6 h-6 mx-auto mb-2 text-pastel-yellow" />
                  <div className="font-bold text-2xl text-foreground">2500</div>
                  <div className="text-xs text-muted-foreground">Coins</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-muted/50 border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Timer className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-2xl text-foreground">24h</div>
                  <div className="text-xs text-muted-foreground">Time Limit</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-muted/50 border border-border animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Users className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <div className="font-bold text-2xl text-foreground">1.2K</div>
                  <div className="text-xs text-muted-foreground">Accepted</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="group flex items-center gap-3 text-lg px-12 py-6"
                >
                  <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Accept the Challenge
                  <Flame className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>

              {/* Timer Countdown */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Expires in:</p>
                <div className="flex items-center justify-center gap-2 font-display text-2xl font-bold text-primary animate-pulse">
                  <span>18</span>:<span>32</span>:<span>45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
