<h1 align="center">MentorIA 📚🤖</h1>
<p align="center">
  <em>Mobile-first, AI-powered mentor that learns from <strong>your</strong> study material.</em><br>
  <code>PWA · React · Tailwind · FastAPI · Supabase · LangChain · GPT-4o / Mixtral</code>
</p>
<p align="center">
  <a href="https://github.com/mentor-ia/mentor-ia/actions/workflows/ci.yml">
  </a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

## ✨ Features (MVP)
- Upload **PDFs, images, YouTube links** – all languages, Spanish answers.
- Chat with a **RAG-powered tutor** that cites your own notes.
- **Flash-cards** & **5-question quizzes** generated on-the-fly.
- Works offline as a Progressive Web App; installs to home screen in two taps.
- WhatsApp share-link virality loop.

## 🏗️ Tech Stack
| Front-end | Back-end | AI / Data |
|-----------|----------|-----------|
| React + Vite + TypeScript | FastAPI (Python 3.12) on Fly.io | GPT-4o & Mixtral-8x22B via LangChain |
| TailwindCSS | Supabase Postgres + Storage | Chroma vector DB |
| Workbox service-worker | Redis Streams (Upstash) | OpenAI text-embedding-3-small |
