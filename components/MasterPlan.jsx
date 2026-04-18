'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { masterplanImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const plans = [
  { label: 'Master Plan',   img: masterplanImages.masterPlan },
  { label: '3 BHK Floor Plan',   img: masterplanImages.bhk3 },
  { label: '4 BHK Floor Plan',   img: masterplanImages.bhk45 },
]

const MasterPlan = ({ setIsOpen }) => {
  const [activePlan, setActivePlan] = useState(0)

  return (
    <section id="masterplan" style={{
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
          }}>Layout & Configuration</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: '0 0 6px', letterSpacing: '-0.01em',
          }}>
            Floor Plans &amp;{' '}
            <span style={{ color: 'var(--color-gold)' }}>Layout</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px', margin: '8px auto 12px' }} />
          {/* <p style={{ fontFamily: F_SANS, fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Thoughtfully designed spaces for modern business needs
          </p> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* LEFT — Tabs */}
          <div className="w-full lg:w-[32%]" data-aos="fade-right">
            <div style={{
              background: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0', overflow: 'hidden',
            }}>
              {/* Tab header */}
              <div style={{
                background: 'linear-gradient(135deg, #111827, #1f2937)',
                padding: '16px 20px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }} />
                <p style={{
                  fontFamily: F_JOST, fontWeight: '700', fontSize: '13px',
                  color: '#fff', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase'
                }}>
                  Layout and Plans
                </p>
                <p style={{
                  fontFamily: F_SANS, fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)', margin: '3px 0 0'
                }}>
                  Click to preview
                </p>
              </div>

              {/* Tabs */}
              {plans.map((plan, idx) => (
                <button key={idx} onClick={() => setActivePlan(idx)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '15px 20px',
                    background: activePlan === idx ? 'var(--color-gold-bg)' : '#fff',
                    border: 'none',
                    borderLeft: activePlan === idx ? '3px solid var(--color-gold)' : '3px solid transparent',
                    borderBottom: idx < plans.length - 1 ? '1px solid #f5f5f5' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Number badge */}
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      background: activePlan === idx ? 'var(--color-gold)' : '#f3f4f6',
                      color: activePlan === idx ? '#fff' : '#9ca3af',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontFamily: F_JOST, fontWeight: '800',
                      transition: 'all 0.2s',
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: '13px', fontWeight: '700', fontFamily: F_JOST,
                      color: activePlan === idx ? 'var(--color-gold)' : '#374151',
                      transition: 'color 0.2s',
                    }}>{plan.label}</span>
                  </div>
                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={activePlan === idx ? 'var(--color-gold)' : '#d1d5db'}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}

              {/* Info box */}
              <div style={{
                margin: '12px', padding: '12px',
                background: 'var(--color-gold-bg)', borderRadius: '10px',
                border: '1px dashed var(--color-gold-light)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p style={{
                    fontFamily: F_SANS, fontSize: '11px', color: '#6b7280',
                    margin: 0, lineHeight: 1.6
                  }}>
                    Register to receive detailed floor plans &amp; pricing directly to your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Image preview */}
          <div className="w-full lg:flex-1" data-aos="zoom-in">
            <div style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 10px 36px var(--color-shadow-inner)',
              height: '100%', minHeight: '400px',
            }}>
              {/* Brand top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', zIndex: 10,
              }} />

              {/* Plan label top-left */}
              <div style={{
                position: 'absolute', top: '16px', left: '16px', zIndex: 10,
                background: 'var(--color-gold)', opacity: 0.9, backdropFilter: 'blur(6px)',
                borderRadius: '8px', padding: '5px 12px',
              }}>
                <span style={{
                  color: '#fff', fontSize: '11px', fontFamily: F_JOST,
                  fontWeight: '700', letterSpacing: '0.04em'
                }}>
                  {plans[activePlan].label}
                </span>
              </div>

              {/* Blurred image */}
              <Image src={plans[activePlan].img} alt={plans[activePlan].label} fill
                style={{ objectFit: 'cover', filter: 'blur(5px)', transform: 'scale(1.06)' }} />

              {/* Dark overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(17,24,39,0.45)',
              }} />

              {/* CTA in center */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 5,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '12px',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: F_JOST, fontSize: '13px', color: 'rgba(255,255,255,0.7)',
                  margin: 0, fontWeight: '600', letterSpacing: '0.04em'
                }}>
                  Register to Unlock Floor Plan
                </p>
                <button onClick={() => setIsOpen(true)} className="btn-gold"
                  style={{ padding: '11px 32px', fontSize: '13px', letterSpacing: '0.1em' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  View Plan
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MasterPlan
