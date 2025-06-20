![Diseño sin título (27)](https://github.com/user-attachments/assets/9a3017bc-4a77-4abc-9a8d-db046bc935d4)
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

## 🏗️ Tech Stack
| Front-end | Back-end | AI / Data |
|-----------|----------|-----------|
| React + Vite + TypeScript | FastAPI (Python 3.12) on Fly.io | GPT-4o & Mixtral-8x22B via LangChain |
| TailwindCSS | Supabase Postgres + Storage | Chroma vector DB |
| Workbox service-worker | Redis Streams (Upstash) | OpenAI text-embedding-3-small |
