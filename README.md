# Webora Digital Solutions

Professional agency website with AI chatbot, email system, and multi-language support.

## Features

- 🤖 **AI ChatBot** - OpenRouter + Groq fallback
- 📧 **Email System** - Resend API integration
- 🌐 **Multi-language** - FR, EN, AR, ES, DE
- 💬 **Text Selection Query** - Context-aware AI requests
- 🎤 **Voice Input** - Speech recognition support
- 💰 **Pricing Section** - Service packages with CTAs

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Required environment variables:
- `RESEND_API_KEY` - [Get from Resend](https://resend.com/api-keys)
- `OPENROUTER_API_KEY` - [Get from OpenRouter](https://openrouter.ai/keys)
- `GROQ_API_KEY` - [Get from Groq](https://console.groq.com/keys)
- `DATABASE_URL` - PostgreSQL connection string

### 3. Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 4. Build

```bash
npm run build
```

## Deployment

### Vercel

1. Push to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import from GitHub
4. Add environment variables in settings
5. Deploy

## Security

- ✅ API keys stored in `.env` (never committed)
- ✅ `.env.example` contains template values only
- ✅ `.gitignore` excludes sensitive files
- ✅ Use environment variables for all secrets

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and utilities
├── vercel.json      # Vercel deployment config
└── .env.example     # Environment template
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/chatbot` - Send message to AI chatbot

## Author

Webora Digital Solutions - Rabat, Morocco 🇲🇦
