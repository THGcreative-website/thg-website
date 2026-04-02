import { client } from '../lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const homepage = await client.fetch(`
    *[_type == "homepage"][0]{
      heroTagline,
      heroSubtitle,
      "heroImageUrl": heroImage.asset->url,
      clientsHeading,
      clientLogos[]{
        name,
        "logoUrl": logo.asset->url,
      },
      featuredProjects[]->{
        title,
        location,
        industry,
        "slug": slug.current,
        "thumbnailUrl": heroImage.asset->url,
      },
    }
  `)

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--dark-gray)',
      }}>
        {homepage.heroImageUrl && (
          <Image
            src={homepage.heroImageUrl}
            alt="THG Creative"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.55 }}
            priority
          />
        )}
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 48px',
          maxWidth: '900px',
        }}>
          {/* Orange accent line */}
          <div style={{
            width: '48px',
            height: '3px',
            background: 'var(--orange)',
            margin: '0 auto 32px',
          }} />
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '0.08em',
            color: '#ffffff',
            marginBottom: '32px',
            textTransform: 'uppercase',
          }}>
            {homepage.heroTagline}
          </h1>
          {homepage.heroSubtitle && (
            <p style={{
              fontSize: 'clamp(15px, 2vw, 20px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '640px',
              margin: '0 auto 40px',
            }}>
              {homepage.heroSubtitle}
            </p>
          )}
          <Link href="/projects" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--orange)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '14px 32px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}>
            Explore Our Work
          </Link>
        </div>
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
          }} />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{
        borderTop: '3px solid var(--orange)',
        background: 'var(--light-gray)',
        padding: '64px 0',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 72px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--dark-gray)',
          }}>
            From <strong style={{ fontWeight: 600 }}>concept to completion</strong>, THG Creative transforms ambitious ideas into built experiences through <strong style={{ fontWeight: 600 }}>innovative design</strong> and <strong style={{ fontWeight: 600 }}>hands-on collaboration</strong>.
          </p>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {homepage.featuredProjects && homepage.featuredProjects.length > 0 && (
        <section style={{
          padding: '96px 0',
          background: 'var(--white)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 72px',
          }}>
            {/* Section header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px',
            }}>
              <div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  marginBottom: '8px',
                }}>
                  Our Work
                </div>
                <h2 style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 700,
                  color: 'var(--dark-gray)',
                  lineHeight: 1.1,
                }}>
                  Featured Projects
                </h2>
              </div>
              <Link href="/projects" style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                textDecoration: 'none',
              }}>
                View All →
              </Link>
            </div>

            {/* Project grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
            }}>
              {homepage.featuredProjects.map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    height: i === 0 ? '520px' : '320px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    gridColumn: i === 0 ? 'span 2' : 'span 1',
                  }}
                >
                  {project.thumbnailUrl && (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes={i === 0 ? '66vw' : '33vw'}
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />
                  )}
                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  }} />
                  {/* Project info */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    zIndex: 2,
                  }}>
                    {project.industry && (
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--orange)',
                        marginBottom: '6px',
                      }}>
                        {project.industry}
                      </div>
                    )}
                    <div style={{
                      fontSize: i === 0 ? '28px' : '20px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.1,
                      marginBottom: '4px',
                    }}>
                      {project.title}
                    </div>
                    {project.location && (
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 300,
                      }}>
                        {project.location}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLIENT LOGOS ── */}
      {homepage.clientLogos && homepage.clientLogos.length > 0 && (
        <section style={{
          background: 'var(--light-gray)',
          borderTop: '1px solid #eeeeee',
          padding: '64px 0',
          overflow: 'hidden',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 72px',
          }}>
            {homepage.clientsHeading && (
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                textAlign: 'center',
                marginBottom: '40px',
              }}>
                {homepage.clientsHeading}
              </div>
            )}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {homepage.clientLogos.map((client, i) => (
                <div key={i} style={{
                  position: 'relative',
                  width: '120px',
                  height: '60px',
                  flexShrink: 0,
                }}>
                  {client.logoUrl && (
                    <Image
                      src={client.logoUrl}
                      alt={client.name}
                      fill
                      sizes="120px"
                      style={{ objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.1,
          }}>
            Let's Build Something Extraordinary
          </h2>
          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px',
            lineHeight: 1.7,
          }}>
            We partner with visionaries to create experiences that captivate, inspire, and endure.
          </p>
          <Link href="/connect" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
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
          </Link>
        </div>
      </section>

    </div>
  )
}