'use client'

import React, { useState, useEffect } from 'react'

const texts = ["Apa kabar JABAR DIGITAL?", "Salam dari Sena!"]
const subTexts = ["try clicking the text above!", "click on this text to see my repo!", "https://github.com/senaprasena168/JadigTask1"]
const repoLink = "https://github.com/senaprasena168/JadigTask1"

export default function Page() {
  const [isExploding, setIsExploding] = useState(false)
  const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 })
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentSubTextIndex, setCurrentSubTextIndex] = useState(0)
  const [subTextAnimation, setSubTextAnimation] = useState('')

  useEffect(() => {
    const mainTextInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 2000)
    return () => clearInterval(mainTextInterval)
  }, [])

  useEffect(() => {
    // 1. Start fading in
    setSubTextAnimation('fading-in');

    // 2. After 0.5s, enter the 'hold' phase
    const holdTimer = setTimeout(() => {
      setSubTextAnimation('visible');
    }, 500);

    // 3. After 1.5s (0.5s fade-in + 1s hold), start fading out
    const fadeOutTimer = setTimeout(() => {
      setSubTextAnimation('fading-out');
    }, 1500);

    // 4. After 2s (full cycle), change the text index to trigger the next cycle
    const cycleTimer = setTimeout(() => {
      setCurrentSubTextIndex((prevIndex) => (prevIndex + 1) % subTexts.length);
    }, 2000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(cycleTimer);
    };
  }, [currentSubTextIndex]);


  const handleClick = () => {
    const x = (Math.random() - 0.5) * window.innerWidth * 0.25
    const y = (Math.random() - 0.5) * window.innerHeight * 0.25
    setExplosionPosition({ x, y })
    setIsExploding(true)
    setTimeout(() => setIsExploding(false), 600)
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <button className="burning-button" onClick={handleClick}>
        {texts[currentTextIndex]}
      </button>
      <a href={repoLink} target="_blank" rel="noopener noreferrer" className={`sub-text ${subTextAnimation}`}>
        {subTexts[currentSubTextIndex]}
      </a>
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