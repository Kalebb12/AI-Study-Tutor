# AI Study Tutor

AI Study Tutor is a web-based learning assistant that helps students **understand topics, practice with examples, and test their knowledge** through AI-powered quizzes.  
Built with **Next.js**, **TailwindCSS** (with shadcn/ui), and **Google Gemini**, it delivers an interactive, chat-style study experience.

---

## Features

- **Interactive Tutor** – Ask for any topic; get a clear, step-by-step explanation.
- **Examples + Quizzes** – Each lesson includes worked examples and a short quiz.
- **Chat Experience** – Simple conversational UI for back-and-forth learning.
- **Streaming Responses** – See answers as they’re generated (no long waits).
- **File Upload (planned)** – Teach from PDFs, slides, or images.

---
## Environmental Variables
GEMINI_API_KEY=your_google_ai_studio_key_here


## Tech Stack

- Next.js (App Router)
- TailwindCSS + shadcn/ui
- Google Gemini API (`@google/generative-ai`)
- `react-markdown` + `remark-gfm` + `remark-math` + `rehype-katex` (render Markdown & math)
- Optional: `rehype-highlight` for code blocks

---

## Getting Started

### 1) Clone & install

```bash
git clone https://github.com/your-username/ai-study-tutor.git
cd ai-study-tutor
npm install
