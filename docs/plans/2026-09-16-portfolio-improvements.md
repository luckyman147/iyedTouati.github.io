# Portfolio Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enhance the portfolio website to effectively attract clients and hiring managers by adding missing contact details, a resume download feature, and polishing content.

**Architecture:** We will modify the JSON configuration (`HomePagdData.json`) and ensure the Hero component handles the new Call To Action buttons correctly without breaking the existing UI. 

**Tech Stack:** React, JSON

---

### Task 1: Add Contact Information

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A - This is a data/content change, no unit test required for static JSON modification.*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
Modify `src/data/HomePagdData.json` to populate the empty `contactInfo` array. Find `"contactInfo": []` and replace it with:

```json
    "contactInfo": [
      {
        "icon": "lucide:mail",
        "title": "Email Me",
        "text": "iyed.touati@example.com"
      },
      {
        "icon": "lucide:phone",
        "title": "Call Me",
        "text": "+216 55 555 555"
      },
      {
        "icon": "lucide:map-pin",
        "title": "Location",
        "text": "Sousse, Tunisia"
      }
    ]
```
*(Note: Replace with your actual email and phone number during execution)*

**Step 4: Run test to verify it passes**
Run: `npm run dev` and navigate to the Contact section.
Expected: The signal coordinates panel should now display the email, phone, and location instead of being empty.

**Step 5: Commit**

```bash
git add src/data/HomePagdData.json
git commit -m "feat: populate contact information"
```

---

### Task 2: Add Resume Download CTA to Hero

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
Modify `src/data/HomePagdData.json` to add `btnText` and `btnUrl` to the `hero` object.

```json
  "hero": {
    "imgUrl": "/images/de.png",
    "name": "Mohamed Iyed Touati",
    "heading": "Hello I am",
    "typingText": [
      "Software Engineer",
      1500,
      "Full-Stack Architect",
      1500,
      "Mobile Expert",
      1500,
      "AI Solution Specialist",
      1500
    ],
    "description": "I'm a  <b class='reveal-engineer text-plasma font-bold ml-1 uppercase tracking-wider'>Software Engineer</b> passionate about building seamless digital worlds. I love turning complex problems into simple, powerful solutions that users actually enjoy.",
    "btnText": "Download CV",
    "btnUrl": "/cv.pdf"
  },
```

*(Note: You will need to manually place your actual resume PDF named `cv.pdf` inside the `public/` folder)*

**Step 4: Run test to verify it passes**
Run: `npm run dev` and check the Hero section.
Expected: A "Download CV" button appears in the Hero section that links to `/cv.pdf`.

**Step 5: Commit**

```bash
git add src/data/HomePagdData.json
git commit -m "feat: add download CV button to hero section"
```

---

### Task 3: Polish Experience Metrics

**Files:**
- Modify: `src/data/HomePagdData.json`

**Step 1: Write the failing test**
*N/A*

**Step 2: Run test to verify it fails**
*N/A*

**Step 3: Write minimal implementation**
Modify `src/data/HomePagdData.json` to include bullet points and concrete metrics in the `companyDescription` of the experience section. 
For example, change the Karhabty.app description to:

```json
        "companyDescription": "<ul><li>Drove product lifecycle crafting premium Flutter interfaces from complex Figma prototypes.</li><li>Optimized widget trees ensuring 60fps smooth animations, improving user retention by 15%.</li><li>Collaborated with backend engineers to reduce API latency by 20%.</li></ul>"
```
*(Update other experiences similarly with real metrics you achieved)*

**Step 4: Run test to verify it passes**
Check the Experience section in the browser.
Expected: Descriptions look more professional and are easier to scan for hiring managers.

**Step 5: Commit**

```bash
git add src/data/HomePagdData.json
git commit -m "feat: format experience section with concrete metrics"
```
