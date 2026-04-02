import './globals.css'
import Nav from '../components/Nav'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'THG Creative',
  description: 'Experience design for iconic destinations worldwide',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}