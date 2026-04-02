'use client'

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '22px 48px',
      background: '#ffffff',
      borderBottom: '1px solid #f2f2f2',
    }}>
      <a href="/" style={{
        fontFamily: 'var(--ff-body)',
        fontSize: '15px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'var(--dark-gray)',
        textDecoration: 'none',
      }}>
        THG Creative
      </a>
      <ul style={{
        display: 'flex',
        gap: '36px',
        listStyle: 'none',
      }}>
        {['Who We Are', 'What We Do', 'Projects', 'Press', 'Connect'].map((item) => (
          <li key={item}>
            <a href={`/${item.toLowerCase().replace(/ /g, '-')}`} style={{
              fontFamily: 'var(--ff-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--dark-gray)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--orange)'}
            onMouseLeave={e => e.target.style.color = 'var(--dark-gray)'}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}