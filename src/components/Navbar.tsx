"use client";

import { useState } from "react";
import { NavLink } from "./NavLink";
import { Menu, X, Flame } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dares", label: "Dares" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              href="/"
              className="flex items-center gap-2 text-2xl font-extrabold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all"
            >
              <Flame className="w-7 h-7 text-primary" />
              DARE
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                activeClassName="text-primary bg-primary/10"
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              href="/auth"
              className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
            >
              Sign In
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-primary/5 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/95 border-t border-white/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                activeClassName="bg-primary/10 text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              href="/auth"
              className="block px-4 py-3 mt-2 text-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
