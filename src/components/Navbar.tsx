"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavLink } from "./NavLink";
import { Menu, X, Flame, User, LogOut, UserCircle, ChevronDown } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, userData } = useUser();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const firstName = userData?.name.split(" ")[0] || "User";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20" style={{ WebkitBackdropFilter: 'blur(8px)' }}>
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
            {user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {firstName}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        router.push('/profile');
                      }}
                      className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="font-medium">My Profile</span>
                    </button>
                    <div className="border-t border-slate-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                href="/auth"
                className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign In
              </NavLink>
            )}
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
        <div className="md:hidden backdrop-blur-md bg-white/60 border-t border-white/20" style={{ WebkitBackdropFilter: 'blur(8px)' }}>
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
            {user ? (
              <>
                <NavLink
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                  activeClassName="bg-primary/10 text-primary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle className="w-4 h-4" />
                  {firstName}'s Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 mt-2 text-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                href="/auth"
                className="block px-4 py-3 mt-2 text-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
