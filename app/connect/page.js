import { client } from '../../lib/sanity'
import Image from 'next/image'
import ContactForm from '../../components/ContactForm'

export default async function ConnectPage() {
  const page = await client.fetch(`*[_type == "connectPage"][0]{
    "heroImageUrl": heroImage.asset->url,
    offices,
    email,
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
            alt="Connect"
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
            Get In Touch
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.0,
          }}>
            Connect With Us
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 72px 96px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Contact form */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '12px',
          }}>
            Send a Message
          </div>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--dark-gray)',
            marginBottom: '32px',
            lineHeight: 1.2,
          }}>
            Let's Start a Conversation
          </h2>
          <ContactForm />
        </div>

        {/* Office locations */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '12px',
          }}>
            Our Offices
          </div>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--dark-gray)',
            marginBottom: '32px',
            lineHeight: 1.2,
          }}>
            Find Us
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}>
            {page?.offices?.map((office, i) => (
              <div key={i} style={{
                borderLeft: '3px solid var(--orange)',
                paddingLeft: '24px',
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--dark-gray)',
                  marginBottom: '8px',
                }}>
                  {office.city}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'var(--mid-gray)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-line',
                }}>
                  {office.address}
                </div>
                {office.phone && (
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--mid-gray)',
                    marginTop: '4px',
                  }}>
                    {office.phone}
                  </div>
                )}
              </div>
            ))}
            {page?.email && (
              <div style={{
                borderLeft: '3px solid var(--orange)',
                paddingLeft: '24px',
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--dark-gray)',
                  marginBottom: '8px',
                }}>
                  Email
                </div>
                <a href={`mailto:${page.email}`} style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'var(--orange)',
                  textDecoration: 'none',
                }}>
                  {page.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}