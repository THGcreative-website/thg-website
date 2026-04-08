'use client'

import { useEffect, useRef, useState } from 'react'

const COLORS = [
  '#c45520',
  '#d9621f',
  '#ef6924',
  '#f47f3a',
  '#f89656',
]

export default function StatCircles({ stats }) {
  const [visible, setVisible] = useState([])
  const refs = useRef([])

  useEffect(() => {
    const observers = stats.map(function(_, i) {
      const observer = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              setTimeout(function() {
                setVisible(function(prev) {
                  if (prev.includes(i)) return prev
                  return [...prev, i]
                })
              }, i * 180)
              observer.disconnect()
            }
          })
        },
        { threshold: 0.2 }
      )
      if (refs.current[i]) {
        observer.observe(refs.current[i])
      }
      return observer
    })

    return function() {
      observers.forEach(function(o) { return o.disconnect() })
    }
  }, [stats])

  return (
    <section style={{
      padding: '96px 0',
      background: 'var(--white)',
    }}>
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
          70% {
            transform: scale(0.96);
          }
          85% {
            transform: scale(1.03);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {stats.map(function(stat, i) {
          const isVisible = visible.includes(i)
          const color = COLORS[i % COLORS.length]
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Circle */}
              <div
                ref={function(el) { refs.current[i] = el }}
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px',
                  textAlign: 'center',
                  flexShrink: 0,
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible
                    ? 'bounceIn 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards'
                    : 'none',
                }}
              >
                <span style={{
                  fontSize: 'clamp(48px, 6vw, 64px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  display: 'block',
                }}>
                  {stat.number}
                </span>
                {stat.unit && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginTop: '4px',
                    marginBottom: '12px',
                  }}>
                    {stat.unit}
                  </span>
                )}
                <p style={{
                  fontSize: '12px',
                  fontWeight: 300,
                  color: '#ffffff',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {stat.descriptionPlain && (
                    <span>{stat.descriptionPlain} </span>
                  )}
                  {stat.descriptionBold && (
                    <strong style={{ fontWeight: 700 }}>
                      {stat.descriptionBold}
                    </strong>
                  )}
                </p>
              </div>

              {/* Connector line — fades in after circle */}
              {i < stats.length - 1 && (
                <div style={{
                  width: '2px',
                  height: '40px',
                  background: color,
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.4s ease 0.5s',
                }} />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}