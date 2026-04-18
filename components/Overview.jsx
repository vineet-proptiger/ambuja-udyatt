'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { getGeo, buildTrackingFields } from '../lib/formMeta'
import { overviewImage } from '../lib/images'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SERIF = 'var(--font-serif), Cormorant Garamond, serif'

const PREVIEW_TEXT = `Welcome to Ambuja Udyatt, rising gently off EM Bypass, offers a refined living experience shaped by openness, balance, and thoughtful design. Inspired by the philosophy of B.V. Doshi and crafted by Vastu Shilpa Consultants, these residences seamlessly blend light, air, and nature to create breathable, calming spaces above the city’s bustle.`

const MORE_TEXT = ` With elegant architecture, premium finishes, and modern comforts, Udyatt is designed to deliver a lifestyle that feels both elevated and effortlessly liveable. Built with a focus on harmony, every detail enhances natural light and provides scenic views of the city. Located strategically on the EM Bypass, it ensures a smooth commute while offering a perfect sanctuary to unwind.`

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '8px',
  outline: 'none',
  fontSize: '14px',
  color: '#374151',
  background: '#ffffff',
  fontFamily: F_SANS,
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

const EarlyForm = () => {
  const [form, setForm] = useState({ fullname: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [geoAddress, setGeoAddress] = useState(null)
  const [focused, setFocused] = useState('')

  useEffect(() => {
    getGeo().then(d => {
      if (!d) return
      setIpAddress(d.ip || '')
      setGeoAddress({ city: d.city, region: d.region, postal_code: d.postal_code, country: d.country })
    })
  }, [])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (form.phone.length < 10) { setError('Enter valid 10-digit number'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields(ipAddress, geoAddress)
    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Overview Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) setSuccess(true)
      else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'var(--color-gold-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
      }}>
        <svg width="26" height="26" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ fontWeight: '700', fontSize: '18px', color: '#111827', fontFamily: F_JOST }}>Thank You!</p>
      <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Name */}
      <div style={{ position: 'relative' }}>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>
          Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
        </label>
        <input
          name="fullname" required value={form.fullname} onChange={handle}
          placeholder="Enter your full name"
          onFocus={() => setFocused('fullname')}
          onBlur={() => setFocused('')}
          style={{
            ...inputStyle,
            borderColor: focused === 'fullname' ? 'var(--color-gold)' : '#e5e7eb',
            boxShadow: focused === 'fullname' ? '0 0 0 3px var(--color-shadow-inner)' : 'none',
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>
          Email Address
        </label>
        <input
          name="email" value={form.email} onChange={handle}
          placeholder="Email Id (optional)"
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
          style={{
            ...inputStyle,
            borderColor: focused === 'email' ? 'var(--color-gold)' : '#e5e7eb',
            boxShadow: focused === 'email' ? '0 0 0 3px var(--color-shadow-inner)' : 'none',
          }}
        />
      </div>

      {/* Phone */}
      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>
          Mobile Number <span style={{ color: 'var(--color-gold)' }}>*</span>
        </label>
        <input
          name="phone" required value={form.phone} onChange={handle}
          placeholder="10-digit mobile number" maxLength={10}
          onFocus={() => setFocused('phone')}
          onBlur={() => setFocused('')}
          style={{
            ...inputStyle,
            borderColor: focused === 'phone' ? 'var(--color-gold)' : '#e5e7eb',
            boxShadow: focused === 'phone' ? '0 0 0 3px var(--color-shadow-inner)' : 'none',
          }}
        />
      </div>

      {error && (
        <p style={{ color: 'var(--color-gold)', fontSize: '12px', fontFamily: F_SANS, marginTop: '-6px' }}>{error}</p>
      )}

      {/* Consent */}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', marginTop: 'auto' }}>
        <input type="checkbox" required defaultChecked
          style={{ accentColor: 'var(--color-gold)', marginTop: '3px', flexShrink: 0, width: '14px', height: '14px' }} />
        <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: F_SANS, lineHeight: 1.6 }}>
          I authorize the developer &amp; its representatives to contact me via Email / SMS / WhatsApp / Call.
        </span>
      </label>

      {/* Submit */}
      <button type="submit" disabled={loading} className="btn-gold"
        style={{ width: '100%', padding: '13px', fontSize: '13px', letterSpacing: '0.08em' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {loading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  )
}

const Overview = () => {
  return (
    <section id="overview" className="!pt-1 !pb-4 sm:!py-10" style={{
      background: '#f8f9fa',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 2 L46 24 L24 46 L2 24 Z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3C/svg%3E")`,
      backgroundSize: '48px 48px',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Label */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }} data-aos="fade-up">
          <span style={{
            display: 'inline-block', padding: '4px 16px',
            background: 'var(--color-gold-bg)', borderRadius: '50px',
            fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)',
            fontFamily: F_JOST, letterSpacing: '0.1em', textTransform: 'uppercase',
            border: '1px solid var(--color-gold-light)', marginBottom: '10px',
          }}>Ambuja Udyatt New Launch</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: 0, letterSpacing: '-0.01em',
          }}>
            Project <span style={{ color: 'var(--color-gold)' }}>Overview</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <span style={{
              display: 'block', width: '40px', height: '3px',
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px'
            }} />
          </div>
        </div>

        {/* 3-column equal grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT: Image */}
          <div data-aos="fade-right" style={{ display: 'flex' }}>
            <div style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
              border: '3px solid #fff', width: '100%', minHeight: '340px',
            }}>
              <Image src={overviewImage} alt="Ambuja Udyatt" fill className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw" priority />
              {/* <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(3, 147, 148, 0.92), transparent)',
              padding: '28px 16px 14px',
            }}>
              <p style={{
                fontFamily: F_JOST, color: '#fff', fontSize: '13px',
                fontWeight: '700', margin: 0, letterSpacing: '0.04em'
              }}>
                GIFT City · SEZ Zone
              </p>
              <p style={{
                fontFamily: F_SANS, color: 'rgba(255,255,255,0.8)',
                fontSize: '11px', margin: '2px 0 0'
              }}>
                Ahmedabad, Gujarat
              </p>
            </div> */}
            </div>
          </div>

          {/* MIDDLE: Text */}
          <div data-aos="fade-up" style={{ display: 'flex' }}>
            <div style={{
              background: '#fff', borderRadius: '16px', padding: '24px 22px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0',
              display: 'flex', flexDirection: 'column', width: '100%',
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{ float: 'left', marginRight: '8px', marginBottom: '2px', marginTop: '2px' }}>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <path d="M10 8C6.686 8 4 10.686 4 14s2.686 6 6 6v4l4-4c0-3.314-2.686-6-6-6zm12 0c-3.314 0-6 2.686-6 6s2.686 6 6 6v4l4-4c0-3.314-2.686-6-6-6z"
                      fill="var(--color-gold)" opacity="0.15" />
                    <path d="M10 8C6.686 8 4 10.686 4 14s2.686 6 6 6v4l4-4c0-3.314-2.686-6-6-6zm12 0c-3.314 0-6 2.686-6 6s2.686 6 6 6v4l4-4c0-3.314-2.686-6-6-6z"
                      fill="none" stroke="var(--color-gold)" strokeWidth="1.8" opacity="0.4" />
                  </svg>
                </div>
                <p style={{
                  color: '#374151', fontFamily: F_SANS, lineHeight: 1.85,
                  fontSize: '14px', margin: 0, flex: 1,
                  textAlign: 'justify',
                }}>
                  {PREVIEW_TEXT}{MORE_TEXT}
                  {' '}
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none"
                    style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }}>
                    <path d="M22 24C25.314 24 28 21.314 28 18s-2.686-6-6-6v-4l-4 4c0 3.314 2.686 6 6 6zm-12 0C13.314 24 16 21.314 16 18s-2.686-6-6-6v-4l-4 4c0 3.314 2.686 6 6 6z"
                      fill="var(--color-gold)" opacity="0.15" />
                    <path d="M22 24C25.314 24 28 21.314 28 18s-2.686-6-6-6v-4l-4 4c0 3.314 2.686 6 6 6zm-12 0C13.314 24 16 21.314 16 18s-2.686-6-6-6v-4l-4 4c0 3.314 2.686 6 6 6z"
                      fill="none" stroke="var(--color-gold)" strokeWidth="1.8" opacity="0.4" />
                  </svg>
                </p>
              </div>


            </div>
          </div>

          {/* RIGHT: Form */}
          <div data-aos="fade-left" style={{ display: 'flex' }}>
            <div style={{
              background: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 24px var(--color-shadow-card)',
              border: '1px solid var(--color-gold-light)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
                padding: '18px 20px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }} />
                <h3 style={{
                  fontFamily: F_JOST, fontWeight: '800', fontSize: '16px',
                  color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em'
                }}>
                  Get Early Booking Advantage
                </h3>
                <p style={{
                  fontFamily: F_SANS, fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)', margin: 0
                }}>
                  Limited Inventory Available Hurry Now !
                </p>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <EarlyForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Overview
