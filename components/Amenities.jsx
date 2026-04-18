'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { amenityImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const Amenities = ({ setIsOpen }) => {
  const [lightbox, setLightbox] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <section id="amenities" style={{
      padding: '56px 0',
      background: '#ffffff',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div style={{ marginBottom: '36px', textAlign: 'center' }} data-aos="fade-up">
          <span style={{
            display: 'inline-block', padding: '4px 16px',
            background: 'var(--color-gold-bg)', borderRadius: '50px',
            fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)',
            fontFamily: F_JOST, letterSpacing: '0.1em', textTransform: 'uppercase',
            border: '1px solid var(--color-gold-light)', marginBottom: '10px',
          }}>World-Class Amenities</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: '0 0 6px', letterSpacing: '-0.01em',
          }}>
            Lifestyle &amp;{' '}
            <span style={{ color: 'var(--color-gold)' }}>Wellness Amenities</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px', margin: '8px auto 12px' }} />
          {/* <p style={{ fontFamily: F_SANS, fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Over 2,00,000 sq ft of curated amenities designed for sports, wellness, community and forest living
          </p> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4">
          {amenityImages.map((item, idx) => (
            <div
              key={idx}
              className="lg:col-span-3"
              onClick={() => setLightbox(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              data-aos="fade-up"
              data-aos-delay={idx * 60}
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '16/11',
                border: `2px solid ${hovered === idx ? 'var(--color-gold)' : 'transparent'}`,
                boxShadow: hovered === idx
                  ? '0 14px 36px var(--color-shadow-inner)'
                  : '0 3px 12px rgba(0,0,0,0.09)',
                transform: hovered === idx ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
                transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {/* Image */}
              <Image
                src={item.img} alt={item.label} fill
                className="object-cover"
                style={{
                  transition: 'transform 0.5s ease',
                  transform: hovered === idx ? 'scale(1.08)' : 'scale(1)',
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Always-visible gradient label */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: hovered === idx
                  ? 'linear-gradient(to top, rgba(118, 51, 0, 0.90) 0%, transparent 80%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 70%)',
                padding: '32px 16px 14px',
                transition: 'background 0.32s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* dot */}
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'var(--color-gold)', flexShrink: 0,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.4)',
                  }} />
                  <p style={{
                    fontFamily: F_JOST, color: '#fff', fontSize: '13px',
                    fontWeight: '700', margin: 0, letterSpacing: '0.02em',
                  }}>{item.label}</p>
                </div>
              </div>

              {/* Hover: zoom icon top-right */}
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--color-gold)', opacity: 0.85,
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: hovered === idx ? 1 : 0,
                transform: hovered === idx ? 'scale(1)' : 'scale(0.7)',
                transition: 'all 0.28s ease',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              {/* Index badge */}
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                background: 'var(--color-gold)', opacity: 0.85,
                backdropFilter: 'blur(4px)',
                color: '#fff', borderRadius: '6px',
                padding: '2px 8px', fontSize: '10px',
                fontFamily: F_JOST, fontWeight: '700',
                letterSpacing: '0.04em',
                opacity: hovered === idx ? 1 : 0,
                transition: 'opacity 0.28s ease',
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }} data-aos="fade-up">
          <button onClick={() => setIsOpen(true)} className="btn-gold"
            style={{ padding: '13px 44px', letterSpacing: '0.08em' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Enquire Now
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
          }}
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '20px', right: '20px', zIndex: 10,
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--color-gold)', opacity: 0.85, border: 'none',
            color: '#fff', fontSize: '22px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>&times;</button>

          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '78vh' }}
            onClick={e => e.stopPropagation()}>
            <Image src={amenityImages[lightbox].img} alt={amenityImages[lightbox].label}
              fill className="object-contain" sizes="100vw" />
            <div style={{
              position: 'absolute', bottom: '-32px', left: 0, right: 0,
              textAlign: 'center', fontFamily: F_JOST, fontSize: '13px',
              fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em',
            }}>
              {amenityImages[lightbox].label} &nbsp;·&nbsp; {lightbox + 1} / {amenityImages.length}
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + amenityImages.length) % amenityImages.length) }}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>‹</button>

          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % amenityImages.length) }}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>›</button>
        </div>
      )}
    </section>
  )
}

export default Amenities
