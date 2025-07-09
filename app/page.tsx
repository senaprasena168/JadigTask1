'use client'

import React, { useState, useEffect } from 'react'

const texts = ["Apa kabar JABAR DIGITAL?", "Salam dari Sena!"]

export default function Page() {
  const [isExploding, setIsExploding] = useState(false)
  const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 })
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    const x = (Math.random() - 0.5) * window.innerWidth * 0.25
    const y = (Math.random() - 0.5) * window.innerHeight * 0.25
    setExplosionPosition({ x, y })
    setIsExploding(true)
    setTimeout(() => setIsExploding(false), 600)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button className="burning-button" onClick={handleClick}>
        {texts[currentTextIndex]}
      </button>
      {isExploding && (
        <div
          className="explosion"
          style={{
            left: `calc(50% + ${explosionPosition.x}px)`,
            top: `calc(50% + ${explosionPosition.y}px)`,
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--x': `${(Math.random() - 0.5) * 400}px`,
                '--y': `${(Math.random() - 0.5) * 400}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  )
}