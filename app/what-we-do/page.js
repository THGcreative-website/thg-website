import { client } from '../../lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import StatCircles from '../../components/StatCircles'

export default async function WhatWeDoPage() {
  const page = await client.fetch(`*[_type == "whatWeDo"][0]{
    "heroImageUrl": heroImage.asset->url,
    introHeading,
    introText,
    stats,
    clientsHeading,
    clientsText,
    ctaHeading,
    ctaText,
  }`)

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
            alt="What We Do"
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
            Our Services
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.0,
          }}>
            What We Do
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      {page?.introText && (
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
            {page.introHeading && (
              <h2 style={{
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 700,
                color: 'var(--dark-gray)',
                marginBottom: '24px',
                lineHeight: 1.3,
              }}>
                {page.introHeading}
              </h2>
            )}
            <p style={{
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'var(--mid-gray)',
            }}>
              {page.introText}
            </p>
          </div>
        </section>
      )}

      {/* ── STATS ── */}
      {page?.stats && page.stats.length > 0 && (<StatCircles stats={page.stats} />)}  

      {/* ── CLIENTS ── */}
      {page?.clientsText && (
        <section style={{
          background: 'var(--light-gray)',
          borderTop: '1px solid #eeeeee',
          padding: '72px 0',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 72px',
            textAlign: 'center',
          }}>
            {page.clientsHeading && (
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '24px',
              }}>
                {page.clientsHeading}
              </div>
            )}
            <p style={{
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'var(--mid-gray)',
            }}>
              {page.clientsText}
            </p>
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
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.1,
          }}>
            {page?.ctaHeading || 'See Our Work in Action'}
          </h2>
          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px',
          }}>
            {page?.ctaText || 'Explore our featured projects spanning theme parks, museums, cultural landmarks, and beyond.'}
          </p>
          <Link href="/projects" style={{
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
            View Projects
          </Link>
        </div>
      </section>

    </div>
  )
}