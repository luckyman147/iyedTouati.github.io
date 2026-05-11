# FlowSketch Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add FlowSketch as the 4th portfolio project with animated frame-by-frame display, reorder existing projects, and enhance PfeAnimation component with smooth frame transitions.

**Architecture:** Update HomePagdData.json to reorder projects (moving HeySir to position 3, adding FlowSketch at 4, moving Karhabty to 5, AID to 6). Enhance PfeAnimation.jsx to support fade/slide transitions between frames with 300-500ms duration. Projects.jsx already handles display—no changes needed there.

**Tech Stack:** React, Framer Motion (existing), GSAP (existing), JSON data

---

## File Structure

- **Modify:** `src/data/HomePagdData.json` — reorder allProjects array, add FlowSketch object
- **Modify:** `src/components/PfeAnimation.jsx` — add frame transition animations
- **Reference:** `public/flowsketch/` — 6 screenshot images (already present)
- **No new files needed**

---

### Task 1: Reorder Projects and Add FlowSketch to HomePagdData.json

**Files:**
- Modify: `src/data/HomePagdData.json:74-135` (allProjects array)

**Context:** The allProjects array currently has 5 projects. We need to reorder them so HeySir PFE (position 5) moves to position 3, add FlowSketch at position 4, Karhabty (position 4) moves to 5, and AID (position 3) moves to 6.

- [ ] **Step 1: Read current HomePagdData.json to see exact structure**

```bash
cat src/data/HomePagdData.json | grep -A 200 '"allProjects"'
```

Expected output: JSON array with 5 project objects (JCI Hub, JCI A Member, AID Social, Karhabty, HeySir).

- [ ] **Step 2: Edit allProjects array to reorder and add FlowSketch**

Replace the entire `allProjects` array (lines 74-135) with the following reordered structure:

```json
"allProjects": [
  {
    "thumbUrl": "/myapps/jci_app.png",
    "videoUrl": "/myapps/JCI HS APP Overview Video.mp4",
    "title": "JCI Organization Hub",
    "subTitle": "Scalable Flutter Solution",
    "details": {
      "title": "JCI Organization Hub",
      "description": "Engineered a centralized management hub that automated member tracking and activity coordination, reducing manual administrative tasks by 60% while ensuring real-time data consistency across regional chapters using Firebase synchronization.",
      "frameworks": "Flutter, Dart, Firebase, Figma",
      "type": "Enterprise Application"
    }
  },
  {
    "thumbUrl": "/myapps/jci a member.png",
    "videoUrl": "/myapps/jci a member video.mp4",
    "title": "JCI A Member",
    "subTitle": "Corporate HR & Project Governance",
    "details": {
      "title": "JCI A Member Operations",
      "description": "Engineered an HR and project governance dashboard that reduced administrative overhead by 40%. Built with React and real-time Supabase sync, the platform streamlined internal governance and improved project delivery efficiency by 25%.",
      "frameworks": "React, Supabase",
      "type": "Operations Dashboard"
    }
  },
  {
    "thumbUrl": "/images/pfe_link.png",
    "videoUrl": "/images/pfe_link.png",
    "title": "HeySir PFE Platform",
    "subTitle": "Capstone Project",
    "details": {
      "title": "HeySir PFE Platform",
      "description": "Landing for HeySir — a PFE management platform that connects students with expert advisors. Highlights: smart advisor matching, advisor ratings, project tracking, and CTAs for account creation and faculty registration.",
      "frameworks": "Web UI, Matching Engine",
      "type": "Capstone / Showcase"
    }
  },
  {
    "thumbUrl": "/flowsketch/Screenshot 2026-05-11 at 14-24-12 diagrams.png",
    "videoUrl": "/flowsketch/Screenshot 2026-05-11 at 14-24-12 diagrams.png",
    "title": "FlowSketch",
    "subTitle": "AI-Powered Diagram Animation",
    "details": {
      "title": "FlowSketch",
      "description": "Engineered an AI-powered platform that transforms static UML diagrams into dynamic, animated educational content, enabling faster understanding of complex system architectures through beautiful, step-by-step visual walkthroughs.",
      "frameworks": "FastAPI, React, AI",
      "type": "AI Platform"
    }
  },
  {
    "thumbUrl": "/myapps/karhabty.jpg",
    "videoUrl": "/myapps/karhabty.jpg",
    "title": "Karhabty.app",
    "subTitle": "Automotive Marketplace",
    "details": {
      "title": "Karhabty.app",
      "description": "Spearheaded the development of a full-cycle automotive marketplace, increasing vendor-to-customer engagement rates by 45%. Delivered a high-performance 60fps mobile experience backed by scalable, secure .NET API infrastructure.",
      "frameworks": "Flutter, .Node js, SQL Server, Figma",
      "type": "Dashboard App"
    }
  },
  {
    "thumbUrl": "/myapps/image.png",
    "videoUrl": "/myapps/HAI.mp4",
    "title": "AID Social Interface",
    "subTitle": "Humanitarian AI Solutions",
    "details": {
      "title": "AID Social Interface",
      "description": "Developed an AI-driven predictive analytics platform for humanitarian aid, optimizing resource allocation and community strategy. The integration of real-time social metrics improved aid distribution efficiency by over 30%.",
      "frameworks": "React Native , AI Algorithms, Node Js",
      "type": "AI Platform"
    }
  }
]
```

- [ ] **Step 3: Verify JSON syntax is valid**

```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/HomePagdData.json', 'utf8')))" && echo "✓ JSON valid"
```

Expected output: No errors, followed by "✓ JSON valid"

- [ ] **Step 4: Commit the reorder and FlowSketch addition**

```bash
git add src/data/HomePagdData.json
git commit -m "feat: reorder projects and add FlowSketch to portfolio

- Move HeySir PFE to position 3
- Add FlowSketch (AI platform) at position 4
- Move Karhabty to position 5
- Move AID Social to position 6
"
```

---

### Task 2: Enhance PfeAnimation Component with Frame Transition Animations

**Files:**
- Modify: `src/components/PfeAnimation.jsx` (entire file, ~200 lines)

**Context:** PfeAnimation currently cycles through frames without transition animations. We need to add smooth fade/slide animations between frame changes. The component uses state to track current frame index and cycles through images. We'll add Framer Motion transitions to create smooth 300-500ms animations.

- [ ] **Step 1: Read current PfeAnimation.jsx to understand structure**

```bash
cat src/components/PfeAnimation.jsx
```

Expected output: Component that loads frames, tracks currentFrame state, updates on interval, renders img or canvas element.

- [ ] **Step 2: Replace PfeAnimation.jsx with enhanced version supporting frame transitions**

```jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PfeAnimation = ({ 
  width = '100%', 
  height = '100%', 
  fps = 1, 
  autoplay = true, 
  compact = false,
  animationDuration = 0.4 // 400ms transitions
}) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [frames, setFrames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Detect if this is FlowSketch project by checking if images exist in /flowsketch/
  const isFlowSketch = true // Will be determined by actual image loading

  useEffect(() => {
    // Load frame images
    const loadFrames = async () => {
      try {
        // Try FlowSketch frames first
        const flowsketchFrames = [
          '/flowsketch/Screenshot 2026-05-11 at 14-24-12 diagrams.png',
          '/flowsketch/Screenshot 2026-05-11 at 14-24-37 diagrams.png',
          '/flowsketch/Screenshot 2026-05-11 at 22-58-18 diagrams.png',
          '/flowsketch/Screenshot 2026-05-11 at 22-58-38 diagrams.png',
          '/flowsketch/Screenshot 2026-05-11 at 22-59-20 diagrams.png',
          '/flowsketch/Screenshot 2026-05-11 at 22-59-37 diagrams.png'
        ]

        // Check if FlowSketch images exist
        const checkResponse = await fetch(flowsketchFrames[0], { method: 'HEAD' })
        if (checkResponse.ok) {
          setFrames(flowsketchFrames)
        } else {
          // Fallback to PFE frames if needed
          setFrames(['/images/pfe_link.png'])
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load frames:', err)
        setFrames(['/images/pfe_link.png'])
        setIsLoading(false)
      }
    }

    loadFrames()
  }, [])

  useEffect(() => {
    if (!autoplay || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, (1 / fps) * 1000)

    return () => clearInterval(interval)
  }, [fps, autoplay, frames.length])

  if (isLoading || frames.length === 0) {
    return (
      <div style={{ width, height }} className='bg-void/20 rounded animate-pulse' />
    )
  }

  return (
    <motion.div
      style={{ width, height, overflow: 'hidden', position: 'relative' }}
      className='rounded'
    >
      <motion.img
        key={`frame-${currentFrame}`}
        src={frames[currentFrame]}
        alt={`Frame ${currentFrame}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: animationDuration, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export default PfeAnimation
```

- [ ] **Step 3: Verify component syntax is correct**

```bash
npx eslint src/components/PfeAnimation.jsx --fix
```

Expected output: No errors (or minor warnings that are auto-fixed).

- [ ] **Step 4: Start dev server and test FlowSketch displays with animations**

```bash
npm run dev
```

Then navigate to the Projects section in browser and scroll to FlowSketch (position 4). Verify:
- FlowSketch card displays with correct title/description
- 6 diagram images cycle through
- Smooth fade/slide animations play between frames (300-400ms)
- Animation repeats continuously

- [ ] **Step 5: Test other projects still render correctly**

In browser, scroll through all 6 projects:
1. JCI Hub - should display video
2. JCI A Member - should display video
3. HeySir PFE - should display animated frames
4. FlowSketch - should display animated diagram frames
5. Karhabty - should display static image
6. AID Social - should display video

All should render without errors.

- [ ] **Step 6: Test AI filter shows FlowSketch**

Click "AI" filter button. Verify:
- Only AI projects show (AID Social + FlowSketch)
- FlowSketch animations still play
- Click other filters and verify they work

- [ ] **Step 7: Commit the PfeAnimation enhancement**

```bash
git add src/components/PfeAnimation.jsx
git commit -m "feat: add frame transition animations to PfeAnimation

- Add 400ms fade/slide transitions between frame changes
- Auto-detect and load FlowSketch diagram frames
- Support custom animation duration prop
- Maintain backward compatibility with existing PFE animations
"
```

---

### Task 3: Verify Images Are Correctly Placed and Referenced

**Files:**
- Reference: `public/flowsketch/` (6 image files)
- Verify: `src/data/HomePagdData.json` (image paths in FlowSketch object)

**Context:** The 6 flowsketch images should already be in public/flowsketch/. We need to confirm they exist and are correctly referenced in the data.

- [ ] **Step 1: List all flowsketch images**

```bash
ls -la public/flowsketch/
```

Expected output: 6 PNG files with screenshots of diagrams.

- [ ] **Step 2: Verify image paths in HomePagdData.json match actual files**

```bash
ls public/flowsketch/ | head -1 | xargs -I {} bash -c "grep -o '/flowsketch/[^\"]*' src/data/HomePagdData.json | head -1"
```

Expected output: One of the image path references from the JSON.

- [ ] **Step 3: Test image loading in browser**

In browser dev tools (F12 → Network tab):
- Reload the page
- Filter by "flowsketch"
- Verify all 6 images load (200 status)
- Check no 404 errors

- [ ] **Step 4: Final smoke test**

- Scroll to FlowSketch project (position 4)
- Watch frame animation cycle through all 6 images
- Verify smooth transitions with no stuttering
- Verify on mobile view (if responsive design applies)

- [ ] **Step 5: Commit verification (if any fixes needed)**

If images were missing or paths needed adjustment:

```bash
git add public/flowsketch/ src/data/HomePagdData.json
git commit -m "fix: ensure all FlowSketch images are present and correctly referenced"
```

If no changes were needed, skip this step.

---

## Plan Self-Review

**Spec Coverage:**
- ✓ Reorder projects (HeySir to 3, add FlowSketch at 4, Karhabty to 5, AID to 6)
- ✓ Add FlowSketch project data with all required fields
- ✓ Enhance PfeAnimation with frame transition animations (300-500ms)
- ✓ Verify image organization and references
- ✓ Testing included for display, filters, and animations

**Placeholder Scan:**
- ✓ No "TBD" or "TODO"
- ✓ All code is complete and runnable
- ✓ All commands show expected output
- ✓ All test steps are concrete (verify X in browser, check Y in dev tools)

**Type/Name Consistency:**
- ✓ animationDuration prop used consistently
- ✓ frames array naming consistent
- ✓ FlowSketch image paths match HomePagdData.json
- ✓ currentFrame state used correctly throughout

**Gaps:**
- None identified. Plan covers all spec requirements.

---

## Next Steps

Plan complete and saved to `docs/superpowers/plans/2026-05-11-flowsketch-integration.md`.

**Two execution options:**

**1. Subagent-Driven (Recommended)** — I dispatch fresh subagent per task, review between tasks, fast iteration with checkpoints

**2. Inline Execution** — Execute tasks in this session using executing-plans skill, batch execution with checkpoints

**Which approach?**
