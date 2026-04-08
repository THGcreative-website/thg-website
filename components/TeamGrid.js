'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

export default function TeamGrid({ members, departments }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {departments.map(dept => {
        const deptMembers = members.filter(m => m.department === dept.key)
        if (deptMembers.length === 0) return null
        return (
          <div key={dept.key} style={{ marginBottom: '64px' }}>
            {/* Department label */}
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '24px',
              paddingBottom: '12px',
              borderBottom: '1px solid #dddddd',
            }}>
              {dept.label}
            </div>

            {/* Member cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px',
            }}>
              {deptMembers.map(member => (
                <div
                  key={member._id}
                  onClick={() => setSelected(member)}
                  style={{
                    cursor: 'pointer',
                    background: 'var(--white)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Photo with hover overlay */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    background: '#dddddd',
                  }}>
                    {member.photoUrl && (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        sizes="220px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    )}
                    {/* Hover overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(239,105,36,0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                      }}>
                        View Bio
                      </span>
                    </div>
                  </div>

                  {/* Name and title */}
                  <div style={{ padding: '14px 0 0' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--dark-gray)',
                      marginBottom: '4px',
                    }}>
                      {member.name}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 300,
                      color: 'var(--mid-gray)',
                      lineHeight: 1.3,
                    }}>
                      {member.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* ── MODAL ── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              maxWidth: '760px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
            }}
          >
            {/* Left — photo */}
            <div style={{
              position: 'relative',
              background: '#eeeeee',
              minHeight: '280px',
            }}>
              {selected.photoUrl && (
                <Image
                  src={selected.photoUrl}
                  alt={selected.name}
                  fill
                  sizes="220px"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              )}
              {/* Orange bottom bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--orange)',
              }} />
            </div>

            {/* Right — bio content */}
            <div style={{ padding: '36px 36px 36px 32px' }}>
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'var(--mid-gray)',
                  lineHeight: 1,
                  padding: '4px 8px',
                }}
              >
                ×
              </button>

              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '8px',
              }}>
                {selected.department === 'executive' ? 'Executive Leadership' :
                 selected.department === 'creative' ? 'Creative Leadership' :
                 selected.department === 'production' ? 'Production Leadership' :
                 'Support Leadership'}
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--dark-gray)',
                marginBottom: '4px',
              }}>
                {selected.name}
              </h3>
              <p style={{
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--mid-gray)',
                marginBottom: '24px',
              }}>
                {selected.title}
              </p>

              {/* Bio rich text */}
              {selected.bio && (
                <div style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'var(--mid-gray)',
                }}>
                  <PortableText
                    value={selected.bio}
                    components={{
                      block: {
                        normal: ({children}) => (
                          <p style={{ marginBottom: '16px' }}>{children}</p>
                        ),
                        h4: ({children}) => (
                          <h4 style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--orange)',
                            marginBottom: '8px',
                            marginTop: '20px',
                          }}>
                            {children}
                          </h4>
                        ),
                      },
                      list: {
                        bullet: ({children}) => (
                          <ul style={{
                            paddingLeft: '16px',
                            marginBottom: '16px',
                          }}>
                            {children}
                          </ul>
                        ),
                      },
                      listItem: {
                        bullet: ({children}) => (
                          <li style={{ marginBottom: '4px' }}>{children}</li>
                        ),
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
