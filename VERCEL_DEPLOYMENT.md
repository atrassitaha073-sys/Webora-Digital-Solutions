# 🚀 Webora Digital Solutions - Vercel Deployment Guide

## Configuration pour Vercel

Ce projet est configuré pour déployer sur Vercel avec:
- Express.js backend
- Vite React frontend
- OpenRouter + Groq chatbot
- Resend email service

## Variables d'environnement requises

Ajoute ces variables dans Vercel Project Settings → Environment Variables:

```
RESEND_API_KEY=re_eAoxkBkf_53QoDmB7QENTB5ySDrEXfidW
OPENROUTER_API_KEY=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
GROQ_API_KEY=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
DATABASE_URL=postgresql://...  (optionnel)
```

## Déployer sur Vercel

### Option 1: Via Git (Recommandé)
1. Pousse ton code sur GitHub
2. Connecte le repo à Vercel
3. Vercel va détecter la config et builder automatiquement

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

## Fichiers de configuration

- `vercel.json` - Configuration Vercel
- `.vercelignore` - Fichiers à exclure du build
- `script/build.ts` - Script de build custom

## Notes importantes

- Le port est automatiquement défini par Vercel (PORT env var)
- Les API routes sont servies depuis `/api/*`
- Le frontend static est servi depuis `/dist`
- Tous les fichiers `.env` sont ignorés (utilise Vercel Environment Variables)

## Troubleshooting

Si ça ne marche pas:
1. Vérifies que toutes les env vars sont définies
2. Regarde les logs Vercel: `vercel logs`
3. Teste localement: `npm run build && npm start`
