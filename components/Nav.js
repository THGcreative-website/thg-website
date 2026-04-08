'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/who-we-are', label: 'Who We Are' },
    { href: '/what-we-do', label: 'What We Do' },
    { href: '/projects', label: 'Projects' },
    { href: '/press', label: 'Press' },
    { href: '/connect', label: 'Connect' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 48px',
      background: 'transparent',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Image
          src="/thg-logo.png"
          alt="THG Creative"
          width={100}
          height={65}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>

      {/* Nav links */}
      <ul style={{
        display: 'flex',
        gap: '36px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        {links.map(link => {
          const isActive = pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href))
          return (
            <li key={link.href}>
              <Link href={link.href} style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
                opacity: isActive ? 1 : 0.8,
                transition: 'opacity 0.2s',
                paddingBottom: '4px',
                borderBottom: isActive ? '1px solid var(--orange)' : '1px solid transparent',
              }}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}