'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const Gallery = ({ setIsOpen }) => {
  const [lightbox, setLightbox] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <section id="gallery" style={{
      padding: '56px 0',
      background: '#f8f9fa',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 2 L46 24 L24 46 L2 24 Z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3C/svg%3E")`,
      backgroundSize: '48px 48px',
      borderBottom: '1px solid #e5e7eb',
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
          }}>Visual Tour</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: '0 0 6px', letterSpacing: '-0.01em',
          }}>
            A Life That{' '}
            <span style={{ color: 'var(--color-gold)' }}>Awaits For You</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px', margin: '8px auto 12px' }} />
          {/* <p style={{ fontFamily: F_SANS, fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Step inside through a visual journey of spaces crafted for modern business
          </p> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightbox(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              data-aos="zoom-in"
              data-aos-delay={idx * 40}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: hovered === idx
                  ? '0 12px 32px var(--color-shadow-inner)'
                  : '0 2px 10px rgba(0,0,0,0.08)',
                transform: hovered === idx ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
                border: hovered === idx ? '2px solid var(--color-gold)' : '2px solid transparent',
              }}
            >
              <Image
                src={img.src} alt={img.alt} fill
                className="object-cover"
                style={{
                  transition: 'transform 0.5s ease',
                  transform: hovered === idx ? 'scale(1.08)' : 'scale(1)'
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(181, 135, 40, 0.75) 0%, transparent 55%)',
                opacity: hovered === idx ? 1 : 0,
                transition: 'opacity 0.32s ease',
                display: 'flex', alignItems: 'flex-end', padding: '14px 12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <span style={{
                    color: '#fff', fontSize: '12px', fontFamily: F_JOST,
                    fontWeight: '600', letterSpacing: '0.02em'
                  }}>View</span>
                </div>
              </div>

              {/* Index badge */}
              <div style={{
                position: 'absolute', top: '10px', right: '10px',
                background: 'var(--color-gold)', opacity: 0.85,
                backdropFilter: 'blur(4px)',
                color: '#fff', borderRadius: '6px',
                padding: '2px 8px', fontSize: '10px',
                fontFamily: F_JOST, fontWeight: '700',
                opacity: hovered === idx ? 1 : 0,
                transition: 'opacity 0.28s ease',
                letterSpacing: '0.04em',
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
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Schedule a Site Visit
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
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
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px', zIndex: 10,
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'var(--color-gold)', opacity: 0.8, border: 'none',
              color: '#fff', fontSize: '20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
            &times;
          </button>

          {/* Image */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '80vh' }}
            onClick={e => e.stopPropagation()}>
            <Image src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt}
              fill className="object-contain" sizes="100vw" />

            {/* Caption */}
            <div style={{
              position: 'absolute', bottom: '-36px', left: 0, right: 0,
              textAlign: 'center', color: 'rgba(255,255,255,0.5)',
              fontFamily: F_JOST, fontSize: '12px', letterSpacing: '0.1em',
            }}>
              {lightbox + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length) }}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '22px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
            ‹
          </button>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length) }}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '22px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
            ›
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
