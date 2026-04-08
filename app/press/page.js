import { client } from '../../lib/sanity'
import Image from 'next/image'

export default async function PressPage() {

  const articles = await client.fetch(
    `*[_type == "pressArticle"] | order(date desc){
      _id,
      headline,
      summary,
      date,
      externalUrl,
      "imageUrl": image.asset->url,
    }`
  )

  const heroSection = (
    <section style={{
      position: 'relative',
      height: '60vh',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: 'var(--dark-gray)',
    }}>
      <Image
        src="https://thgcreative.com/wp-content/uploads/2025/08/MCN-Office-visit-1-e1756854598936.jpg"
        alt="Press"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', opacity: 0.6 }}
        priority
      />
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
          News and Media
        </div>
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.0,
        }}>
          Press
        </h1>
      </div>
    </section>
  )

  const articleCards = articles.map(function(article) {
    return (
      <article key={article._id}>
        {article.imageUrl && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '220px',
            overflow: 'hidden',
            marginBottom: '20px',
            background: '#eeeeee',
          }}>
            <Image
              src={article.imageUrl}
              alt={article.headline}
              fill
              sizes="33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {article.date && (
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '10px',
          }}>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}
        <h2 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--dark-gray)',
          lineHeight: 1.4,
          marginBottom: '12px',
        }}>
          {article.headline}
        </h2>
        {article.summary && (
          <p style={{
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--mid-gray)',
            marginBottom: '16px',
          }}>
            {article.summary}
          </p>
        )}
        {article.externalUrl && (
            <a
            href={article.externalUrl}
            target={'_blank'}
            rel={'noopener noreferrer'}
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              textDecoration: 'none',
            }}
            >
            Read More
            </a>
        )}
      </article>
    )
  })

  const mediaInquiries = (
    <section style={{
      background: 'var(--light-gray)',
      borderTop: '1px solid #eeeeee',
      marginTop: '96px',
      padding: '72px 0',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 72px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          marginBottom: '16px',
        }}>
          Media Inquiries
        </div>
        <p style={{
          fontSize: '16px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'var(--mid-gray)',
          marginBottom: '28px',
        }}>
          We are always excited to share the stories behind our work. Whether you are a journalist, blogger, or industry publication, our team is available to provide background, interviews, and insights.
        </p>
        <a
          href="mailto:studio@thgcreative.com"
          style={{
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
          }}
        >
          Contact Us
        </a>
      </div>
    </section>
  )

  return (
    <div style={{ background: 'var(--white)' }}>
      {heroSection}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 72px 0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px 32px',
        }}>
          {articleCards}
        </div>
      </section>
      {mediaInquiries}
    </div>
  )
}