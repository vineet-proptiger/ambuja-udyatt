'use client'
import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import LeadForm from './LeadForm'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const EnquireModal = ({ isOpen, setIsOpen }) => {
  const autoTriggered = useRef(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (autoTriggered.current) return
    const initial = setTimeout(() => {
      autoTriggered.current = true
      setIsOpen(true)
      intervalRef.current = setInterval(() => setIsOpen(true), 20000)
    }, 10000)
    return () => {
      clearTimeout(initial)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [setIsOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={() => setIsOpen(false)}>

      <div className="relative bg-white w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          maxWidth: '400px', width: '92vw', maxHeight: '95vh',
          animation: 'slideInRight 0.45s cubic-bezier(0.22,1,0.36,1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <button onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-900 transition-colors bg-white rounded-full w-8 h-8 flex items-center justify-center shadow border border-gray-100">
            <X size={16} />
          </button>

          <div className="p-4 sm:p-5 pt-8 sm:pt-10 flex flex-col justify-center flex-1">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight" style={{ fontFamily: F_JOST }}>
                Book a free site visit
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <span style={{
                  display: 'block', width: '36px', height: '3px',
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                  borderRadius: '2px',
                }} />
              </div>
            </div>

            <LeadForm formName="Popup Modal" btnText="Submit Details" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquireModal
