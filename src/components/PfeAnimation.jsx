import React, { useEffect, useRef, useState } from 'react'

const PFE_FRAMES = [
  'admin_overview.png',
  'advisor_dashboard.png',
  'faculty_management.png',
  'find_an_advisor.png',
  'forgot_password.png',
  'login_screen.png',
  'my_requests.png',
  'otp_verification.png',
  'project_details.png',
  'requests_management.png',
  'signup_screen.png',
  'student_dashboard.png',
  'user_management.png',
]

const FLOWSKETCH_FRAMES = [
  '/flowsketch/Screenshot 2026-05-11 at 14-24-12 diagrams.png',
  '/flowsketch/Screenshot 2026-05-11 at 14-24-37 diagrams.png',
  '/flowsketch/Screenshot 2026-05-11 at 22-58-18 diagrams.png',
  '/flowsketch/Screenshot 2026-05-11 at 22-58-38 diagrams.png',
  '/flowsketch/Screenshot 2026-05-11 at 22-59-20 diagrams.png',
  '/flowsketch/Screenshot 2026-05-11 at 22-59-37 diagrams.png',
]

export default function PfeAnimation({
  width = 900,
  height = 520,
  fps = 6,
  autoplay = true,
  compact = false,
  type = 'heysir',
}) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [frames, setFrames] = useState(type === 'flowsketch' ? FLOWSKETCH_FRAMES : PFE_FRAMES)
  const rafRef = useRef(null)
  const lastRef = useRef(0)

  const interval = 1000 / Math.max(1, fps)

  // Set frames based on type prop
  useEffect(() => {
    setFrames(type === 'flowsketch' ? FLOWSKETCH_FRAMES : PFE_FRAMES)
    setFrameIndex(0)
  }, [type])

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    lastRef.current = performance.now()

    const loop = (t) => {
      if (!playing) return
      if (t - lastRef.current >= interval) {
        lastRef.current = t
        setFrameIndex((i) => (i + 1) % frames.length)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, interval, frames.length])

  const goTo = (i) => {
    setFrameIndex(i % frames.length)
  }

  const getFrameSrc = (frame) => {
    return type === 'flowsketch' ? frame : '/pfe/' + frame
  }

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div
        style={{
          width: typeof width === 'number' ? width : width,
          height: typeof height === 'number' ? height : height,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: compact ? '8px' : '0px',
        }}
      >
        <img
          src={getFrameSrc(frames[frameIndex])}
          alt={`frame-${frameIndex}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {!compact && (
        <div style={{ width: 220 }}>
          <div style={{ marginBottom: 12 }}>
            <button
              onClick={() => setPlaying((p) => !p)}
              style={{ marginRight: 8 }}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => {
                setFrameIndex(0)
                setPlaying(false)
              }}
              style={{ marginRight: 8 }}
            >
              Reset
            </button>
            <label style={{ marginLeft: 8, fontSize: 13 }}>
              FPS:
              <input
                type='number'
                defaultValue={fps}
                min={1}
                max={60}
                onChange={(e) => {
                  const v = Number(e.target.value) || 1
                  setPlaying(false)
                  setTimeout(() => setPlaying(true), 50)
                }}
                style={{ width: 52, marginLeft: 6 }}
              />
            </label>
          </div>

          <div
            style={{
              maxHeight: 420,
              overflowY: 'auto',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: 8,
            }}
          >
            {frames.map((f, i) => (
              <div
                key={f}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <img
                  src={getFrameSrc(f)}
                  alt={f}
                  style={{
                    width: 72,
                    height: 48,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border:
                      i === frameIndex
                        ? '2px solid #7c3aed'
                        : '2px solid transparent',
                  }}
                  onClick={() => goTo(i)}
                />
                <div style={{ fontSize: 13 }}>
                  {type === 'flowsketch'
                    ? `Diagram ${i + 1}`
                    : f.replace(/_/g, ' ').replace('.png', '')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
