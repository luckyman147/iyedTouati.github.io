# Portfolio Content & Structure Updates Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the portfolio to reflect recent professional experience, feature the Taylor case study, update the active tech stack, add foundational resume sections (Education, Certifications, Languages), and fix SEO tags.

**Architecture:** We will modify the core JSON data structure to include the new content. For the new static sections (Education, Certifications, Languages), we will create a new simple UI component `Credentials.jsx` and inject it into the `Home.jsx` layout. We will also update the static `index.html` file.

**Tech Stack:** React, JSON, HTML

---

### Task 1: Update Experience Timeline

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A - Data change*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
Modify `src/data/HomePagdData.json` under `"experience": { "allExperience": [ ... ] }`. Insert the two new experiences at the beginning of the array.

```json
      {
        "designation": "Software Engineer",
        "company": "Barmajti IT",
        "duration": "Present",
        "jobType": "Full-time",
        "companyTitle": "Full-Stack Development & Architecture",
        "companyDescription": "Engineered scalable web applications and architectural solutions. Led the transition of legacy systems to modern React and Node architectures. Improved system performance and maintained high deployment velocity."
      },
      {
        "designation": "Software Engineer",
        "company": "Afkaar Sousse",
        "duration": "Recent",
        "jobType": "Contract",
        "companyTitle": "Digital Solutions & Platform Engineering",
        "companyDescription": "Developed full-stack platforms connecting digital agencies with clients. Automated deployment pipelines and optimized server-side rendering for improved SEO and performance."
      },
```
*(Note: Edit the `companyDescription` during execution to accurately reflect your actual achievements. Remember to separate sentences with a period so `ExperienceCard.jsx` automatically splits them into bullet points).*

**Step 4: Run test to verify it passes**
Run: `npm run dev` and navigate to the Experience section. Check that Barmajti IT and Afkaar Sousse are the first two items.

**Step 5: Commit**
```bash
git add src/data/HomePagdData.json
git commit -m "feat: add Barmajti IT and Afkaar Sousse to experience"
```

---

### Task 2: Add Taylor as Featured Project

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A - Data change*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
Modify `src/data/HomePagdData.json` under `"projects": { "allProjects": [ ... ] }`. Add the Taylor project at the beginning of the array.

```json
      {
        "thumbUrl": "/images/taylor-thumbnail.png",
        "videoUrl": "",
        "title": "Taylor",
        "subTitle": "AI Resume-to-Job Matching Engine",
        "github": "https://github.com/luckyman147/taylor",
        "details": {
          "title": "Taylor matching algorithm",
          "description": "An intelligent platform that solves the resume black-hole problem. It parses candidate resumes and maps their skills directly against job descriptions using advanced semantic matching, giving hiring managers an instant qualification score.",
          "frameworks": "Next.js, Python, AI APIs",
          "type": "AI Platform"
        }
      },
```
*(Note: Ensure you place a placeholder or actual image at `public/images/taylor-thumbnail.png` during execution).*

**Step 4: Run test to verify it passes**
Run: `npm run dev` and check the Projects/Missions section.

**Step 5: Commit**
```bash
git add src/data/HomePagdData.json
git commit -m "feat: add Taylor project case study"
```

---

### Task 3: Reconcile Skills List (Next.js & React Native)

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
In `src/data/HomePagdData.json` under `"service": { "allService": [ ... ] }`, find and replace the objects for "Angular Framework" and ".NET Core / C#" with:

```json
      {
        "title": "Next.js Framework",
        "subTitle": "Building SEO-optimized, server-rendered React applications with dynamic routing and high-performance serverless architectures.",
        "icon": "logos:nextjs-icon",
        "ratings": 5
      },
      {
        "title": "React Native",
        "subTitle": "Developing cross-platform mobile applications with native performance, fluid UI, and shared codebases across iOS and Android.",
        "icon": "logos:react",
        "ratings": 5
      }
```

**Step 4: Run test to verify it passes**
Run: `npm run dev` and verify the Skills section renders Next.js and React Native.

**Step 5: Commit**
```bash
git add src/data/HomePagdData.json
git commit -m "feat: swap Angular and .NET for Next.js and React Native"
```

---

### Task 4: Add Education, Certifications, and Languages

**Files:**
- Modify: `src/data/HomePagdData.json`
- Create: `src/components/Credentials.jsx`
- Modify: `src/pages/Home.jsx`

**Step 1: Write the failing test**
*N/A*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
*Part A: Add Data to JSON*
Add a new `credentials` object at the root of `src/data/HomePagdData.json`:
```json
  "credentials": {
    "education": [
      {
        "degree": "Software Engineering Degree",
        "institution": "Higher Institute of Applied Science and Technology (ISSAT)",
        "year": "2024"
      }
    ],
    "certifications": [
      {
        "title": "AWS Certified Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "year": "2023"
      }
    ],
    "languages": [
      { "name": "English", "level": "Professional Working Proficiency" },
      { "name": "French", "level": "Professional Working Proficiency" },
      { "name": "Arabic", "level": "Native" }
    ]
  }
```

*Part B: Create Component*
Create `src/components/Credentials.jsx`:
```jsx
import React from 'react';

export default function Credentials({ data }) {
  if (!data) return null;
  const { education, certifications, languages } = data;

  return (
    <section className="relative py-24 px-4 bg-void text-white border-t border-plasma/10" id="credentials">
      <div className="container mx-auto max-w-4xl z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Education */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Education</h3>
          <div className="flex flex-col gap-6">
            {education.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="font-bold font-rajdhani text-lg">{item.degree}</h4>
                <p className="text-sm text-white/60">{item.institution}</p>
                <span className="text-[10px] font-mono text-solar">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Certifications</h3>
          <div className="flex flex-col gap-6">
            {certifications.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="font-bold font-rajdhani text-lg">{item.title}</h4>
                <p className="text-sm text-white/60">{item.issuer}</p>
                <span className="text-[10px] font-mono text-solar">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Languages</h3>
          <div className="flex flex-col gap-4">
            {languages.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-plasma/10 pb-2 last:border-0">
                <h4 className="font-bold font-rajdhani text-lg">{item.name}</h4>
                <p className="text-sm text-solar/80 font-mono tracking-widest uppercase">{item.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

*Part C: Inject Component*
Modify `src/pages/Home.jsx`:
```jsx
// Import the new component
import Credentials from "../components/Credentials";

// Inside Home function, destructure credentials
  const {
    // ... existing imports
    credentials
  } = HomePagdData;

// In the return statement, add it below Experience
      <Experience data={experience} />
      <Credentials data={credentials} />
```

**Step 4: Run test to verify it passes**
Run: `npm run dev`. Verify the static layout for Education, Certifications, and Languages renders properly underneath the Experience section.

**Step 5: Commit**
```bash
git add src/data/HomePagdData.json src/components/Credentials.jsx src/pages/Home.jsx
git commit -m "feat: add education, certifications, and languages sections"
```

---

### Task 5: Fix Meta Tags

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**
*N/A*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
In `index.html`, find the line:
```html
<meta property="og:url" content="https://iyedtouati.github.io/" />
```
And change it to your actual Netlify URL, e.g.:
```html
<meta property="og:url" content="https://iyedtouati.netlify.app/" />
```
*(Ensure you use the correct Netlify production URL).*

**Step 4: Run test to verify it passes**
Run `npm run build` or inspect the DOM locally to verify the tag is updated.

**Step 5: Commit**
```bash
git add index.html
git commit -m "fix: update og:url meta tag to resolve 404s"
```
