# viralbeat-ai
A premium full-stack AI SaaS utility built with Next.js, Tailwind CSS, and Google Gemini API that generates high-CTR Suno AI prompts, structured song lyrics, and automated YouTube SEO metadata tailored for global target audiences.
# 🎵 ViralBeat AI — Global AI Music Metadata & Prompt Generator

ViralBeat AI is a premium, full-stack AI-powered SaaS utility tool designed for YouTube automation creators, music producers, and AI music enthusiasts. It streamlines the creation process for platforms like **Suno AI** and **Udio** by generating data packages optimized for click-through rate (CTR) and search engine optimization (SEO) based on target regional markets.

---

## 🚀 Key Features

- **Dynamic Stepper UI**: A smooth, multi-step transition workflow wrapped in a dark-themed user interface with striking neon accents.
- **CTR-Driven Niche Selection**: Offers 6 core music categories (e.g., Heartbreak Melodies, Lo-Fi Chill, Afrobeat Fusion) backed by real-world YouTube CTR benchmarks and audience behavior insights.
- **Global Audience Localization**: Automatically cross-references target country selections (USA, Pakistan, India, South Korea, etc.) with localized metadata architectures.
- **Strict Structured Outputs**: Integrates Google's Gemini Structured Output Engine (`responseMimeType: "application/json"`) to securely generate bulletproof JSON payloads in real time.
- **Automation Ready Kit**: Delivers high-conversion outputs with single-click clipboard copy utility buttons for:
  1. **Suno AI Prompt Box** (Compressed under the 200-character bracket limit).
  2. **High-CTR YouTube Titles** (Algorithmic hooks).
  3. **Multi-Script Dynamic Song Lyrics** (Verse/Chorus structured native script & Roman script).
  4. **Hyper-Targeted SEO Tags & Descriptive Metadata**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router & React Hooks Architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (Dark-mode optimization layout)
- **Icons**: [Lucide React](https://lucide.dev) (Minimal semantic iconography)
- **AI Core Backend Engine**: [Google Gemini API](https://google.dev) (Powered via `gemini-1.5-flash` live execution stream)

---

## 📦 Local Installation Guide

Follow these sequential steps to fire up this repository locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com
cd viralbeat-ai
```

### 2. Install Package Dependencies
```bash
npm install
```

### 3. Add Your Environment Configuration Keys
Create a `.env.local` file in the root directory and append your active Google AI Studio token:
```env
GEMINI_API_KEY=AIzaSyYourGenuinelyGeneratedKeyGoesHere
```

### 4. Deploy the Local Development Server
```bash
npm run dev
```
Open up your standard browser engine and route directly to [http://localhost:3000](http://localhost:3000) to view the live build.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
