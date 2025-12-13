# AI INFRASTRUCTURE MASTER PLAN
## Zero-Person Company Content & Operations Automation

**Date:** December 12, 2025
**Version:** 1.0 (Bleeding Edge)
**Classification:** Strategic Infrastructure Architecture
**Philosophy:** If a human has to do it more than once, automate it.

---

## Executive Summary

This document outlines the technical architecture for running Immigracious as a **true zero-person company** where AI agents autonomously create, publish, and optimize content across all channels. Human involvement is limited to:

1. **Strategic Direction** (Mathieu as President)
2. **Legal Credibility** (Ashwin as Featured Expert)
3. **Quality Assurance** (spot-checking, not producing)

**Target State:** 100+ pieces of content/week across 8+ channels with <5 hours/week human involvement.

---

## Part 1: Your Current Assets (Inventory)

### What You Already Have

| Asset | Status | Strategic Value |
|-------|--------|-----------------|
| **Self-hosted n8n** | Active | Workflow orchestration backbone - FREE |
| **Midjourney subscription** | Active | Unlimited slow generations - images at $0 marginal cost |
| **Hostinger account** | Active | Web hosting, potential for additional services |
| **ChatGPT subscription** | Assumed | GPT-4o, DALL-E 3, GPT-image-1 access |
| **Claude Code** | Active | AI development, MCP integration |

### What This Enables

Your existing stack provides:
- **$0 image generation** (Midjourney slow queue)
- **$0 workflow automation** (self-hosted n8n)
- **$0 hosting** (existing Hostinger)
- **Minimal AI costs** (ChatGPT subscription covers most LLM needs)

**This is already more than 99% of startups have.**

---

## Part 2: The December 2025 AI Tool Landscape

### 2.1 Video Generation (The New Frontier)

The video AI market exploded in the last 30 days. Here's the current state:

| Model | Release | Best For | Pricing | Native Audio |
|-------|---------|----------|---------|--------------|
| **Runway Gen 4.5** | Dec 1, 2025 | Cinematic quality, #1 on benchmarks | $15-95/mo | No |
| **Kling 2.6** | Dec 3, 2025 | Native audio sync, 30% cheaper | $0.35/5s via API | **YES** |
| **Sora 2** | Sep 30, 2025 | OpenAI ecosystem, 60s clips | $0.15-1.00/video (3rd party API) | YES |
| **Veo 3.1** | Oct 15, 2025 | Google ecosystem, Flow editing | Via fal.ai | No |
| **Pika 2.1** | Dec 2025 | Fast turbo mode, style control | Via fal.ai | No |

**Key Insight:** Kling 2.6's native audio is a game-changer. No more stitching audio in post.

### 2.2 Image Generation (Mature Market)

| Model | Best For | Pricing | API Available |
|-------|----------|---------|---------------|
| **Midjourney** (your sub) | Artistic, stylized | $0 (unlimited slow) | Via Legnext.ai, GoAPI |
| **Nano Banana Pro** | Photorealistic, editing | $0.05/img (API) | Yes - Gemini 3 powered |
| **GPT-image-1** | Integrated w/ ChatGPT | $0.011-0.25/img | Yes |
| **DALL-E 3** | General purpose | $0.04-0.12/img | Yes |
| **Flux 2** | Open source quality | Via fal.ai, Replicate | Yes |

**Your Strategy:** Use Midjourney (free) for hero images, GPT-image-1 mini ($0.005/img) for bulk social graphics.

### 2.3 Writing & Voice

| Tool | Purpose | Pricing |
|------|---------|---------|
| **Spiral (Every)** | Social content with taste | Subscription |
| **Claude Opus 4.5** | Long-form, strategy | Via API |
| **GPT-5.2** | Fast generation | $1.75/1M input tokens |
| **ElevenLabs** | Voice cloning, TTS | $0.08/min |
| **Deepgram Nova-3** | STT + diarization | $0.0077/min |

### 2.4 Orchestration & Automation

| Platform | Type | Pricing | Your Advantage |
|----------|------|---------|----------------|
| **n8n** (self-hosted) | Workflow automation | FREE | You have this |
| **CrewAI** | Multi-agent orchestration | Open source | Python-based |
| **fal.ai** | Fast inference API | $1.89/hr H100 | 600+ models |
| **RunPod** | Serverless GPU | Pay per second | ComfyUI hosting |
| **Replicate** | Model hosting | $0.019/run ComfyUI | Easy API |

---

## Part 3: The Autonomous Content Engine

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        IMMIGRACIOUS CONTENT ENGINE                          │
│                         (Zero Human Intervention)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐   │
│  │  TRIGGER LAYER  │     │  ORCHESTRATION   │     │  GENERATION LAYER │   │
│  │                 │     │                  │     │                   │   │
│  │ • Scheduled     │────▶│  n8n Workflows   │────▶│ • GPT-5/Claude    │   │
│  │ • RSS Feeds     │     │  CrewAI Agents   │     │ • Midjourney      │   │
│  │ • Social Listen │     │  MCP Servers     │     │ • Kling 2.6       │   │
│  │ • USCIS Updates │     │                  │     │ • ElevenLabs      │   │
│  └─────────────────┘     └──────────────────┘     └───────────────────┘   │
│           │                       │                        │               │
│           │                       │                        │               │
│           ▼                       ▼                        ▼               │
│  ┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐   │
│  │  QUALITY GATE   │     │   DISTRIBUTION   │     │    ANALYTICS      │   │
│  │                 │     │                  │     │                   │   │
│  │ • Brand voice   │────▶│ • YouTube        │────▶│ • Engagement      │   │
│  │ • Legal check   │     │ • TikTok         │     │ • Conversion      │   │
│  │ • Fact verify   │     │ • LinkedIn       │     │ • A/B Results     │   │
│  │                 │     │ • Newsletter     │     │ • Revenue         │   │
│  └─────────────────┘     └──────────────────┘     └───────────────────┘   │
│                                                             │               │
│                                                             │               │
│                    ┌────────────────────────────────────────┘               │
│                    │                                                        │
│                    ▼                                                        │
│           ┌──────────────────┐                                             │
│           │  FEEDBACK LOOP   │                                             │
│           │                  │                                             │
│           │ • What performed │                                             │
│           │ • Adjust prompts │                                             │
│           │ • Retrain styles │                                             │
│           └──────────────────┘                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 n8n Workflow Architecture

Your self-hosted n8n becomes the brain. Here are the core workflows:

#### Workflow 1: Daily Social Content Pipeline

```
Trigger: Cron (6 AM daily)
    │
    ▼
┌─────────────────┐
│ Fetch Content   │ ← Pull from content calendar (Google Sheets/Notion)
│ Topics Queue    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GPT-4o: Generate│ ← Create 5 social posts (LinkedIn, Twitter, etc.)
│ Social Copy     │   using brand voice prompt template
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Midjourney API  │ ← Generate matching images via GoAPI/Legnext
│ (via GoAPI)     │   Uses your unlimited slow queue
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Quality Check   │ ← Claude reviews for accuracy, tone, legal issues
│ (Claude API)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Buffer/Hypefury │ ← Schedule across platforms
│ API Post        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Log to Sheets   │ ← Track what was posted for analytics
└─────────────────┘
```

#### Workflow 2: Weekly Video Production

```
Trigger: Cron (Monday 9 AM)
    │
    ▼
┌─────────────────┐
│ Select Topic    │ ← From content calendar + trending topics
│ from Queue      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GPT-4o: Write   │ ← Generate full video script (60-90 sec)
│ Video Script    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Kling 2.6 API   │ ← Generate video WITH native audio
│ (via fal.ai)    │   Key advantage: no audio sync needed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ElevenLabs      │ ← Generate voiceover if needed
│ Voice Clone     │   (for explainer style)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Opus Clip       │ ← Auto-clip into 3-5 shorts
│ Integration     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Upload to       │ ← YouTube, TikTok, Instagram Reels
│ Platforms       │
└─────────────────┘
```

#### Workflow 3: Newsletter Automation

```
Trigger: Cron (Tuesday 5 AM)
    │
    ▼
┌─────────────────┐
│ Aggregate Week's│ ← Pull USCIS updates, immigration news, tips
│ Content Sources │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Claude Opus:    │ ← Use Spiral-style prompting for "taste"
│ Write Newsletter│   Every (Dan Shipper) format
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generate Header │ ← Nano Banana Pro for newsletter header image
│ Image           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Human Review    │ ← ONLY human touchpoint: 10 min review
│ (Optional)      │   Can be skipped once quality proven
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Beehiiv API     │ ← Send to subscriber list
│ Send            │
└─────────────────┘
```

### 3.3 MCP Cloud Architecture

You mentioned wanting to host MCP in the cloud for remote agent access. Here's how:

#### MCP Server Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUD MCP INFRASTRUCTURE                     │
│                      (Hosted on Hostinger VPS)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Supabase MCP │  │ Memory MCP   │  │ Exa Search   │         │
│  │              │  │              │  │ MCP          │         │
│  │ • Database   │  │ • Knowledge  │  │ • Web search │         │
│  │ • Auth       │  │   graph      │  │ • Research   │         │
│  │ • Storage    │  │ • Context    │  │              │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                 │                 │                  │
│         └────────────────┬┴─────────────────┘                  │
│                          │                                     │
│                          ▼                                     │
│              ┌───────────────────────┐                        │
│              │   MCP Gateway Server  │                        │
│              │   (Remote Protocol)   │                        │
│              │                       │                        │
│              │  • Auth via API keys  │                        │
│              │  • Rate limiting      │                        │
│              │  • Logging/audit      │                        │
│              └───────────┬───────────┘                        │
│                          │                                     │
└──────────────────────────┼─────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ Claude Code │ │ n8n Agents  │ │ Mobile App  │
    │ (Local Dev) │ │ (Workflows) │ │ (Future)    │
    └─────────────┘ └─────────────┘ └─────────────┘
```

**Implementation Path:**
1. Set up MCP gateway on Hostinger VPS
2. Use remote MCP server protocol (now supported)
3. Connect n8n workflows to MCP servers
4. Enable Claude Code to access remotely

**Reference:** https://modelcontextprotocol.io/docs/tutorials/use-remote-mcp-server

---

## Part 4: Complete Pricing Analysis

### 4.1 Scenario: 100 Content Pieces/Week

| Content Type | Quantity | Tool | Cost/Unit | Weekly Cost |
|--------------|----------|------|-----------|-------------|
| Social Images | 50 | Midjourney (your sub) | $0 | **$0** |
| Social Copy | 50 | GPT-4o | ~$0.002 | **$0.10** |
| Short Videos | 10 | Kling 2.6 (5s each) | $0.35 | **$3.50** |
| Long Videos | 2 | Kling 2.6 (30s each) | $2.10 | **$4.20** |
| Newsletter | 1 | Claude Opus | ~$0.50 | **$0.50** |
| Voiceovers | 5 min | ElevenLabs | $0.08/min | **$0.40** |
| Infographics | 10 | GPT-image-1 mini | $0.005 | **$0.05** |

**Weekly Total:** ~$8.75
**Monthly Total:** ~$35
**Annual Total:** ~$420

### 4.2 Fixed Costs

| Service | Monthly | Annual | Notes |
|---------|---------|--------|-------|
| n8n | $0 | $0 | Self-hosted |
| Hostinger | ~$10 | $120 | Existing |
| Midjourney | ~$30 | $360 | Existing subscription |
| ChatGPT Plus | $20 | $240 | Covers most needs |
| ElevenLabs | $22 | $264 | Creator tier |
| Buffer/Scheduling | $15 | $180 | Social scheduling |
| Beehiiv | $0 | $0 | Free tier to 2500 subs |
| Domain/Email | $10 | $120 | Existing |

**Fixed Monthly:** ~$107
**Fixed Annual:** ~$1,284

### 4.3 Total Cost of Autonomous Operation

| Category | Annual Cost |
|----------|-------------|
| Fixed Infrastructure | $1,284 |
| Variable (100 posts/week) | $420 |
| Buffer for API spikes | $300 |
| **Total Annual** | **$2,004** |

**Cost per content piece:** $0.38
**Compare to:** Agency rates ($50-500/piece), Freelancer ($20-100/piece)

**ROI:** If you make $10K/year from products, marketing cost is 20% of revenue.
At $100K/year, marketing cost drops to 2% of revenue.

---

## Part 5: Midjourney API Integration (Your Secret Weapon)

Your unlimited Midjourney slow queue is a massive advantage. Here's how to API-ify it:

### 5.1 Available Integrations

| Service | Method | n8n Compatible | Cost |
|---------|--------|----------------|------|
| **Legnext.ai** | Official API partner | Yes (HTTP) | Subscription |
| **GoAPI** | Discord bridge | Yes (HTTP) | Pay per use |
| **KIE.AI** | API wrapper | Yes (HTTP) | Credits |
| **Imagineapi.dev** | Self-hosted | Yes | Self-hosted |

### 5.2 n8n + Midjourney Workflow

```javascript
// n8n HTTP Request Node - Midjourney via GoAPI
{
  "method": "POST",
  "url": "https://api.goapi.ai/mj/v2/imagine",
  "headers": {
    "X-API-Key": "{{$credentials.goapi_key}}",
    "Content-Type": "application/json"
  },
  "body": {
    "prompt": "{{$node.GPT_Node.json.image_prompt}} --ar 16:9 --style raw",
    "process_mode": "slow",  // Uses your unlimited queue
    "webhook_url": "https://your-n8n.com/webhook/mj-callback"
  }
}
```

### 5.3 Image Generation Strategy

| Use Case | Tool | Rationale |
|----------|------|-----------|
| Hero images, thumbnails | Midjourney (slow) | Best quality, $0 cost |
| Social graphics (bulk) | GPT-image-1 mini | Fast, cheap ($0.005) |
| Infographics | Nano Banana Pro | Editing capability |
| Quick iterations | DALL-E 3 | Integrated in ChatGPT |

---

## Part 6: Agent Orchestration with CrewAI

For truly autonomous operation, implement CrewAI for multi-agent workflows:

### 6.1 Content Creation Crew

```python
from crewai import Agent, Task, Crew

# Define specialized agents
content_strategist = Agent(
    role='Content Strategist',
    goal='Plan engaging immigration content calendar',
    backstory='Expert in immigration topics and social media trends',
    llm='gpt-4o'
)

copywriter = Agent(
    role='Immigration Copywriter',
    goal='Write accurate, empathetic immigration content',
    backstory='Former immigration paralegal turned content creator',
    llm='claude-3-opus'
)

visual_director = Agent(
    role='Visual Director',
    goal='Create compelling visual concepts for content',
    backstory='Expert in creating infographics and thumbnails',
    tools=[midjourney_tool, dalle_tool]
)

quality_reviewer = Agent(
    role='Legal Accuracy Reviewer',
    goal='Ensure all content is legally accurate with proper disclaimers',
    backstory='Immigration law specialist focused on compliance',
    llm='claude-3-opus'
)

# Create the crew
content_crew = Crew(
    agents=[content_strategist, copywriter, visual_director, quality_reviewer],
    tasks=[plan_task, write_task, visualize_task, review_task],
    process='sequential'
)

# Run autonomously
result = content_crew.kickoff()
```

### 6.2 Integration with n8n

```
n8n Workflow:
    │
    ├── Trigger (Schedule/Webhook)
    │
    ├── HTTP Request → CrewAI API endpoint
    │   (Hosted on your Hostinger VPS)
    │
    ├── Wait for completion (webhook callback)
    │
    ├── Process outputs (text, image prompts)
    │
    ├── Generate images (Midjourney/DALL-E)
    │
    ├── Compile final content
    │
    └── Distribute to channels
```

---

## Part 7: The Fully Autonomous Week

### 7.1 What Runs Without You

| Day | Automated Process | Output |
|-----|-------------------|--------|
| **Monday** | Content planning crew runs | Week's content calendar |
| **Tuesday** | Newsletter generation + send | 1 newsletter to subscribers |
| **Wednesday** | Video production pipeline | 2 videos + 6 shorts |
| **Thursday** | Social batch generation | 15 social posts scheduled |
| **Friday** | Analytics collection + reporting | Performance dashboard |
| **Weekend** | Engagement automation | Auto-replies, community management |

### 7.2 What Requires You (5 hrs/week max)

| Task | Time | Frequency |
|------|------|-----------|
| Strategic review of analytics | 1 hr | Weekly |
| Spot-check content quality | 1 hr | Weekly |
| Approve major campaigns | 30 min | As needed |
| Ashwin coordination | 30 min | Monthly |
| System maintenance | 2 hr | Monthly |

### 7.3 What Ashwin Does (Tier 2-3)

| Task | Time | Output |
|------|------|--------|
| Quarterly content review | 90 min | Legal accuracy sign-off |
| Monthly video call | 60 min | Featured expert content |
| Email Q&A | 30 min/mo | Quick legal clarifications |

---

## Part 8: Implementation Roadmap

### Phase 1: First Dollar (TODAY - Next 7 Hours)

```
Hour 1-2: Gumroad setup, PDF upload
Hour 3-4: Reddit post (manual, high-touch)
Hour 5-7: Monitor, engage, iterate
```

### Phase 2: Basic Automation (Week 1-2)

```
□ Connect n8n to social platforms (Buffer API)
□ Set up Midjourney API integration (GoAPI)
□ Create first automated social workflow
□ Build content calendar in Notion/Sheets
□ Configure GPT-4o for brand voice
```

### Phase 3: Video Pipeline (Week 3-4)

```
□ Set up fal.ai account for Kling 2.6 access
□ Build video generation workflow in n8n
□ Configure ElevenLabs voice clone
□ Create Opus Clip integration for shorts
□ Test end-to-end video pipeline
```

### Phase 4: MCP Cloud (Month 2)

```
□ Deploy MCP gateway on Hostinger VPS
□ Configure remote MCP server access
□ Connect n8n workflows to MCP
□ Enable Claude Code remote access
□ Test multi-agent coordination
```

### Phase 5: Full Autonomy (Month 3)

```
□ Deploy CrewAI agents
□ Implement feedback loops
□ A/B testing automation
□ Revenue tracking integration
□ Scale to 100+ posts/week
```

---

## Part 9: Risk Mitigation

### 9.1 Technical Risks

| Risk | Mitigation |
|------|------------|
| API rate limits | Multiple provider fallbacks (Kling → Runway → Veo) |
| Quality degradation | Human spot-check weekly, quality scoring |
| Platform bans | Multi-channel distribution, avoid spam patterns |
| Cost overruns | Hard spending caps in API configs |

### 9.2 Legal Risks

| Risk | Mitigation |
|------|------------|
| Legal advice liability | Clear disclaimers on ALL content, Ashwin review |
| Copyright issues | Use only licensed/generated assets |
| Privacy violations | No PII in training data, user consent |
| Platform ToS | Stay within platform guidelines |

### 9.3 Business Risks

| Risk | Mitigation |
|------|------------|
| No product-market fit | First dollar test validates demand |
| Competitor entry | Speed to market, quality differentiation |
| Ashwin unavailable | Multiple tier options, backup experts |
| Tech obsolescence | Modular architecture, easy to swap providers |

---

## Part 10: The Unicorn Path

### 10.1 Revenue Milestones

| Phase | Revenue Target | Primary Products |
|-------|----------------|------------------|
| Genesis | $1-1,000 | PDF guides |
| Germination | $1K-10K | Course, premium guides |
| Sprouting | $10K-100K | Voice AI prep tool (MVP) |
| Rooting | $100K-1M | Voice AI subscriptions |
| Growing | $1M-10M | Enterprise/attorney tools |
| Flowering | $10M-100M | Full platform, API access |
| Bamboo Explosion | $100M-1B | Market dominance, expansion |

### 10.2 Content-to-Revenue Funnel

```
Free Content (Social, YouTube, Blog)
         │
         ▼ (Trust building)
Email Capture (Newsletter, Lead magnets)
         │
         ▼ (Nurturing)
Low-ticket Purchase ($9-49 guides)
         │
         ▼ (Validation)
Mid-ticket Purchase ($99-299 courses)
         │
         ▼ (Commitment)
High-ticket Subscription ($29-99/mo voice AI)
         │
         ▼ (Expansion)
Enterprise/API ($500-5000/mo)
```

---

## Appendix A: API Quick Reference

### Video Generation APIs

| Provider | Endpoint | Auth | n8n Node |
|----------|----------|------|----------|
| fal.ai (Kling) | `https://fal.run/fal-ai/kling-video` | Bearer token | HTTP Request |
| fal.ai (Pika) | `https://fal.run/fal-ai/pika/v2.1` | Bearer token | HTTP Request |
| fal.ai (Veo) | `https://fal.run/fal-ai/veo3` | Bearer token | HTTP Request |
| Runway | `https://api.runwayml.com/v1` | API key | HTTP Request |

### Image Generation APIs

| Provider | Endpoint | n8n Integration |
|----------|----------|-----------------|
| OpenAI | `https://api.openai.com/v1/images/generations` | Native node |
| GoAPI (MJ) | `https://api.goapi.ai/mj/v2/imagine` | HTTP Request |
| Replicate | `https://api.replicate.com/v1/predictions` | HTTP Request |

### Text/LLM APIs

| Provider | Best Model | n8n Integration |
|----------|------------|-----------------|
| OpenAI | GPT-4o, GPT-5.2 | Native node |
| Anthropic | Claude Opus 4.5 | HTTP Request |
| Google | Gemini 3 Pro | HTTP Request |

---

## Appendix B: n8n Workflow Templates

Available for import at: `research/n8n-workflows/`

1. `daily-social-content.json` - Daily social media automation
2. `weekly-newsletter.json` - Tuesday newsletter pipeline
3. `video-production.json` - Video generation workflow
4. `analytics-dashboard.json` - Performance tracking
5. `content-calendar-sync.json` - Notion/Sheets integration

---

## Appendix C: MCP Server Configurations

```json
// claude_desktop_config.json (for cloud MCP)
{
  "mcpServers": {
    "supabase-remote": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://your-mcp-gateway.com/supabase"]
    },
    "memory-remote": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://your-mcp-gateway.com/memory"]
    },
    "content-automation": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://your-mcp-gateway.com/content"]
    }
  }
}
```

---

*Document created by AI CSO using temporal metacognition protocol. All pricing and capabilities verified as of December 12, 2025. Subject to rapid change in this market.*

**Bottom Line:** You have the infrastructure for a fully autonomous content engine. The only question is execution speed. First dollar tonight proves the market. Everything else is scaling.
