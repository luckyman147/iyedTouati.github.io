# FlowSketch Project Integration Design

**Date:** 2026-05-11  
**Status:** Design Phase

## Overview
Add FlowSketch as a new portfolio project (position 4) with animated frame-by-frame display of 6 diagram screenshots. Reorder existing projects to accommodate.

## Project Details

**FlowSketch**
- **Title:** FlowSketch
- **Subtitle:** AI-Powered Diagram Animation
- **Type:** AI
- **Tech Stack:** FastAPI, React
- **Description:** Engineered an AI-powered platform that transforms static UML diagrams into dynamic, animated educational content, enabling faster understanding of complex system architectures through beautiful, step-by-step visual walkthroughs.
- **Images:** 6 screenshots from `public/flowsketch/` displayed as animated frame sequence

## Final Project Order
1. JCI Organization Hub
2. JCI A Member
3. HeySir PFE Platform
4. **FlowSketch** (NEW)
5. Karhabty.app
6. AID Social Interface

## Implementation Details

### 1. Data Structure Update (HomePagdData.json)
- Reorder `allProjects` array per final order above
- Add FlowSketch object:
  ```json
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
  }
  ```

### 2. PfeAnimation Component Enhancement
- Add fade/slide transition animations between frames (300-500ms)
- Detect if project is FlowSketch and apply frame animation
- All 6 images cycle with smooth transitions

### 3. Image Organization
- All 6 flowsketch screenshots exist in `public/flowsketch/`
- Reference paths in data as `/flowsketch/Screenshot-*.png`

## Visual Result
- FlowSketch card displays title, subtitle, description in glass-panel style
- Frame sequence cycles through 6 diagram images with animated transitions
- Matches Project 5 (HeySir) display behavior with enhanced animations
- Filterable by "AI" category

## Testing
- Verify project displays correctly in Projects section
- Confirm animations play smoothly on scroll/hover
- Test AI filter shows FlowSketch
- Verify other projects still render correctly after reorder
