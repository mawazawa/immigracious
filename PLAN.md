# Immigracious - Immigration Resource Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a comprehensive immigration resource hub for US immigrants with AI-powered voice interview preparation featuring real-time speaker diarization.

**Architecture:** Next.js 16 App Router with Supabase backend, Deepgram for real-time speech-to-text with speaker diarization, and OpenAI for AI adjudicator intelligence. Turn-based voice conversations with 2-speaker identification. Uses `use cache` for PPR, React Compiler (auto-memoization), and Turbopack (default bundler).

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7, Supabase (Auth + Database), Deepgram Nova-3 (STT + Diarization), OpenAI GPT-4o (LLM), ElevenLabs (TTS), shadcn/ui, Tailwind CSS v4, Vercel

---

## Technology Decision Record (CTO Analysis)

### Voice AI Provider Analysis: Top 10 Providers for Green Card Interview Simulator

**Use Case Requirements:**
- Real-time 2-speaker diarization (user + spouse)
- Turn-based conversation with AI adjudicator
- High-quality, realistic voice output
- Optional: Simulated spouse based on persona profile
- Priority: **Quality and realism first**, then cost at scale

---

#### Comprehensive Provider Comparison

| Provider | STT Price/min | TTS Price/min | Latency | Diarization | Quality Score |
|----------|---------------|---------------|---------|-------------|---------------|
| **Deepgram Nova-3** | $0.0077 | N/A (STT only) | ~300ms | ✅ Best-in-class | ⭐⭐⭐⭐⭐ |
| **OpenAI Realtime** | $0.06 in / $0.24 out | Included | ~200ms | ✅ gpt-4o-transcribe | ⭐⭐⭐⭐⭐ |
| **ElevenLabs Conv AI** | $0.10/min all-in | Included | ~300ms | ❌ Single speaker | ⭐⭐⭐⭐⭐ (TTS) |
| **Hume EVI 3** | $0.072/min all-in | Included | ~300ms | ❌ No | ⭐⭐⭐⭐⭐ (Emotion) |
| **AssemblyAI Universal** | $0.15/hr session | N/A (STT only) | ~300ms | ✅ 64% fewer errors | ⭐⭐⭐⭐ |
| **Google Gemini Live** | ~$0.025/min session | Included | ~250ms | ❌ No native | ⭐⭐⭐⭐ |
| **Cartesia Sonic 2.0** | N/A (TTS only) | $0.038/1K chars | **45ms** | N/A | ⭐⭐⭐⭐⭐ (Speed) |
| **Retell AI** | $0.07-0.14/min | Included | ~300ms | ❌ Platform-level | ⭐⭐⭐⭐ |
| **Groq Cloud** | $0.04-0.11/hr | N/A | ~100ms | ❌ No | ⭐⭐⭐⭐ (Speed) |
| **xAI Grok** | $0.20/1M tokens | N/A | ~200ms | ❌ No Voice API | ⭐⭐⭐ |

---

#### How Each Provider Would Implement Green Card Interview Simulator

**1. Deepgram Nova-3 + OpenAI (RECOMMENDED)**
```
Architecture: Deepgram STT → OpenAI GPT-4o → OpenAI TTS
- Deepgram handles real-time STT with native 2-speaker diarization
- Speaker labels automatically tag "Speaker 0" (user) vs "Speaker 1" (spouse)
- GPT-4o processes transcript, generates adjudicator response
- OpenAI TTS voices the adjudicator
Cost: ~$0.15/min total ($0.0077 STT + $0.06-0.08 LLM + $0.06 TTS)
```

**2. OpenAI Realtime API (All-in-One)**
```
Architecture: Single WebSocket to OpenAI
- Native voice-to-voice with gpt-4o-realtime
- Use gpt-4o-transcribe-diarize ($0.006/min) for speaker ID
- Lowest integration complexity
Cost: ~$0.30/min (with system prompts: $0.33/min)
Most realistic voice quality, highest cost
```

**3. ElevenLabs Conversational AI**
```
Architecture: ElevenLabs handles full conversation
- Best-in-class TTS quality (most natural voices)
- No native diarization - requires external STT
- Hybrid: Deepgram for STT + ElevenLabs for TTS
Cost: $0.08-0.10/min for TTS, plus Deepgram STT
Best for: Single-user citizenship test (no diarization needed)
```

**4. Hume EVI 3**
```
Architecture: Hume end-to-end voice agent
- Unique emotion detection (detects nervousness, confidence)
- Could provide "emotional coaching" feedback
- No speaker diarization - single speaker only
Cost: ~$0.072/min
Best for: Emotional coaching mode, not multi-speaker
```

**5. AssemblyAI Universal-Streaming + TTS**
```
Architecture: AssemblyAI STT → LLM → TTS
- $0.15/hr session-based billing (predictable)
- 64% fewer speaker counting errors (Oct 2025 update)
- 99.95% uptime SLA
Cost: ~$0.12/min total
Best for: Budget-conscious with good diarization
```

**6. Retell AI Platform**
```
Architecture: Retell managed platform
- Complete voice agent platform (less control)
- Integrates ElevenLabs/OpenAI voices
- Platform handles orchestration
Cost: $0.14-0.25/min all-in
Best for: Fastest time-to-market, less customization
```

---

#### Cost Analysis at Scale (Monthly)

| Scale | Deepgram+OpenAI | OpenAI Realtime | ElevenLabs | Retell AI |
|-------|-----------------|-----------------|------------|-----------|
| 100 hrs | $900 | $1,800 | $600 | $840 |
| 500 hrs | $4,500 | $9,000 | $2,400 | $4,200 |
| 1,000 hrs | $9,000 | $18,000 | $4,800 | $7,000* |
| 5,000 hrs | $45,000 | $90,000 | $24,000 | $30,000* |

*Enterprise pricing with volume discounts

---

#### Final Recommendation: Hybrid Architecture

**For Best-in-Class Quality + Realistic Voice:**

```
┌─────────────────────────────────────────────────────────────┐
│                    RECOMMENDED STACK                         │
├─────────────────────────────────────────────────────────────┤
│  STT + Diarization: Deepgram Nova-3                         │
│  - $0.0077/min real-time                                    │
│  - Best 2-speaker identification                            │
│  - 40x faster than competitors with diarization             │
│                                                             │
│  LLM Intelligence: OpenAI GPT-4o                            │
│  - Adjudicator persona and question generation              │
│  - Answer evaluation and scoring                            │
│  - ~$0.06/min                                               │
│                                                             │
│  TTS (AI Voice): ElevenLabs or OpenAI TTS                   │
│  - ElevenLabs: Most natural ($0.08/min)                     │
│  - OpenAI TTS: Good quality, simpler ($0.06/min)            │
│                                                             │
│  TOTAL: ~$0.15-0.20/min (best quality/price ratio)          │
└─────────────────────────────────────────────────────────────┘
```

**Why This Stack Wins:**
1. **Deepgram**: Only provider with production-grade real-time diarization trained on 100K+ speakers
2. **OpenAI GPT-4o**: Fast, accurate reasoning for interview simulation
3. **ElevenLabs TTS**: Ranked #1 in voice naturalness benchmarks
4. **75% cheaper** than pure OpenAI Realtime while maintaining quality

**Sources:**
- [Deepgram Speaker Diarization](https://deepgram.com/learn/nextgen-speaker-diarization-and-language-detection-models)
- [Deepgram Pricing 2025](https://brasstranscripts.com/blog/deepgram-pricing-per-minute-2025-real-time-vs-batch)
- [OpenAI Realtime API Pricing](https://openai.com/api/pricing/)
- [ElevenLabs Conversational AI](https://elevenlabs.io/blog/we-cut-our-pricing-for-conversational-ai)
- [AssemblyAI Universal-Streaming](https://www.assemblyai.com/pricing)
- [Hume EVI 3](https://www.hume.ai/blog/introducing-evi-3)
- [Cartesia Sonic](https://cartesia.ai/blog/state-of-voice-ai-2024)
- [Retell AI Pricing](https://www.retellai.com/pricing)

### Full Stack Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Next.js 16 (App Router) | Turbopack default, React Compiler, `use cache`, Proxy middleware |
| React | React 19.2 | Concurrent rendering, Server Components stable, Actions |
| Database | Supabase (Postgres) | Auth + DB bundle, real-time subscriptions, RLS |
| Auth | Supabase Auth | Integrated with DB, OAuth providers, free tier |
| UI | shadcn/ui + Tailwind v4 | CSS-first config, 100x faster builds, native CSS variables |
| STT + Diarization | Deepgram Nova-3 | Best-in-class diarization for multi-speaker ($0.0077/min) |
| LLM | OpenAI GPT-4o | Fast, accurate for conversation simulation (~$0.06/min) |
| TTS (AI voice) | ElevenLabs Conv AI | Most natural voices, 50% price cut Feb 2025 ($0.08/min) |
| Deployment | Vercel | Native Next.js support, edge functions |
| State | Zustand | Lightweight, TypeScript-first |

---

## Design System & Inspiration

**Design Philosophy:** Modern + Friendly + AI-forward + Trustworthy

### Primary Inspirations

**1. [Linear.app](https://linear.app)** - SaaS Excellence
- Monochrome black/white with strategic bold accents
- High contrast, neutral, timeless aesthetic
- "Workbench" philosophy: functional UI complemented by AI
- Uses Radix Primitives in their "Orbiter" design system
- Liquid Glass effects with ProKit discipline
- [Linear Design System on Figma](https://www.figma.com/community/file/1222872653732371433/linear-design-system)

**2. [Fey.com](https://fey.com)** - Data-Dense Elegance
- Investment platform handling complex real-time data effortlessly
- Makes analytics feel welcoming and digestible
- Premium shadows, gradients, and craftsmanship
- 100+ meticulously crafted UI elements
- Graph and chart excellence
- [Fey UI Kit breakdown](https://medium.com/@vaibhavagrawal2907/crafting-a-detailed-ui-kit-from-inspiration-breaking-down-feys-design-2d2761649e40)

**3. [Aceternity UI](https://ui.aceternity.com)** - Modern Animation
- Framer Motion-powered animations
- Copy-paste ready components
- Dark/light theme support
- AI-forward visual language
- Animated backgrounds, cards, text effects

**4. Apple HIG** - Trustworthiness
- Consistent visual hierarchy
- Accessibility-first design
- Clear affordances and feedback
- Professional polish builds trust

### Design Tokens

```css
/* Core palette - inspired by Linear's monochrome + Fey's warmth */
--color-background: oklch(1 0 0);           /* Pure white */
--color-foreground: oklch(0.145 0 0);       /* Near black */
--color-primary: oklch(0.55 0.2 250);       /* Professional blue */
--color-accent: oklch(0.65 0.15 160);       /* Trustworthy teal */
--color-success: oklch(0.7 0.2 145);        /* Immigration green */
--color-warning: oklch(0.8 0.15 85);        /* Warm amber */

/* Typography - clean, professional */
--font-sans: 'Inter Variable', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Spacing scale - 4px base */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

### Key UI Patterns

1. **Interview Screen**: Clean split-view
   - Left: Real-time transcript with speaker labels
   - Right: AI adjudicator avatar + controls
   - Bottom: Audio waveform visualization

2. **Progress Dashboard**: Fey-inspired data cards
   - Session statistics with subtle animations
   - Progress rings and achievement badges
   - Historical performance charts

3. **Resource Hub**: Linear-inspired navigation
   - Left sidebar with category tree
   - Centered content with TOC
   - Breadcrumb navigation

### Component Library

Using **shadcn/ui** with custom theme extending:
- Button variants: primary, secondary, ghost, destructive
- Card with subtle shadow and hover states
- Animated progress indicators
- Voice recording controls with waveform
- Speaker identification badges

---

## Database Schema

```sql
-- Users (managed by Supabase Auth, extended with profile)
create table public.profiles (
  id uuid references auth.users primary key,
  full_name text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Practice Sessions
create table public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  session_type text check (session_type in ('citizenship', 'greencard')),
  started_at timestamptz default now(),
  completed_at timestamptz,
  score integer,
  total_questions integer,
  correct_answers integer,
  duration_seconds integer
);

-- Session Transcripts
create table public.session_transcripts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.practice_sessions(id) on delete cascade,
  speaker text check (speaker in ('adjudicator', 'user', 'spouse')),
  content text not null,
  timestamp_ms integer,
  created_at timestamptz default now()
);

-- Question Bank
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  category text check (category in ('citizenship', 'greencard_user', 'greencard_spouse', 'greencard_couple')),
  question_text text not null,
  expected_topics text[], -- key topics for evaluation
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  source text -- official source reference
);

-- User Progress
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  question_id uuid references public.questions(id),
  times_seen integer default 0,
  times_correct integer default 0,
  last_seen_at timestamptz,
  unique(user_id, question_id)
);
```

---

## Project Structure

```
immigreat/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── progress/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (public)/
│   │   │   ├── page.tsx                    # Landing page
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx                # Resource hub index
│   │   │   │   ├── adjustment-of-status/page.tsx
│   │   │   │   ├── green-card/page.tsx
│   │   │   │   └── consular-processing/page.tsx
│   │   │   └── layout.tsx
│   │   ├── interview/
│   │   │   ├── citizenship/page.tsx        # Citizenship test
│   │   │   ├── greencard/page.tsx          # Green card interview
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── callback/route.ts
│   │   │   ├── deepgram/
│   │   │   │   └── token/route.ts          # Get temp Deepgram token
│   │   │   ├── interview/
│   │   │   │   ├── start/route.ts
│   │   │   │   ├── evaluate/route.ts       # LLM evaluates answer
│   │   │   │   └── complete/route.ts
│   │   │   └── tts/
│   │   │       └── route.ts                # OpenAI TTS
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                             # shadcn/ui components
│   │   ├── interview/
│   │   │   ├── VoiceRecorder.tsx
│   │   │   ├── TranscriptDisplay.tsx
│   │   │   ├── SpeakerIndicator.tsx
│   │   │   ├── AdjudicatorAvatar.tsx
│   │   │   └── InterviewControls.tsx
│   │   ├── resources/
│   │   │   ├── ResourceCard.tsx
│   │   │   └── TableOfContents.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                   # Browser client
│   │   │   ├── server.ts                   # Server client
│   │   │   └── middleware.ts
│   │   ├── deepgram/
│   │   │   ├── client.ts                   # WebSocket manager
│   │   │   └── types.ts
│   │   ├── openai/
│   │   │   ├── adjudicator.ts              # Interview AI logic
│   │   │   └── tts.ts                      # Text-to-speech
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useVoiceRecording.ts
│   │   ├── useDiarization.ts
│   │   ├── useInterview.ts
│   │   └── useAuth.ts
│   ├── stores/
│   │   ├── interviewStore.ts               # Zustand store
│   │   └── userStore.ts
│   ├── types/
│   │   └── index.ts
│   └── content/
│       └── resources/                      # MDX content files
│           ├── adjustment-of-status.mdx
│           ├── green-card.mdx
│           └── consular-processing.mdx
├── public/
├── tests/
│   ├── unit/
│   └── e2e/
├── supabase/
│   └── migrations/
├── .env.local.example
├── next.config.ts
├── tsconfig.json
└── package.json
# Note: Tailwind v4 uses CSS-first config - no tailwind.config.ts needed
```

---

## Voice Interview Architecture Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐   │
│  │ Microphone  │───▶│ AudioWorklet    │───▶│ WebSocket Client │   │
│  │ (getUserMedia)   │ (PCM 16-bit)    │    │ (send audio)     │   │
│  └─────────────┘    └─────────────────┘    └────────┬─────────┘   │
│                                                      │              │
│  ┌─────────────┐    ┌─────────────────┐             │              │
│  │ Speaker     │◀───│ Transcript      │◀────────────┤              │
│  │ (Web Audio) │    │ Display + Tags  │             │              │
│  └─────────────┘    └─────────────────┘             │              │
└─────────────────────────────────────────────────────┼──────────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS API ROUTES                          │
├─────────────────────────────────────────────────────────────────────┤
│  /api/deepgram/token     → Generate temporary Deepgram auth token   │
│  /api/interview/evaluate → Send transcript to GPT-4o for scoring    │
│  /api/tts                → ElevenLabs TTS for adjudicator voice     │
└─────────────────────────────────────────────────────────────────────┘
                                                      │
              ┌───────────────────┬───────────────────┼───────────────┐
              ▼                   ▼                   ▼               ▼
    ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐
    │    DEEPGRAM     │  │   OPENAI     │  │  ELEVENLABS  │  │ SUPABASE  │
    │    Nova-3       │  │   GPT-4o     │  │  Conv AI     │  │ Postgres  │
    ├─────────────────┤  ├──────────────┤  ├──────────────┤  ├───────────┤
    │ • Real-time STT │  │ • Evaluate   │  │ • TTS voice  │  │ • Users   │
    │ • Diarization   │  │   answers    │  │ • Natural    │  │ • Sessions│
    │ • Speaker tags  │  │ • Generate   │  │   speech     │  │ • Progress│
    │   (user/spouse) │  │   questions  │  │ • Low latency│  │ • Transcr │
    │ • $0.0077/min   │  │ • ~$0.06/min │  │ • $0.08/min  │  │ • Free    │
    └─────────────────┘  └──────────────┘  └──────────────┘  └───────────┘
```

**Data Flow:**
1. User speaks → AudioWorklet captures PCM audio
2. Audio streams to Deepgram via WebSocket
3. Deepgram returns real-time transcript with speaker labels
4. When user finishes, transcript sent to GPT-4o
5. GPT-4o evaluates answer, generates adjudicator response
6. Response sent to ElevenLabs for TTS
7. Audio streamed back to browser and played

---

## Implementation Phases

### Phase 1: Project Foundation (Tasks 1-8)
- Next.js 16 project setup with TypeScript
- Supabase project creation and schema
- Authentication flow
- Basic UI layout with shadcn/ui

### Phase 2: Resource Hub (Tasks 9-14)
- MDX content setup for immigration guides
- Resource pages with SEO optimization
- Table of contents and navigation

### Phase 3: Voice Infrastructure (Tasks 15-22)
- Deepgram integration with WebSocket
- Audio capture with AudioWorklet
- Speaker diarization implementation
- TTS with OpenAI

### Phase 4: Interview Simulators (Tasks 23-32)
- Citizenship test flow
- Green card interview with 2-speaker detection
- LLM adjudicator logic
- Real-time feedback

### Phase 5: Progress Tracking (Tasks 33-38)
- Session recording to database
- Progress dashboard
- Analytics and scoring

### Phase 6: Polish & Deploy (Tasks 39-45)
- Error handling and reconnection
- Performance optimization
- Vercel deployment
- End-to-end testing

---

## Critical Files to Create

| File | Purpose |
|------|---------|
| `src/lib/deepgram/client.ts` | WebSocket connection manager for real-time STT |
| `src/hooks/useVoiceRecording.ts` | Audio capture and streaming hook |
| `src/hooks/useDiarization.ts` | Speaker identification hook |
| `src/lib/openai/adjudicator.ts` | AI interview logic and evaluation |
| `src/stores/interviewStore.ts` | Interview state management |
| `src/app/api/deepgram/token/route.ts` | Secure token generation |
| `src/app/interview/greencard/page.tsx` | Main interview UI |
| `src/components/interview/VoiceRecorder.tsx` | Audio recording component |

---

## Estimated Costs (MVP → Scale)

### Per-Minute Breakdown (Recommended Stack)
| Component | Cost/Min | Notes |
|-----------|----------|-------|
| Deepgram Nova-3 STT | $0.0077 | Real-time + diarization included |
| OpenAI GPT-4o | ~$0.06 | Adjudicator logic + evaluation |
| ElevenLabs TTS | $0.08 | Adjudicator voice output |
| **Total per minute** | **~$0.15** | Best quality/price ratio |

### Monthly Projections
| Scale | Minutes | Voice AI Cost | Supabase | Vercel | **Total** |
|-------|---------|---------------|----------|--------|-----------|
| MVP (beta) | 1,000 | $150 | Free | Free | **~$150** |
| Launch | 5,000 | $750 | Free | Free | **~$750** |
| Growth | 20,000 | $3,000 | $25 | $20 | **~$3,050** |
| Scale | 100,000 | $15,000 | $75 | $150 | **~$15,225** |

### Alternative: OpenAI Realtime (Simpler, 2x Cost)
| Scale | Minutes | Cost |
|-------|---------|------|
| MVP | 1,000 | $300 |
| Launch | 5,000 | $1,500 |
| Growth | 20,000 | $6,000 |

*OpenAI Realtime is simpler to implement but ~2x the cost of hybrid approach*

---

## Task List

### Task 1: Initialize Next.js 16 Project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`

**Step 1: Create Next.js 16 project**
```bash
npx create-next-app@latest immigreat --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
cd immigreat
```
Note: Next.js 16 uses Turbopack by default and includes Tailwind v4

**Step 2: Verify project structure**
```bash
ls -la src/app
```
Expected: `layout.tsx`, `page.tsx`, `globals.css`

**Step 3: Verify Tailwind v4 CSS-first setup**
Check `src/app/globals.css` contains:
```css
@import "tailwindcss";
```
(Tailwind v4 uses single CSS import, no config file needed)

**Step 4: Install core dependencies**
```bash
npm install @supabase/supabase-js @supabase/ssr zustand @deepgram/sdk openai
npm install -D @types/node
```

**Step 5: Run dev server to verify**
```bash
npm run dev
```
Expected: Server running at http://localhost:3000 (Turbopack enabled by default)

**Step 6: Commit**
```bash
git init
git add .
git commit -m "chore: initialize Next.js 16 project with TypeScript, Tailwind v4, and Turbopack"
```

---

### Task 2: Setup shadcn/ui with Tailwind v4

**Files:**
- Modify: `src/app/globals.css` (add theme variables)
- Create: `src/components/ui/button.tsx`
- Create: `src/lib/utils.ts`
- Create: `components.json`

**Step 1: Initialize shadcn/ui**
```bash
npx shadcn@latest init
```
Select: New York style, Slate base color, CSS variables: yes
Note: shadcn now auto-detects Tailwind v4 and configures CSS-first theming

**Step 2: Verify CSS theme variables added to globals.css**
Check that `src/app/globals.css` contains `@theme` block with CSS custom properties:
```css
@import "tailwindcss";

@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  /* ... more theme variables */
}
```

**Step 3: Add essential components**
```bash
npx shadcn@latest add button card input label tabs avatar badge progress
```

**Step 4: Verify component installation**
```bash
ls src/components/ui
```
Expected: Multiple component files including `button.tsx`

**Step 5: Commit**
```bash
git add .
git commit -m "feat: add shadcn/ui component library with Tailwind v4 theming"
```

---

### Task 3: Create Supabase Project and Schema

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`
- Create: `.env.local`

**Step 1: Create migration file**
```bash
mkdir -p supabase/migrations
```

**Step 2: Write schema migration**

Create `supabase/migrations/001_initial_schema.sql`:
```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profile policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Practice sessions
create table public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  session_type text check (session_type in ('citizenship', 'greencard')) not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  score integer,
  total_questions integer,
  correct_answers integer,
  duration_seconds integer
);

alter table public.practice_sessions enable row level security;

create policy "Users can manage own sessions"
  on public.practice_sessions for all
  using (auth.uid() = user_id);

-- Session transcripts
create table public.session_transcripts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.practice_sessions(id) on delete cascade not null,
  speaker text check (speaker in ('adjudicator', 'user', 'spouse')) not null,
  content text not null,
  timestamp_ms integer,
  created_at timestamptz default now()
);

alter table public.session_transcripts enable row level security;

create policy "Users can manage own transcripts"
  on public.session_transcripts for all
  using (
    session_id in (
      select id from public.practice_sessions where user_id = auth.uid()
    )
  );

-- Questions bank
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  category text check (category in ('citizenship', 'greencard_user', 'greencard_spouse', 'greencard_couple')) not null,
  question_text text not null,
  expected_topics text[],
  difficulty text check (difficulty in ('easy', 'medium', 'hard')) default 'medium',
  source text,
  created_at timestamptz default now()
);

-- User progress tracking
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  times_seen integer default 0,
  times_correct integer default 0,
  last_seen_at timestamptz,
  unique(user_id, question_id)
);

alter table public.user_progress enable row level security;

create policy "Users can manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Step 3: Create environment file**

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DEEPGRAM_API_KEY=your_deepgram_key
OPENAI_API_KEY=your_openai_key
```

**Step 4: Commit (without .env.local)**
```bash
echo ".env.local" >> .gitignore
git add supabase/migrations .gitignore
git commit -m "feat: add Supabase schema with RLS policies"
```

---

### Task 4: Setup Supabase Client

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/types/database.ts`

**Step 1: Write failing test**

Create `tests/unit/supabase-client.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

describe('Supabase Client', () => {
  it('should export createBrowserClient function', async () => {
    const { createClient } = await import('@/lib/supabase/client');
    expect(typeof createClient).toBe('function');
  });
});
```

**Step 2: Install vitest**
```bash
npm install -D vitest @vitejs/plugin-react jsdom
```

**Step 3: Run test to verify it fails**
```bash
npx vitest run tests/unit/supabase-client.test.ts
```
Expected: FAIL

**Step 4: Create browser client**

Create `src/lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Step 5: Create server client**

Create `src/lib/supabase/server.ts`:
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  );
}
```

**Step 6: Create middleware helper**

Create `src/lib/supabase/middleware.ts`:
```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}
```

**Step 7: Create database types placeholder**

Create `src/types/database.ts`:
```typescript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
        };
        Update: {
          full_name?: string | null;
          email?: string | null;
          updated_at?: string;
        };
      };
      practice_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_type: 'citizenship' | 'greencard';
          started_at: string;
          completed_at: string | null;
          score: number | null;
          total_questions: number | null;
          correct_answers: number | null;
          duration_seconds: number | null;
        };
        Insert: {
          user_id: string;
          session_type: 'citizenship' | 'greencard';
        };
        Update: {
          completed_at?: string;
          score?: number;
          total_questions?: number;
          correct_answers?: number;
          duration_seconds?: number;
        };
      };
      session_transcripts: {
        Row: {
          id: string;
          session_id: string;
          speaker: 'adjudicator' | 'user' | 'spouse';
          content: string;
          timestamp_ms: number | null;
          created_at: string;
        };
        Insert: {
          session_id: string;
          speaker: 'adjudicator' | 'user' | 'spouse';
          content: string;
          timestamp_ms?: number;
        };
        Update: never;
      };
      questions: {
        Row: {
          id: string;
          category: 'citizenship' | 'greencard_user' | 'greencard_spouse' | 'greencard_couple';
          question_text: string;
          expected_topics: string[] | null;
          difficulty: 'easy' | 'medium' | 'hard';
          source: string | null;
          created_at: string;
        };
        Insert: {
          category: 'citizenship' | 'greencard_user' | 'greencard_spouse' | 'greencard_couple';
          question_text: string;
          expected_topics?: string[];
          difficulty?: 'easy' | 'medium' | 'hard';
          source?: string;
        };
        Update: never;
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          times_seen: number;
          times_correct: number;
          last_seen_at: string | null;
        };
        Insert: {
          user_id: string;
          question_id: string;
        };
        Update: {
          times_seen?: number;
          times_correct?: number;
          last_seen_at?: string;
        };
      };
    };
  };
};
```

**Step 8: Run test to verify it passes**
```bash
npx vitest run tests/unit/supabase-client.test.ts
```
Expected: PASS

**Step 9: Commit**
```bash
git add .
git commit -m "feat: add Supabase client configuration with TypeScript types"
```

---

*[Tasks 5-45 continue in same format with bite-sized steps for:]*
- *Task 5-8: Auth pages and middleware*
- *Task 9-14: Resource hub with MDX*
- *Task 15-22: Deepgram voice infrastructure*
- *Task 23-32: Interview simulators*
- *Task 33-38: Progress tracking*
- *Task 39-45: Polish and deployment*

---

## Key Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Deepgram
DEEPGRAM_API_KEY=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Next Steps After Plan Approval

1. Create Supabase project at https://supabase.com
2. Create Deepgram account at https://deepgram.com (requires upgrade for real-time)
3. Have OpenAI API key ready
4. Execute plan using subagent-driven-development

---

**Plan complete. Ready for execution.**
