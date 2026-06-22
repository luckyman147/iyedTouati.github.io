import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PfeAnimation from './PfeAnimation'

gsap.registerPlugin(ScrollTrigger)

const VideoWithLoading = ({ src }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <div className='relative w-full h-full'>
      {!loaded && (
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-void/60'>
          <Icon icon='svg-spinners:ring-resize' className='text-plasma text-2xl' />
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer' />
          </div>
        </div>
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 ${
          loaded ? 'opacity-100' : 'opacity-0 absolute'
        }`}
      />
    </div>
  )
}

const ProjectCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, z: -500 }}
      whileInView={{ opacity: 1, x: 0, z: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay: index * 0.2, type: 'spring' }}
      className='group relative perspective-1000 h-full'
    >
      <div className='glass-panel group-hover:border-plasma/60 transition-all duration-500 overflow-hidden flex flex-col h-full'>
        {/* Project Image/Video Thumb */}
        <div className='relative h-64 overflow-hidden'>
          {/* If this is the HeySir PFE or FlowSketch project, render the frame animation component */}
          {(item.title && item.title.toLowerCase().includes('heysir')) ||
          (item.thumbUrl && item.thumbUrl.includes('pfe_link.png')) ? (
            <div className='w-full h-full'>
                <PfeAnimation width={'100%'} height={'100%'} fps={1} autoplay={true} compact type="heysir" />
            </div>
          ) : (item.title && item.title.toLowerCase().includes('flowsketch')) ||
          (item.thumbUrl && item.thumbUrl.includes('flowsketch')) ? (
            <div className='w-full h-full'>
                <PfeAnimation width={'100%'} height={'100%'} fps={1} autoplay={true} compact type="flowsketch" />
            </div>
          ) : item.videoUrl && item.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <VideoWithLoading src={item.videoUrl} />
          ) : (
            <img
              src={item.thumbUrl || item.videoUrl}
              alt={item.title}
              className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110'
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60' />

          {/* Mission Overlay */}
          <div className='absolute top-4 left-4'>
            <span className='scifi-badge bg-void/80 border-white/20 text-white/80'>
              Project 0{index + 1}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 flex flex-col gap-4 relative flex-grow'>
          {/* Diagnostic Grid Background */}
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.02)_0%,transparent_70%)] pointer-events-none' />

          <div className='flex flex-col gap-1'>
            <h5 className='text-xl font-orbitron font-bold text-white group-hover:text-plasma transition-colors uppercase tracking-tighter'>
              {item.title}
            </h5>
            <span className='text-[10px] font-mono text-plasma/60 uppercase tracking-[0.2em]'>
              {item.subTitle}
            </span>
          </div>

          <p className='text-sm font-rajdhani text-white/70 '>
            {item.details?.description}
          </p>

          <div className='flex justify-between items-center mt-auto pt-4 border-t border-plasma/10'>
            <div className='flex gap-4'>
              <a
                href='#'
                className='text-plasma/60 hover:text-plasma transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group/link'
              >
                <Icon icon='lucide:github' />
                <span>Github</span>
              </a>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className='absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out' />
      </div>
    </motion.div>
  )
}

export default function Projects({ data }) {
  const { sectionHeading, allProjects } = data
  const [filter, setFilter] = useState('All')
  const sectionRef = useRef(null)

  // Scroll and hover animations
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.motion-div')
    if (!cards || cards.length === 0) return

    cards.forEach((card, index) => {
      // Scroll animation - fade in + scale up
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            markers: false
          },
          delay: index * 0.1
        }
      )

      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 12px rgba(0, 212, 255, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [filter]) // Re-run when filter changes as cards are re-rendered

  const filteredProjects = allProjects?.filter((item) => {
    if (filter === 'All') return true
    const searchString = JSON.stringify(item).toLowerCase()
    if (filter === 'Frontend')
      return (
        searchString.includes('react') ||
        searchString.includes('frontend') ||
        searchString.includes('next')
      )
    if (filter === 'Backend')
      return (
        searchString.includes('node') ||
        searchString.includes('.net') ||
        searchString.includes('backend') ||
        searchString.includes('firebase') ||
        searchString.includes('supabase') ||
        searchString.includes('sql')
      )
    if (filter === 'Mobile')
      return (
        searchString.includes('flutter') ||
        searchString.includes('react native') ||
        searchString.includes('mobile')
      )
    if (filter === 'AI')
      return (
        searchString.includes('ai ') ||
        searchString.includes('ai algorithm') ||
        searchString.includes('artificial')
      )
    return true
  })

  return (
    <section
      className='relative min-h-screen py-24 px-4 overflow-hidden '
      id='project'
      ref={sectionRef}
    >
      {/* Multiverse Map Background */}
      <div className='absolute inset-0  pointer-events-none -z-10'>
        <div className='absolute w-full h-full ' />
        {/* Fake timeline lines */}
        <svg className='w-full h-full opacity-10'>
          <line
            x1='10%'
            y1='0'
            x2='90%'
            y2='100%'
            stroke='currentColor'
            className='text-plasma/20'
            strokeWidth='0.5'
          />
          <line
            x1='90%'
            y1='0'
            x2='10%'
            y2='100%'
            stroke='currentColor'
            className='text-plasma/20'
            strokeWidth='0.5'
          />
        </svg>
      </div>

      <div className='container mx-auto max-w-6xl z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12 flex flex-col items-center gap-4'
        >
          <div className='flex items-center gap-4'>
            <div className='w-12 h-[1px] bg-plasma/40' />
            <span className='scifi-badge'>
              {sectionHeading.miniTitle || 'Portfolio'}
            </span>
            <div className='w-12 h-[1px] bg-plasma/40' />
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold tracking-tighter break-words'>
            {sectionHeading.title
              .replace('<span>', '')
              .replace('</span>', '') || 'Selected Projects'}
          </h2>
          <div className='text-xs text-white/40 font-mono tracking-widest uppercase'>
            Exploring recent case studies and technical solutions.
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {['All', 'Frontend', 'Backend', 'Mobile', 'AI'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-widest border transition-all duration-300 ${
                filter === cat
                  ? 'border-plasma bg-plasma/20 text-plasma shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                  : 'border-plasma/30 text-plasma/60 hover:border-plasma/60 hover:text-plasma/80 hover:bg-plasma/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16'>
          {filteredProjects?.map((item, index) => (
            <div key={index} className='motion-div'>
              <ProjectCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Hyperspace Tunnel Frame */}
      <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b  pointer-events-none z-20' />
      <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t  pointer-events-none z-20' />
    </section>
  )
}
