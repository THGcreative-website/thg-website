'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    const response = await fetch('FORMSPREE_ENDPOINT_HERE', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      setStatus('sent')
      e.target.reset()
    } else {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'var(--ff-body)',
    fontWeight: 300,
    color: 'var(--dark-gray)',
    background: 'var(--light-gray)',
    border: '1px solid #dddddd',
    borderRadius: '0',
    outline: 'none',
    marginBottom: '16px',
    boxSizing: 'border-box',
  }

  if (status === 'sent') {
    return (
      <div style={{
        padding: '32px',
        background: 'var(--light-gray)',
        borderLeft: '3px solid var(--orange)',
        fontSize: '16px',
        fontWeight: 300,
        color: 'var(--dark-gray)',
        lineHeight: 1.7,
      }}>
        Thank you for reaching out — we'll be in touch shortly.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <input
          name="firstName"
          placeholder="First Name"
          required
          style={inputStyle}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          style={inputStyle}
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        style={inputStyle}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        style={inputStyle}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={6}
        style={{ ...inputStyle, resize: 'vertical', marginBottom: '24px' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          background: status === 'sending' ? '#aaaaaa' : 'var(--orange)',
          color: '#ffffff',
          border: 'none',
          padding: '14px 32px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--ff-body)',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p style={{
          marginTop: '12px',
          fontSize: '13px',
          color: '#cc0000',
        }}>
          Something went wrong — please try emailing us directly at studio@thgcreative.com
        </p>
      )}
    </form>
  )
}