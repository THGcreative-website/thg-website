'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function ComparisonSlider({ leftUrl, rightUrl, title }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setPosition(pct)
  }, [])

  const onMouseDown = () => { isDragging.current = true }
  const onMouseUp = () => { isDragging.current = false }
  const onMouseMove = (e) => { if (isDragging.current) updatePosition(e.clientX) }
  const onTouchMove = (e) => { updatePosition(e.touches[0].clientX) }

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        cursor: 'ew-resize',
        borderRadius: '8px',
        userSelect: 'none',
      }}
    >
      {/* Right image — full width base */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={rightUrl}
          alt={`${title} photo`}
          fill
          style={{ objectFit: 'cover' }}
          draggable={false}
        />
      </div>

      {/* Left image — clipped to slider position */}
      <div style={{
        position: 'absolute',
        inset: 0,
        clipPath: `inset(0 ${100 - position}% 0 0)`,
      }}>
        <Image
          src={leftUrl}
          alt={`${title} drawing`}
          fill
          style={{ objectFit: 'cover' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${position}%`,
        transform: 'translateX(-50%)',
        width: '2px',
        background: '#ffffff',
        pointerEvents: 'none',
      }} />

      {/* Handle */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: `${position}%`,
        transform: 'translate(-50%, -50%)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {/* Double arrow */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L2 10L7 15" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5L18 10L13 15" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#ffffff',
        opacity: 0.8,
      }}>
        Concept
      </div>
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#ffffff',
        opacity: 0.8,
      }}>
        Built
      </div>

    </div>
  )
}