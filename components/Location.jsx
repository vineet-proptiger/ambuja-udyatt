'use client'
import React, { useState } from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const locationCategories = [
  {
    title: 'Education',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    items: [
      { name: 'Delhi Public School, New Town', time: '4 km' },
      { name: 'Amity University Kolkata', time: '5 km' },
      { name: "St. Xavier's University, Rajarhat", time: '6 km' },
    ],
  },
  {
    title: 'Hospitals',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    items: [
      { name: 'Tata Medical Center', time: '3.5 km' },
      { name: 'Ohio Hospital', time: '4 km' },
      { name: 'Charnock Hospital', time: '5 km' },
    ],
  },
  {
    title: 'Food & Shopping',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    items: [
      { name: 'City Centre 2 Mall', time: '6 km' },
      { name: 'Axis Mall, New Town', time: '5 km' },
      { name: 'Eco Park & Nearby Cafes', time: '4 km' },
    ],
  },
  {
    title: 'Growth Drivers',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    items: [
      { name: 'New Town Action Area II', time: '2 km' },
      { name: 'EM Bypass Connectivity', time: '3 km' },
      { name: 'Salt Lake Sector V IT Hub', time: '10 km' },
    ],
  },
  {
    title: 'Convenient Travel',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    items: [
      { name: 'New Town Expressway', time: '2 km' },
      { name: 'Sector V Metro (upcoming/operational corridor)', time: '8 km' },
      { name: 'Netaji Subhash Chandra Bose International Airport', time: '8 km' },
    ],
  },
]

const Location = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="location" style={{
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
          }}>Ruby EM Bypass, Kolkata</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: '0 0 6px', letterSpacing: '-0.01em',
          }}>
            Location{' '}
            <span style={{ color: 'var(--color-gold)' }}>Advantages</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px', margin: '8px auto 12px' }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* LEFT — Accordion */}
          <div className="w-full lg:w-[45%]" data-aos="fade-right">
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              overflow: 'hidden',
            }}>
              {locationCategories.map((cat, ci) => {
                const isOpen = openIndex === ci
                return (
                  <div key={ci} style={{ borderBottom: ci < locationCategories.length - 1 ? '1px solid #f0f0f0' : 'none' }}>

                    {/* Accordion Header */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : ci)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: isOpen
                          ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))'
                          : '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.25s ease',
                        borderLeft: isOpen ? '4px solid var(--color-gold)' : '4px solid transparent',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: isOpen ? 'var(--color-gold)' : '#9ca3af', transition: 'color 0.25s' }}>
                          {cat.icon}
                        </span>
                        <span style={{
                          fontFamily: F_JOST, fontSize: '13px', fontWeight: '800',
                          color: isOpen ? '#fff' : '#374151',
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                          transition: 'color 0.25s',
                        }}>
                          {cat.title}
                        </span>
                      </div>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke={isOpen ? 'var(--color-gold)' : '#9ca3af'}
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, stroke 0.25s' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Accordion Body */}
                    <div style={{
                      maxHeight: isOpen ? '300px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{ padding: '4px 20px 12px' }}>
                        {cat.items.map((item, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            borderBottom: i < cat.items.length - 1 ? '1px solid #f8f8f8' : 'none',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: 'var(--color-gold)', flexShrink: 0,
                              }} />
                              <span style={{
                                fontSize: '13.5px', color: '#4b5563', fontWeight: '500',
                                fontFamily: F_SANS, letterSpacing: '0.01em',
                              }}>{item.name}</span>
                            </div>
                            <span style={{
                              fontSize: '13px', color: 'var(--color-dark)', fontWeight: '800',
                              fontFamily: F_JOST, whiteSpace: 'nowrap', marginLeft: '10px',
                            }}>{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Map */}
          <div className="w-full lg:flex-1" data-aos="fade-left" style={{ minHeight: '420px' }}>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 8px 32px var(--color-shadow-inner)',
              border: '2px solid var(--color-gold)',
              height: '100%', minHeight: '420px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', zIndex: 10,
              }} />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0395824526395!2d88.393445!3d22.465146800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8eaca4dca1abf%3A0x826f63b853fbd1bd!2sEastern%20Metropolitan%20Bypass%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1776506694532!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '420px', display: 'block' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{
                position: 'absolute', bottom: '16px', left: '16px', zIndex: 10,
                background: 'var(--color-gold)', opacity: 0.9, backdropFilter: 'blur(6px)',
                borderRadius: '8px', padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{
                  color: '#fff', fontSize: '11px', fontFamily: F_JOST,
                  fontWeight: '700', letterSpacing: '0.04em'
                }}>
                  Ruby EM Bypass, Kolkata
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location
