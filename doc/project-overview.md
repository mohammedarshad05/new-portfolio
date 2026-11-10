# Mohammed Arshad — Portfolio & Architecture Guide 🚀

Welcome to my portfolio documentation! This guide explains every part of my portfolio project, how my pages and components work, how I implemented styling and animations, and the key concepts behind the architecture (including Supabase, Firebase, EmailJS, and my automated AI job-hunting engine).

---

## 📌 Quick Summary & Links

* **Live Website**: [https://new-portfolio-taupe-rho.vercel.app/](https://new-portfolio-taupe-rho.vercel.app/)
* **GitHub Repository**: [https://github.com/mohammedarshad05/new-portfolio](https://github.com/mohammedarshad05/new-portfolio)
* **My Core Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, CSS Modules, Framer Motion, GSAP.

---

## 1. Project Overview & Page Structure

I designed my portfolio with clean, modular, and reusable sections:

### A. My Custom Intro Loader (`lib/components/IntroInPage/index.tsx`)
* **What it does**: When someone visits or refreshes my website, a full-screen white curtain appears.
* **The Animation**:
  * My name splits into letters: `["A", "R", "S", "H", "A", "D"]`.
  * Each letter rises with a smooth spring motion.
  * A black pill dot floats above my name with a mini home icon.
  * The dot bounces and launches across the screen, landing right into my navigation bar to become the home dot.
  * Six white vertical panels peel upward, revealing my portfolio underneath.

---

### B. My Home Page (`app/(site)/page.tsx`)
My home page brings together three major sections:
1. **Hero & About (`lib/components/HeroAbout/index.tsx`)**
   * **Hero Intro (`lib/components/Hero/HeroIntro.tsx`)**:
     * Badges: **"Full Stack Dev"** & **"Software Developer"**.
     * Animated heading: **"Hello, I'm Mohammed Arshad."**
     * Subtitle summarizing my focus: *"Frontend-focused full stack developer specializing in building modern, responsive, and user-friendly web applications."*
     * **"Get in touch"** button linking directly to my `/contact` page.
     * Social icons linking to my GitHub and LinkedIn.
   * **Avatar Frame**: Displays my profile photo (`public/avat.png`) inside an offset geometric border with spring tilt physics.
   * **About Section**:
     * Section title: **"Meet Arshad."**
     * Story paragraphs detailing my background with React.js, Next.js, TypeScript, JavaScript, custom CMS development with WordPress & ACF Pro, PHP, Symfony, REST APIs, and databases.
     * **"My stack"** chips: Interactive badges displaying my core technical skills (including React, Next.js, TypeScript, PHP, WordPress, ACF Pro, Symfony, and Tailwind CSS).
2. **Featured Projects Showcase (`lib/components/ProjectsShowcase/index.tsx`)**
   * A 3D interactive laptop built purely with CSS and Framer Motion.
   * As the visitor scrolls down my page, the laptop lid opens up, the screen turns on, and displays my project preview.
   * Features my project **NOOR-E-KHAAK** ([https://noor-e-khaak.vercel.app/](https://noor-e-khaak.vercel.app/)).
3. **Interactive Terminal (`lib/components/Terminal/index.tsx`)**
   * A simulated command-line window at the bottom of my home page.
   * Visitors can type real commands like `help`, `about`, `projects`, `skills`, `contact`, and `whoami`.
   * Displays my background, active skills, and contact info.
   * Contains my **Services card** (Frontend Engineering, Full Stack Web Apps, REST API Integration, Responsive Design).

---

### C. Projects Archive Page (`app/(site)/projects/page.tsx`)
* A full project gallery where all my projects from `lib/data/projects.ts` are displayed in a clean card grid.
* Each card includes the project title, description, tech stack tags, and a live link button.

---

### D. Contact Page (`app/(site)/contact/page.tsx`)
* **Intro Header (`lib/components/Contact/ContactIntro.tsx`)**:
  * Displays "Got a project in mind?" with clickable badges for my **GitHub**, **LinkedIn**, and **Email** (`arshff005@gmail.com`).
* **Contact Form (`lib/components/Contact/ContactForm.tsx`)**:
  * Inputs for Name, Email, and Message with real-time validation.
  * Submissions are processed by **EmailJS** directly to my inbox without requiring a backend database.

---

### E. Navigation & Footer
* **Navbar (`lib/components/Navbar/index.tsx`)**: A floating pill that expands on hover and smoothly marks the active page route.
* **Footer (`lib/components/Footer.tsx`)**: Displays **Arshad {year} ❤️**.

---

## 2. How I Implemented Styling & Animations

I chose a modern **hybrid styling architecture** to ensure high performance and maintainability:

1. **CSS Modules (`*.module.css`)**:
   * Each of my components has its own stylesheet (e.g. `HeroAbout.module.css`, `Contact.module.css`).
   * Class names are automatically scoped so styles never accidentally conflict across files.
2. **Global CSS Design Tokens (`app/globals.css`)**:
   * Defines root variables like `--bg`, `--accent`, `--border`, `--card-orange`, and custom fonts (`Syne` for display, `DM Mono` for code).
3. **Tailwind CSS v4**:
   * Configured globally via `@tailwindcss/postcss`. I can use utility classes anywhere in my JSX when needed.
4. **Framer Motion**:
   * Powers my scroll-linked animations (`useTransform`, `useMotionValue`), hover micro-interactions, and page entry transitions.

---

## 3. My Contact Form: How It Works (EmailJS)

Instead of maintaining a database server just to receive contact messages, I use **EmailJS** (`@emailjs/browser`):

```ts
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
);
```

### How I set it up:
1. Created an account on [emailjs.com](https://www.emailjs.com/).
2. Connected my Gmail (`arshff005@gmail.com`) to get my **Service ID**.
3. Created an Email Template with fields `{{name}}`, `{{email}}`, and `{{message}}` to get my **Template ID**.
4. Copied my **Public Key** from Account Settings.
5. Added those 3 variables in my Vercel Project Settings > Environment Variables:
   * `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   * `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   * `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## 4. Supabase vs. Firebase: What They Are & Why I Prefer Supabase

Both **Supabase** and **Firebase** are **Backend-as-a-Service (BaaS)** platforms. They provide instant databases, user authentication, and storage without configuring Linux servers.

| Feature | **Firebase** (Google) | **Supabase** |
| :--- | :--- | :--- |
| **Database Type** | **NoSQL** (Firestore documents/collections) | **Relational SQL** (PostgreSQL) |
| **Interface** | Document tree | Visual spreadsheet (like Excel / Airtable) |
| **Queries** | Firebase custom SDK methods | Standard **SQL** or intuitive JavaScript API |
| **Mobile Push Notifications** | Built-in via Firebase Cloud Messaging (FCM) | Uses external providers (OneSignal, Expo, etc.) |
| **Open Source** | No (Proprietary to Google Cloud) | **Yes (100% open source)** |
| **Best For** | Mobile apps using basic document storage | **Full Stack web apps, relational data, SQL** |

### Why Supabase fits my background:
Because I work with **PHP, Symfony, and relational databases (MySQL/PostgreSQL)**, Supabase is much more natural for me. I can use standard tables, foreign keys, and SQL queries rather than being locked into complex NoSQL rules.

---

## 5. My Automated Job-Hunting Engine (`lib/monitor/`)

Inside my repository, I also built a personal automated job search engine. It has **no connection to my public portfolio**, but serves as a real-world demonstration of full-stack engineering, cron jobs, and LLM orchestration.

### How My Job Robot Works:

```
┌────────────────────────────────────────────────────────┐
│ 1. Public Job Boards (APIs & RSS Feeds)               │
│ RemoteOK, WeWorkRemotely, Jobicy, Hacker News, etc.    │
└──────────────────────────┬─────────────────────────────┘
                           │ Scraped via scheduled cron
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Deduplication & Storage (Supabase)                  │
│ Cleans HTML, extracts tags, saves new jobs to DB       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. AI Scoring Engine (Claude / Gemini)                 │
│ Compares Job Description vs My Resume                  │
│ Returns Score 0-100 + 1-sentence reason                │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. AI Cover Letter Drafter                             │
│ Writes 2-sentence tailored pitch email for high scores │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 5. My Private Dashboard (`/monitor/login`)             │
│ I review matches and click [Send Application]          │
│ Dispatches email with my resume.pdf via Resend API     │
└────────────────────────────────────────────────────────┘
```

### Why websites provide `/api` (e.g. `remoteok.com/api`):
* `remoteok.com` returns HTML for human eyes.
* `remoteok.com/api` is an official **REST API endpoint** that returns raw JSON data for developers.
* My bot doesn't need to load slow browser windows or parse HTML; it requests the JSON feed in milliseconds.

### The AI Scoring Logic I Built (`lib/monitor/score.ts`):
* **80–100**: Strong fit (frontend role, React/Next.js/TypeScript, matching my seniority level).
* **60–79**: Decent fit with one minor stack gap.
* **0–59**: Discard (backend-only like Java/.NET, senior lead/manager 10+ years, or intern).

### Why I talk about this in technical interviews:
Instead of only discussing tutorial apps, I explain this system to hiring managers:
> *"I understand full-stack architecture, background cron jobs, and LLM orchestration. In my project, I built an autonomous engine that queries 8 remote job APIs, uses an LLM with strict JSON schemas to grade listings against my qualifications 0–100, drafts tailored emails, and manages dispatch via Resend and Supabase."*

---

## 6. Git, Tokens & Deployment Architecture

### How I solved the 403 Git error:
* On macOS, Git uses the **Mac Keychain** to cache credentials.
* My keychain had an old **Fine-Grained Personal Access Token** scoped only to my previous repository.
* When I pushed to `new-portfolio`, GitHub rejected it with `403 Forbidden` because the token was not authorized for the new repository.
* I solved this by generating a **Classic Personal Access Token** with the `repo` scope, giving me access across all my repositories, and updated my Keychain so future pushes run automatically.

---

## 7. Commands I Use Daily

* **Start local development server**:
  ```bash
  npm run dev
  ```
  *(Opens site at [http://localhost:3000](http://localhost:3000))*

* **Run TypeScript check (Verify no errors)**:
  ```bash
  npx tsc --noEmit
  ```

* **Build for production**:
  ```bash
  npm run build
  ```

* **Commit and push new changes to live Vercel**:
  ```bash
  git add .
  git commit -m "Describe my changes"
  git push origin main
  ```
  *(Vercel automatically detects the push and deploys the new version within seconds!)*

---

*Authored by Mohammed Arshad — Full Stack Developer* 🚀

