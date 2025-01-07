import OpenAI from 'openai';
import { type Media } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const fallbackRecommendations = {
  book: [
    { type: 'book', title: 'Le Petit Prince', category: 'Fiction', explanation: 'Un classique intemporel de la littérature française' },
    { type: 'book', title: '1984', category: 'Science-Fiction', explanation: 'Une œuvre majeure de la science-fiction' },
    { type: 'book', title: 'L\'Étranger', category: 'Littérature', explanation: 'Un chef-d\'œuvre d\'Albert Camus' }
  ],
  video: [
    { type: 'video', title: 'Les Temps Modernes', category: 'Cinéma Classique', explanation: 'Un film emblématique de Charlie Chaplin' },
    { type: 'video', title: 'La La Land', category: 'Comédie Musicale', explanation: 'Une célébration moderne du cinéma musical' },
    { type: 'video', title: 'Inception', category: 'Science-Fiction', explanation: 'Un film innovant sur les rêves et la réalité' }
  ],
  music: [
    { type: 'music', title: 'La Symphonie n°9', category: 'Classique', explanation: 'Le chef-d\'œuvre de Beethoven' },
    { type: 'music', title: 'Kind of Blue', category: 'Jazz', explanation: 'L\'album légendaire de Miles Davis' },
    { type: 'music', title: 'Thriller', category: 'Pop', explanation: 'L\'album emblématique de Michael Jackson' }
  ]
};

export async function getRecommendations(userHistory: Media[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a media recommendation expert. Provide recommendations in JSON format with type, title, category, and explanation fields."
      }, {
        role: "user",
        content: `Based on these items: ${userHistory.map(item => 
          `${item.type}: "${item.title}" (${item.category})`).join(', ')}. 
          Suggest 3 similar items. Return only a JSON array.`
      }]
    });

    const suggestions = JSON.parse(completion.choices[0].message.content);
    return suggestions;
  } catch (error) {
    console.log('Using fallback recommendations due to API error:', error);
    
    const userTypes = new Set(userHistory.map(item => item.type));
    const recommendations = [];
    
    for (const type of userTypes) {
      if (fallbackRecommendations[type]) {
        recommendations.push(...fallbackRecommendations[type].slice(0, 1));
      }
    }

    while (recommendations.length < 3) {
      const types = Object.keys(fallbackRecommendations);
      const randomType = types[Math.floor(Math.random() * types.length)];
      const suggestions = fallbackRecommendations[randomType];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      if (!recommendations.find(r => r.title === randomSuggestion.title)) {
        recommendations.push(randomSuggestion);
      }
    }

    return recommendations;
  }
}
