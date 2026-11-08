# Mohammed Arshad — Portfolio & Architecture Guide 🚀

Welcome to your portfolio documentation! This guide explains every part of your project, how the pages and components work, how styling and animations are implemented, and the key concepts we discussed (including Supabase, Firebase, EmailJS, and the automated AI job-hunting engine).

---

## 📌 Quick Summary & Links

* **Live Website**: [https://new-portfolio-taupe-rho.vercel.app/](https://new-portfolio-taupe-rho.vercel.app/)
* **GitHub Repository**: [https://github.com/mohammedarshad05/new-portfolio](https://github.com/mohammedarshad05/new-portfolio)
* **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, CSS Modules, Framer Motion, GSAP.

---

## 1. Project Overview & Page Structure

Your portfolio is divided into clean, reusable sections:

### A. The Custom Intro Loader (`lib/components/IntroInPage/index.tsx`)
* **What it does**: When someone loads or refreshes your website, a full-screen white curtain appears.
* **The Animation**:
  * Your name splits into letters: `["A", "R", "S", "H", "A", "D"]`.
  * Each letter rises with a smooth spring motion.
  * A black pill dot floats above your name with a mini home icon.
  * The dot bounces and launches across the screen, landing right into your navigation bar to become the home dot.
  * Six white vertical panels peel upward, revealing your portfolio underneath.

---

### B. Home Page (`app/(site)/page.tsx`)
The home page brings together three major sections:
1. **Hero & About (`lib/components/HeroAbout/index.tsx`)**
   * **Hero Intro (`lib/components/Hero/HeroIntro.tsx`)**:
     * Badges: **"Full Stack Dev"** & **"Software Developer"**.
     * Animated heading: **"Hello, I'm Mohammed Arshad."**
     * Subtitle with your personal summary.
     * **"Get in touch"** button linking directly to `/contact`.
     * Social icons linking to GitHub and LinkedIn.
   * **Avatar Frame**: Displays your profile photo (`public/avat.png`) inside an offset geometric border with spring tilt physics.
   * **About Section**:
     * Section title: **"Meet Arshad."**
     * Story paragraphs highlighting your experience with React.js, Next.js, TypeScript, JavaScript, PHP, Symfony, REST APIs, and databases.
     * **"My stack"** chips: Interactive badges for your core tools.
2. **Featured Projects Showcase (`lib/components/ProjectsShowcase/index.tsx`)**
   * A 3D interactive laptop built purely with CSS and Framer Motion.
   * As the user scrolls down the page, the laptop lid opens up, the screen turns on, and displays your project screenshot.
   * Features **NOOR-E-KHAAK** ([https://noor-e-khaak.vercel.app/](https://noor-e-khaak.vercel.app/)).
3. **Interactive Terminal (`lib/components/Terminal/index.tsx`)**
   * A simulated command-line window at the bottom of the home page.
   * Visitors can type real commands like `help`, `about`, `projects`, `skills`, `contact`, and `whoami`.
   * Displays your background, active skills, and contact info.
   * Contains your **Services card** (Frontend Engineering, Full Stack Web Apps, REST API Integration, Responsive Design).

---

### C. Projects Archive Page (`app/(site)/projects/page.tsx`)
* A full project gallery where all your projects from `lib/data/projects.ts` are displayed in a clean card grid.
* Each card includes the project title, description, tech stack tags, and a live link button.

---

### D. Contact Page (`app/(site)/contact/page.tsx`)
* **Intro Header (`lib/components/Contact/ContactIntro.tsx`)**:
  * Displays "Got a project in mind?" with clickable badges for your **GitHub**, **LinkedIn**, and **Email** (`arshff005@gmail.com`).
* **Contact Form (`lib/components/Contact/ContactForm.tsx`)**:
  * Inputs for Name, Email, and Message with real-time validation.
  * Submissions are processed by **EmailJS** directly to your inbox without requiring a backend database.

---

### E. Navigation & Footer
* **Navbar (`lib/components/Navbar/index.tsx`)**: A floating pill that expands on hover and smoothly marks the active page route.
* **Footer (`lib/components/Footer.tsx`)**: Displays **Arshad {year} ❤️**.

---

## 2. How Styling & Animations Work

This project uses a modern **hybrid styling architecture**:

1. **CSS Modules (`*.module.css`)**:
   * Each component has its own stylesheet (e.g. `HeroAbout.module.css`, `Contact.module.css`).
   * Class names are automatically scoped so styles never accidentally conflict across files.
2. **Global CSS Design Tokens (`app/globals.css`)**:
   * Defines root variables like `--bg`, `--accent`, `--border`, `--card-orange`, and custom fonts (`Syne` for display, `DM Mono` for code).
3. **Tailwind CSS v4**:
   * Configured globally via `@tailwindcss/postcss`. Utility classes can be used anywhere in JSX.
4. **Framer Motion**:
   * Powers scroll-linked animations (`useTransform`, `useMotionValue`), hover micro-interactions, and page entry transitions.

---

## 3. Contact Form: How It Works (EmailJS)

Instead of maintaining a database server to receive messages, this portfolio uses **EmailJS** (`@emailjs/browser`):

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

### How to activate it:
1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Connect your Gmail (`arshff005@gmail.com`) to get a **Service ID**.
3. Create an Email Template with fields `{{name}}`, `{{email}}`, and `{{message}}` to get a **Template ID**.
4. Copy your **Public Key** from Account Settings.
5. Add those 3 variables in your Vercel Project Settings > Environment Variables:
   * `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   * `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   * `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## 4. Supabase vs. Firebase: What are they and which is easier?

Both **Supabase** and **Firebase** are **Backend-as-a-Service (BaaS)** platforms. They provide instant databases, user authentication, and storage without configuring Linux servers.

| Feature | **Firebase** (Google) | **Supabase** |
| :--- | :--- | :--- |
| **Database Type** | **NoSQL** (Firestore documents/collections) | **Relational SQL** (PostgreSQL) |
| **Interface** | Document tree | Visual spreadsheet (like Excel / Airtable) |
| **Queries** | Firebase custom SDK methods | Standard **SQL** or intuitive JavaScript API |
| **Mobile Push Notifications** | Built-in via Firebase Cloud Messaging (FCM) | Uses external providers (OneSignal, Expo, etc.) |
| **Open Source** | No (Proprietary to Google Cloud) | **Yes (100% open source)** |
| **Best For** | Mobile apps using basic document storage | **Full Stack web apps, relational data, SQL** |

### Why Supabase is easier for you:
Because you have experience with **PHP, Symfony, and relational databases (MySQL/PostgreSQL)**, Supabase is 10x more natural. You can use standard tables, foreign keys, and SQL queries rather than learning complex NoSQL rules.

---

## 5. The Secret Automated Job-Hunting Engine (`lib/monitor/`)

The previous owner built a private job search robot inside the repository. It has **no connection to your public portfolio**, but it's an incredible learning example and interview talking point.

### How the Robot Works:

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
│ Compares Job Description vs Candidate Resume           │
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
│ 5. Private Dashboard (`/monitor/login`)                │
│ Owner reviews matches and clicks [Send Application]    │
│ Dispatches email with resume.pdf via Resend API        │
└────────────────────────────────────────────────────────┘
```

### Why sites have `/api` (e.g. `remoteok.com/api`):
* `remoteok.com` returns HTML for human eyes.
* `remoteok.com/api` is an official **REST API endpoint** that returns raw JSON data for software developers.
* The bot doesn't need to load slow browser windows or parse HTML; it requests the JSON feed in milliseconds.

### The AI Scoring Logic (`lib/monitor/score.ts`):
* **80–100**: Strong fit (frontend role, React/Next.js/TypeScript, matching seniority).
* **60–79**: Decent fit with one minor stack gap.
* **0–59**: Discard (backend-only like Java/.NET, senior lead/manager 10+ years, or intern).

### Why this is a goldmine in technical interviews:
Instead of talking about typical tutorial projects, you can tell interviewers:
> *"I understand full-stack architecture, background cron jobs, and LLM orchestration. In my portfolio project, there is an autonomous engine that queries 8 remote job APIs, uses an LLM with strict JSON schemas to grade listings against candidate qualifications 0–100, drafts tailored emails, and manages dispatch via Resend and Supabase."*

---

## 6. Git, Tokens & Deployment Troubleshooting

### Why the 403 Git error happened:
* On macOS, Git uses your **Mac Keychain** to remember credentials.
* Your keychain had an old **Fine-Grained Personal Access Token** scoped only to your previous repository (`noor-e-khaak`).
* When you pushed to `new-portfolio`, GitHub rejected it with `403 Forbidden` because the token was not authorized for the new repository.

### How we solved it:
* Created a **Classic Personal Access Token** with the `repo` scope. Classic tokens have access to all your repositories, so new projects push smoothly without permission errors.
* Updated Mac Keychain so future `git push` commands run automatically without re-prompting.

---

## 7. Useful Daily Commands

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
  git commit -m "Describe your changes"
  git push origin main
  ```
  *(Vercel automatically detects the push and deploys the new version within seconds!)*

---

*Authored for Mohammed Arshad's Portfolio — Happy Coding!* 🚀
