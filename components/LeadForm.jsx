'use client'
import React, { useState, useEffect } from 'react'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { getGeo, buildTrackingFields } from '../lib/formMeta'

const GOLD = 'var(--color-gold)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const inputClass = 'form-input mb-3 shadow-sm'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const LeadForm = ({ formName = 'Hero Form', btnText = 'Submit Details' }) => {
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [geoAddress, setGeoAddress] = useState(null)

  useEffect(() => {
    getGeo().then(d => {
      if (!d) return
      setIpAddress(d.ip || '')
      setGeoAddress({ city: d.city, region: d.region, postal_code: d.postal_code, country: d.country })
    })
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.phone || formData.phone.length < 10) { setError('Please enter a valid 10-digit mobile number.'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields(ipAddress, geoAddress)
    const payload = new FormData()
    payload.append('fullname', formData.fullname)
    payload.append('email', formData.email)
    payload.append('phone', formData.phone)
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', formName)
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = formData.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: formName,
            user_data: {
              email: formData.email.trim() || undefined, phone: formData.phone,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || '', address: geoAddress
            }
          })
        }
      } else { setError(data.msg || 'Submission failed. Please try again.') }
    } catch { setError('Network error. Please check your connection and try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-gold-bg)' }}>
        <svg className="w-8 h-8" style={{ color: 'var(--color-gold-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: F_SANS }}>Thank You!</h4>
      <p className="text-gray-500 text-sm" style={{ fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <input type="text" name="fullname" required placeholder="Enter full name" value={formData.fullname} onChange={handleChange}
        className={inputClass} style={{ fontFamily: F_SANS }} />
      <input type="email" name="email" placeholder="Email Id (optional)" value={formData.email} onChange={handleChange}
        className={inputClass} style={{ fontFamily: F_SANS }} />
      <input type="tel" name="phone" required placeholder="10-digit mobile number" maxLength={10} value={formData.phone} onChange={handleChange}
        className={inputClass} style={{ fontFamily: F_SANS }} />

      {error && <p className="text-red-500 text-xs mt-1" style={{ fontFamily: F_SANS }}>{error}</p>}

      <div className="flex items-start gap-2 mt-3">
        <input type="checkbox" id="privacy-lead" required defaultChecked className="mt-0.5 shrink-0" style={{ accentColor: GOLD }} />
        <label htmlFor="privacy-lead" className="text-xs text-gray-500 leading-relaxed cursor-pointer" style={{ fontFamily: F_SANS }}>
          I authorize the developer &amp; its representatives to contact me via Email / SMS / WhatsApp / Call. This will override DND / NDNC settings.
        </label>
      </div>

      <button type="submit" disabled={loading}
        className="btn-gold mt-4 w-full"
        style={{ padding: '14px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {loading ? 'Submitting...' : btnText}
      </button>
    </form>
  )
}

export default LeadForm
