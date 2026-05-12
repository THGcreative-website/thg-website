import { client } from '../../../lib/sanity'
import Image from 'next/image'
import VideoPlayer from '../../../components/VideoPlayer'
import ComparisonSlider from '../../../components/ComparisonSlider'
import { PortableText } from '@portabletext/react'

const portableComponents = {
  block: {
    normal: ({children}) => (
      <p style={{ marginBottom: '1.2em' }}>{children}</p>
    ),
    small: ({children}) => (
      <p style={{ fontSize: '14px', marginBottom: '1.2em' }}>{children}</p>
    ),
    large: ({children}) => (
      <p style={{ fontSize: '24px', marginBottom: '1.2em' }}>{children}</p>
    ),
    h3: ({children}) => (
      <h3 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--dark-gray)',
        marginBottom: '0.6em',
        marginTop: '1.4em',
      }}>
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({children}) => (
      <strong style={{ fontWeight: 700, color: 'var(--dark-gray)' }}>{children}</strong>
    ),
    em: ({children}) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    underline: ({children}) => (
      <span style={{ textDecoration: 'underline' }}>{children}</span>
    ),
    highlight: ({children, value}) => (
      <mark style={{ 
        background: '#EF6924',
        color: '#ffffff',
        padding: '0 3px',
        borderRadius: '2px',
      }}>
        {children}
      </mark>
    ),
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params

  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      client,
      location,
      industry,
      scope,
      duration,
      "heroImageUrl": heroImage.asset->url,
      awards[]{
        organization,
        awardName,
        year,
        "logoUrl": logo.asset->url,
      },
      descriptionOne,
      "videoUrl": video.asset->url,
      descriptionTwo,
      "sliderLeftUrl": sliderImageLeft.asset->url,
      "sliderRightUrl": sliderImageRight.asset->url,
      descriptionThree,
      "galleryImages": gallery[].asset->url,
      pullQuote,
    }`,
    { slug }
  )

  if (!project) {
    return <div style={{ padding: '100px 72px' }}>Project not found</div>
  }

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: 'var(--dark-gray)',
      }}>
        {project.heroImageUrl && (
          <Image
            src={project.heroImageUrl}
            alt={project.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.7 }}
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
          padding: '0 72px 64px',
          maxWidth: '960px',
        }}>
          {project.industry && (
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '16px',
            }}>
              {project.industry}
            </div>
          )}
          <h1 style={{
            fontSize: 'clamp(52px, 8vw, 100px)',
            fontWeight: 700,
            lineHeight: 1.0,
            color: '#ffffff',
          }}>
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── META BAND ── */}
      <section style={{
        background: 'var(--light-gray)',
        borderTop: '3px solid var(--orange)',
        padding: '32px 0',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 72px',
          display: 'flex',
        }}>
          {[
            { label: 'Client', value: project.client },
            { label: 'Location', value: project.location },
            { label: 'Industry', value: project.industry },
            { label: 'Scope', value: project.scope },
            { label: 'Duration', value: project.duration },
          ].filter(item => item.value).map((item, i, arr) => (
            <div key={item.label} style={{
              flex: 1,
              paddingRight: i < arr.length - 1 ? '40px' : '0',
              paddingLeft: i > 0 ? '40px' : '0',
              borderRight: i < arr.length - 1 ? '1px solid #dddddd' : 'none',
            }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '6px',
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--dark-gray)',
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS ── */}
      {project.awards && project.awards.length > 0 && (
        <section style={{
          background: 'var(--light-gray)',
          padding: '24px 0',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 72px',
            display: 'flex',
            gap: '0',
            alignItems: 'stretch',
          }}>
            <div style={{
              paddingRight: '40px',
              borderRight: '1px solid #dddddd',
              display: 'flex',
              alignItems: 'center',
              minWidth: '100px',
            }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
              }}>
                Awards
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              flex: 1,
            }}>
              {project.awards.map((award, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '16px',
                  padding: '12px 40px',
                  borderLeft: '1px solid #dddddd',
                  borderBottom: Math.floor(i / 3) < Math.floor((project.awards.length - 1) / 3)
                    ? '1px solid #dddddd'
                    : 'none',
                }}>
                  {award.logoUrl && (
                    <div style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      position: 'relative',
                    }}>
                      <Image
                        src={award.logoUrl}
                        alt={`${award.organization} logo`}
                        fill
                        sizes="40px"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--dark-gray)',
                      lineHeight: 1.2,
                      marginBottom: '4px',
                    }}>
                      {award.organization}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 300,
                      color: 'var(--mid-gray)',
                      lineHeight: 1.3,
                    }}>
                      {award.awardName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DESCRIPTION ONE ── */}
      {project.descriptionOne && (
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 72px',
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--mid-gray)',
          }}>
            <PortableText
              value={project.descriptionOne}
              components={portableComponents}
            />
          </div>
        </section>
      )}

      {/* ── VIDEO ── */}
      <section style={{
        background: '#111111',
        padding: '72px 0',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 72px',
        }}>
          <VideoPlayer videoUrl={project.videoUrl} title={project.title} />
        </div>
      </section>

      {/* ── DESCRIPTION TWO ── */}
      {project.descriptionTwo && (
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 72px',
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--mid-gray)',
          }}>
            <PortableText
              value={project.descriptionTwo}
              components={portableComponents}
            />
          </div>
        </section>
      )}

      {/* ── COMPARISON SLIDER ── */}
      {project.sliderLeftUrl && project.sliderRightUrl && (
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 72px 80px',
        }}>
          <ComparisonSlider
            leftUrl={project.sliderLeftUrl}
            rightUrl={project.sliderRightUrl}
            title={project.title}
          />
        </section>
      )}

      {/* ── DESCRIPTION THREE ── */}
      {project.descriptionThree && (
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 72px 80px',
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--mid-gray)',
          }}>
            <PortableText
              value={project.descriptionThree}
              components={portableComponents}
            />
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 72px 96px',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '24px',
          }}>
            Project Gallery
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}>
            {project.galleryImages.map((url, i) => (
              <div key={i} style={{
                position: 'relative',
                height: '280px',
                overflow: 'hidden',
              }}>
                <Image
                  src={url}
                  alt={`${project.title} gallery ${i + 1}`}
                  fill
                  sizes="33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PULL QUOTE ── */}
      {project.pullQuote && (
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 72px 96px',
          borderLeft: '4px solid var(--orange)',
        }}>
          <blockquote style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: 'var(--dark-gray)',
          }}>
            {project.pullQuote}
          </blockquote>
        </section>
      )}

      {/* ── BACK TO PROJECTS ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 72px 96px 72px',
        borderTop: '1px solid #eeeeee',
      }}>
        <a href="/projects" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          textDecoration: 'none',
        }}>
          ← All Projects
        </a>
      </section>

    </div>
  )
}