'use client'
import React, { useState } from 'react'

import { Leaf, Wine, Compass, Wind, Users, Map } from 'lucide-react'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const highlightIconProps = { size: 26, strokeWidth: 1.5 }

const highlights = [
  {
    text: 'IGBC Pre-Certified Gold Rated Green Homes',
    icon: <Leaf {...highlightIconProps} />,
  },
  {
    text: 'Sky Lifestyle Club on 30th & 31st Floors',
    icon: <Wine {...highlightIconProps} />,
  },
  {
    text: 'Vaastu-Compliant Residences for Positive Living',
    icon: <Compass {...highlightIconProps} />,
  },
  {
    text: 'Airy Interiors with Expansive Terrace-Style Balconies',
    icon: <Wind {...highlightIconProps} />,
  },
  {
    text: 'Exclusive Community Living for Residents',
    icon: <Users {...highlightIconProps} />,
  },
  {
    text: 'Excellent Connectivity to Key City Destinations',
    icon: <Map {...highlightIconProps} />,
  },
]

const HighlightCard = ({ item, idx, setIsOpen }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-up"
      data-aos-delay={idx * 60}
      style={{
        background: '#fff',
        border: '1px solid var(--color-gold-light)',
        borderTop: '5px solid var(--color-gold)',
        borderRadius: '14px',
        padding: '28px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'default',
        transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: hovered
          ? '0 10px 32px var(--color-shadow-inner)'
          : '0 4px 15px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60px', height: '5px',
        background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
        borderRadius: '0 0 10px 10px',
      }} />


      {/* Icon circle */}
      <div style={{
        width: '62px', height: '62px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '14px',
        background: hovered ? 'var(--color-gold)' : 'var(--color-gold-bg)',
        border: `2px solid ${hovered ? 'var(--color-gold)' : 'var(--color-gold-light)'}`,
        color: hovered ? '#fff' : 'var(--color-gold)',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? '0 0 20px var(--color-shadow-inner)' : 'none',
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <p style={{
        fontFamily: F_SANS,
        fontSize: '13px',
        lineHeight: 1.6,
        color: 'var(--color-gold)',
        fontWeight: '600',
        margin: 0,
        transition: 'color 0.28s ease',
      }}>
        {item.text}
      </p>
    </div>
  )
}

const Highlights = ({ setIsOpen }) => (
  <section id="highlights" style={{
    padding: '56px 0',
    background: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
  }}>
    <div className="container mx-auto px-4 md:px-8">

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }} data-aos="fade-up">
        <span style={{
          display: 'inline-block', padding: '4px 16px',
          background: 'var(--color-gold-bg)', borderRadius: '50px',
          fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)',
          fontFamily: F_JOST, letterSpacing: '0.1em', textTransform: 'uppercase',
          border: '1px solid var(--color-gold-light)', marginBottom: '10px',
        }}>Project Excellence</span>
        <h2 style={{
          fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
          color: '#111827', margin: 0, letterSpacing: '-0.01em',
        }}>
          Highlights Gallery:{' '}
          <span style={{ color: 'var(--color-gold)' }}> Ambuja Udyatt</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <span style={{
            display: 'block', width: '40px', height: '3px',
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            borderRadius: '2px',
          }} />
        </div>
      </div>

      {/* 3-column card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((item, idx) => (
          <HighlightCard key={idx} item={item} idx={idx} setIsOpen={setIsOpen} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '36px' }} data-aos="fade-up">
        <button onClick={() => setIsOpen(true)} className="btn-gold"
          style={{ padding: '13px 44px', letterSpacing: '0.08em' }}>
          Enquire Now
        </button>
      </div>

    </div>
  </section>
)

export default Highlights
