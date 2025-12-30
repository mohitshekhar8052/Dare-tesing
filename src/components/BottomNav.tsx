"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, Trophy, User, Plus } from "lucide-react"
import GlassSurface from "./GlassSurface"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dares", icon: Zap, label: "Dares" },
  { href: "/create-dare", icon: Plus, label: "Create" },
  { href: "/leaderboard", icon: Trophy, label: "Board" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe pointer-events-none">
      <div className="mx-auto mb-3 max-w-md px-4 pointer-events-auto">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={28}
          brightness={95}
          opacity={0.7}
          blur={12}
          displace={2}
          backgroundOpacity={0.3}
          saturation={1.2}
          className="shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <div className="relative w-full flex items-center justify-around gap-1 px-3 py-2.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 group min-w-[56px] hover:scale-105 active:scale-95"
                >
                  {/* Active indicator pill */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl backdrop-blur-sm animate-fade-in shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-xl" />
                    </>
                  )}
                  
                  {/* Icon container with glow */}
                  <div className="relative z-10">
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full animate-pulse" />
                    )}
                    <Icon
                      className={`w-5 h-5 relative transition-all duration-300 ${
                        isActive
                          ? "text-primary drop-shadow-[0_2px_8px_rgba(124,58,237,0.5)]"
                          : "text-slate-500 group-hover:text-primary group-hover:drop-shadow-[0_2px_4px_rgba(124,58,237,0.3)]"
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  
                  {/* Label with gradient on active */}
                  <span
                    className={`text-[9px] font-bold transition-all duration-300 relative z-10 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                        : "text-slate-500 group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Hover ripple */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </GlassSurface>
        
        {/* Shadow blob underneath */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/10 blur-2xl rounded-full -z-10" />
      </div>
    </nav>
  )
}

