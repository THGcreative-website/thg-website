'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProjectBand({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{
        position: 'relative',
        display: 'block',
        height: '200px',
        overflow: 'hidden',
        textDecoration: 'none',
        border: '2px solid #000000',
        marginBottom: '4px'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image with zoom */}
      {project.thumbnailUrl && (
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
      )}

      {/* Dark overlay — slightly stronger on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered
          ? 'rgba(0,0,0,0.52)'
          : 'rgba(0,0,0,0.42)',
        transition: 'background 0.4s ease',
      }} />

      {/* Centered title */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        textAlign: 'center',
        padding: '0 48px',
      }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 36px)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
        }}>
          {project.title}
        </h2>
        {/* Location fades in on hover */}
        {project.location && (
          <p style={{
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            {project.location}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function ProjectBands({ projects }) {
  return (
    <div style={{
      paddingTop: '100px', // clear the fixed nav
      background: '#000000',
      padding: '100px 16px 16px'
    }}>
      {projects.map(project => (
        <ProjectBand key={project._id} project={project} />
      ))}
    </div>
  )
}