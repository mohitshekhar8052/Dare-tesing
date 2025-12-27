"use client"

import { useState, useRef, useEffect } from "react"
import { Zap, Check } from "lucide-react"

interface SlideToAcceptProps {
  onAccept?: () => void
}

export function SlideToAccept({ onAccept }: SlideToAcceptProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(0)
  const [isAccepted, setIsAccepted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)

  const handleStart = (clientX: number) => {
    if (isAccepted) return
    setIsDragging(true)
    startXRef.current = clientX - position
  }

  const handleMove = (clientX: number) => {
    if (!isDragging || isAccepted) return
    
    const container = containerRef.current
    if (!container) return

    const maxWidth = container.offsetWidth - 56 // 56px is button width
    const newPosition = Math.max(0, Math.min(clientX - startXRef.current, maxWidth))
    setPosition(newPosition)

    // Check if slid to the end (90% threshold)
    if (newPosition >= maxWidth * 0.9) {
      setIsAccepted(true)
      setPosition(maxWidth)
      setTimeout(() => {
        onAccept?.()
      }, 600)
    }
  }

  const handleEnd = () => {
    if (isAccepted) return
    setIsDragging(false)
    
    const container = containerRef.current
    if (!container) return

    const maxWidth = container.offsetWidth - 56
    
    // If not at the end, slide back
    if (position < maxWidth * 0.9) {
      setPosition(0)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const handleMouseUp = () => handleEnd()
    const handleTouchEnd = () => handleEnd()

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, position])

  return (
    <div 
      ref={containerRef}
      className={`relative h-12 rounded-full overflow-hidden select-none ${
        isAccepted 
          ? 'bg-gradient-to-r from-green-400 to-green-500' 
          : 'bg-gradient-to-r from-muted via-muted to-muted/50'
      } transition-all duration-300`}
    >
      {/* Background progress fill */}
      {!isAccepted && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transition-all duration-200"
          style={{ 
            width: `${Math.min(position + 56, containerRef.current?.offsetWidth || 0)}px`,
          }}
        />
      )}

      {/* Text label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span 
          className={`text-sm font-semibold transition-all duration-300 ${
            isAccepted 
              ? 'text-white scale-110' 
              : position > 40 
                ? 'text-primary opacity-0' 
                : 'text-muted-foreground'
          }`}
        >
          {isAccepted ? '✓ Accepted!' : 'Slide to Accept →'}
        </span>
      </div>

      {/* Success checkmark */}
      {isAccepted && (
        <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
          <Check className="w-6 h-6 text-white animate-bounce" strokeWidth={3} />
        </div>
      )}

      {/* Draggable button */}
      <button
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        className={`absolute left-0 top-0 bottom-0 w-14 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none ${
          isAccepted 
            ? 'bg-white shadow-lg' 
            : 'bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg'
        } transition-all duration-200 ${
          isDragging ? 'scale-105' : ''
        }`}
        style={{ 
          transform: `translateX(${position}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, background 0.3s'
        }}
      >
        {isAccepted ? (
          <Check className="w-5 h-5 text-green-500 animate-scale-in" strokeWidth={3} />
        ) : (
          <Zap 
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isDragging ? 'rotate-12 scale-110' : ''
            }`} 
          />
        )}
      </button>

      {/* Particle effects on drag */}
      {isDragging && !isAccepted && (
        <>
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-ping"
            style={{ left: `${position + 28}px` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary rounded-full animate-ping"
            style={{ left: `${position + 20}px`, animationDelay: '0.1s' }}
          />
        </>
      )}
    </div>
  )
}
