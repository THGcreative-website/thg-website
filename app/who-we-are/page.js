import { client } from '../../lib/sanity'
import Image from 'next/image'
import TeamGrid from '../../components/TeamGrid'

export default async function WhoWeArePage() {
  const [page, teamMembers] = await Promise.all([
    client.fetch(`*[_type == "whoWeAre"][0]{
      "heroImageUrl": heroImage.asset->url,
      storyHeading,
      storyText,
      teamIntroText,
      timeline,
      ctaHeading,
      ctaText,
      ctaEmail,
      ctaLinkedIn,
    }`),
    client.fetch(`*[_type == "teamMember"] | order(displayOrder asc){
      _id,
      name,
      title,
      department,
      "photoUrl": photo.asset->url,
      bio,
    }`)
  ])

  const departments = [
    { key: 'executive', label: 'Executive Leadership' },
    { key: 'creative', label: 'Creative Leadership' },
    { key: 'production', label: 'Production Leadership' },
    { key: 'support', label: 'Support Leadership' },
  ]

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: 'var(--dark-gray)',
      }}>
        {page?.heroImageUrl && (
          <Image
            src={page.heroImageUrl}
            alt="Who We Are"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.6 }}
            priority
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 72px 56px',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '12px',
          }}>
            THG Creative
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.0,
          }}>
            Who We Are
          </h1>
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      {page?.storyText && (
        <section style={{
          borderTop: '3px solid var(--orange)',
          background: 'var(--light-gray)',
          padding: '72px 0',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 72px',
          }}>
            {page.storyHeading && (
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                color: 'var(--dark-gray)',
                marginBottom: '24px',
              }}>
                {page.storyHeading}
              </h2>
            )}
            <p style={{
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'var(--mid-gray)',
            }}>
              {page.storyText}
            </p>
          </div>
        </section>
      )}

      {/* ── TIMELINE ── */}
      {page?.timeline && page.timeline.length > 0 && (
        <section style={{
          padding: '96px 0',
          background: 'var(--white)',
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 72px',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              textAlign: 'center',
              marginBottom: '64px',
            }}>
              Our History
            </div>
            <div style={{ position: 'relative' }}>
              {/* Center line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'var(--orange)',
                transform: 'translateX(-50%)',
              }} />

              {page.timeline.map((entry, i) => {
                const headingOnLeft = entry.side === 'left'
                return (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 40px 1fr',
                    gap: '0',
                    marginBottom: i < page.timeline.length - 1 ? '64px' : '0',
                    alignItems: 'center',
                  }}>
                    {/* Left column */}
                    <div style={{
                      textAlign: 'right',
                      paddingRight: '40px',
                    }}>
                      {headingOnLeft ? (
                        <>
                          <div style={{
                            fontSize: 'clamp(18px, 2.5vw, 24px)',
                            fontWeight: 700,
                            color: 'var(--dark-gray)',
                            lineHeight: 1.2,
                            marginBottom: '6px',
                          }}>
                            {entry.heading}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--orange)',
                            letterSpacing: '0.15em',
                          }}>
                            {entry.year}
                          </div>
                        </>
                      ) : (
                        <p style={{
                          fontSize: '15px',
                          fontWeight: 300,
                          lineHeight: 1.75,
                          color: 'var(--mid-gray)',
                        }}>
                          {entry.text}
                        </p>
                      )}
                    </div>

                    {/* Center dot */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                    }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'var(--orange)',
                        flexShrink: 0,
                      }} />
                    </div>

                    {/* Right column */}
                    <div style={{
                      paddingLeft: '40px',
                    }}>
                      {!headingOnLeft ? (
                        <>
                          <div style={{
                            fontSize: 'clamp(18px, 2.5vw, 24px)',
                            fontWeight: 700,
                            color: 'var(--dark-gray)',
                            lineHeight: 1.2,
                            marginBottom: '6px',
                          }}>
                            {entry.heading}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--orange)',
                            letterSpacing: '0.15em',
                          }}>
                            {entry.year}
                          </div>
                        </>
                      ) : (
                        <p style={{
                          fontSize: '15px',
                          fontWeight: 300,
                          lineHeight: 1.75,
                          color: 'var(--mid-gray)',
                        }}>
                          {entry.text}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM ── */}
      <section style={{
        background: 'var(--light-gray)',
        padding: '96px 0',
        borderTop: '1px solid #eeeeee',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 72px',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '12px',
          }}>
            Our People
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: 'var(--dark-gray)',
            marginBottom: '16px',
          }}>
            Senior Leadership Team
          </h2>
          {page?.teamIntroText && (
            <p style={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--mid-gray)',
              maxWidth: '700px',
              marginBottom: '64px',
            }}>
              {page.teamIntroText}
            </p>
          )}
          <TeamGrid members={teamMembers} departments={departments} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'var(--dark-gray)',
        padding: '96px 0',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 72px',
        }}>
          <div style={{
            width: '48px',
            height: '3px',
            background: 'var(--orange)',
            margin: '0 auto 32px',
          }} />
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.1,
          }}>
            {page?.ctaHeading || 'Work With Us'}
          </h2>
          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px',
          }}>
            {page?.ctaText || "We're not just looking for employees — we're looking for innovators, dreamers, and doers who share our passion for creating unforgettable experiences."}
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {page?.ctaEmail && (
              <a href={`mailto:${page.ctaEmail}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--orange)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '14px 32px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Get In Touch
              </a>
            )}
            {page?.ctaLinkedIn && (
              <a href={page.ctaLinkedIn} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '14px 32px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                View LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}