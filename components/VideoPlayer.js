'use client'

export default function VideoPlayer({ videoUrl, title }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '16 / 9',
      background: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {videoUrl ? (
        <video
          controls
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
        }}>
          {/* Play button */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Triangle play icon */}
            <div style={{
              width: 0,
              height: 0,
              borderTop: '14px solid transparent',
              borderBottom: '14px solid transparent',
              borderLeft: '24px solid #444444',
              marginLeft: '6px',
            }} />
          </div>
        </div>
      )}
    </div>
  )
}