import { client } from '../../lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectsPage() {
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt asc){
    _id,
    title,
    client,
    location,
    industry,
    "slug": slug.current,
    "thumbnailUrl": heroImage.asset->url,
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
        <Image
          src="https://thgcreative.com/wp-content/uploads/2016/07/one-world-Project-thumbnail.jpg"
          alt="Projects"
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
            Our Work
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.0,
          }}>
            Projects
          </h1>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 72px 96px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
        }}>
          {projects.map((project, i) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              style={{
                position: 'relative',
                display: 'block',
                height: '320px',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              {project.thumbnailUrl && (
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  fill
                  sizes="33vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                zIndex: 2,
              }}>
                {project.industry && (
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginBottom: '4px',
                  }}>
                    {project.industry}
                  </div>
                )}
                <div style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '4px',
                }}>
                  {project.title}
                </div>
                {project.location && (
                  <div style={{
                    fontSize: '11px',
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
      </section>

    </div>
  )
}