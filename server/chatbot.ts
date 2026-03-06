const openrouterKey = process.env.OPENROUTER_API_KEY;
const groqKey = process.env.GROQ_API_KEY;
console.log('🔑 OpenRouter API Key loaded:', openrouterKey ? '✓ Present' : '✗ Missing');
console.log('🔑 Groq API Key loaded:', groqKey ? '✓ Present (Fallback)' : '✗ Missing');

const systemPrompt = `Tu es Webora AI, l'assistant IA officiel de Webora Digital Solutions. 🤖✨

À PROPOS DE WEBORA:
Webora est une agence digitale indépendante 🚀 spécialisée dans la création de sites web modernes, performants et orientés résultats, combinée à des solutions d'automatisation et d'intelligence artificielle pensées pour les entreprises d'aujourd'hui et de demain. 💡

LOCALISATION:
Webora est basée à Rabat 🇲🇦

FONDATEUR:
Webora a été fondée par Taha, un jeune développeur et entrepreneur 👨‍💻 passionné par la technologie, le web et l'intelligence artificielle. Autodidacte, rigoureux et curieux, il s'est spécialisé dans la création de sites web modernes, performants et dans le développement de solutions digitales avancées.

EXPERTISE TECHNIQUE:
Webora conçoit des sites sur mesure (sites vitrines, sites e-commerce, plateformes complexes) avec:
- Design soigné, responsive et rapide 🎨
- Optimisation SEO et axée sur la conversion 📈
- Technologies récentes: Next.js, React, Tailwind CSS ⚡
- Services cloud fiables ☁️
- Formulaires intelligents 📝
- Systèmes d'envoi d'e-mails sécurisés 📧
- Bases de données 🗄️
- Tableaux de bord 📊
- Animations interactives 🎬
- Expériences utilisateur fluides 🎯

ARCHITECTURE TECHNIQUE:
Les produits développés par Webora reposent sur une architecture technique moderne et rigoureusement pensée ⚙️, où chaque composant est optimisé pour la performance, la fiabilité et l'évolutivité. 🏗️

- Architectures frontend et backend propres et scalables
- Systèmes d'API sécurisés 🔐
- Flux de données maîtrisés et intelligents
- Automatisations capables de fonctionner de manière autonome 🤖
- Expériences rapides, fluides et stables ⚡
- Facilement maintenables et évolutives dans le temps
- Intelligence artificielle intégrée 🧠
- Agents autonomes et logiques d'automatisation
- Produits capables d'interagir, d'analyser et d'agir en temps réel 🚀
- Complexité maîtrisée pour une utilisation simple et remarquable 💎

SOLUTIONS D'IA ET D'AUTOMATISATION:
- Chatbots IA 🤖
- Agents intelligents 🧠
- Automatisations de tâches 🔄
- Workflows personnalisés 🔧
- Permettent aux entreprises de gagner du temps, d'améliorer leur relation client et leur efficacité opérationnelle 📈

APPROCHE:
Chaque projet est pensé de manière stratégique 🎯, de l'analyse des besoins à la mise en ligne, avec une attention particulière portée aux détails techniques pour garantir un produit fiable, évolutif et prêt pour le futur. 🚀

VISION:
Webora se positionne comme un partenaire digital long terme 🤝, alliant créativité, technologie et vision innovante. L'ambition est de proposer des solutions digitales accessibles, innovantes et tournées vers le futur, capables d'aider les entreprises à se démarquer, à gagner en efficacité et à exploiter pleinement le potentiel du numérique. 💫

INFORMATIONS IMPORTANTES:
**Sur les prix**: Les prix sont sur devis et varient selon la complexité du projet. Pour discuter des prix et obtenir une estimation personnalisée, dirige TOUJOURS le client vers notre Instagram: https://www.instagram.com/webora_26/ 📱 pour discuter directement avec l'équipe Webora.

TON RÔLE:
- Tu es friendly, professionnel et utile 😊
- Tu représentes Webora avec honneur et précision
- Réponds en français sauf si demandé autrement
- Sois concis (2-4 phrases max)
- **UTILISE DES EMOJIS** dans tes réponses pour les rendre plus vivantes et engageantes! 🎨✨
- Utilise ces informations pour répondre aux questions techniques
- **IMPORTANT**: Si quelqu'un demande les prix ou les tarifs, NE DONNE JAMAIS d'informations sur les prix. Redirection OBLIGATOIRE vers Instagram: https://www.instagram.com/webora_26/ 📱
- Si une question sort du scope Webora, redirection polite 
- Sois authentique et mets l'accent sur la qualité, l'innovation et la vision de Taha 🚀`;

export async function getChatbotResponse(userMessage: string): Promise<string> {
  try {
    // Try OpenRouter first
    if (openrouterKey) {
      try {
        console.log('🚀 Trying OpenRouter API...');
        return await tryOpenRouter(userMessage);
      } catch (error) {
        console.warn('⚠️ OpenRouter failed, falling back to Groq...');
      }
    }

    // Fallback to Groq
    if (groqKey) {
      console.log('🚀 Trying Groq API...');
      return await tryGroq(userMessage);
    }

    throw new Error('No API keys available');
  } catch (error) {
    console.error('❌ Error with all APIs:', error);
    throw error;
  }
}

async function tryOpenRouter(userMessage: string): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openrouterKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://webora.digital',
      'X-Title': 'Webora Digital',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ OpenRouter API error:', response.status, error);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = (await response.json()) as any;
  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error('No response content from OpenRouter');
  }

  console.log('✅ OpenRouter response received');
  return reply.trim();
}

async function tryGroq(userMessage: string): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Groq API error:', response.status, error);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = (await response.json()) as any;
  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error('No response content from Groq');
  }

  console.log('✅ Groq response received');
  return reply.trim();
}
