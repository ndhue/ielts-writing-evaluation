const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

function buildPrompt(keywords = []) {
  return `
Generate 1 IELTS Task 2 topic based on:
- Keywords: ${keywords.join(', ')}
Return a valid JSON with:
- "topic": main topic,
- "outline": 2-3 supporting ideas.
Example JSON:
{
  "topic": "Some topic",
  "outline": ["Idea 1", "Idea 2"]
}
  `.trim();
}

async function generateTopicsFromKeywords({keywords }, retries = 3) {
  const prompt = buildPrompt(keywords);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", 
      messages: [
        { role: "system", content: "You generate IELTS Writing Task 2 topics." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });
    const content = response.choices[0].message.content;
    const cleanedContent = content.replace(/```json\n|\n```/g, '').trim();
    try {
      const parsedContent = JSON.parse(cleanedContent);
      return parsedContent;
    } catch (e) {
      console.error("Không đọc được phản hồi từ GPT:", cleanedContent);
      throw new Error("GPT response is not valid JSON");
    }

  } catch (error) {
    if (error.name === 'RateLimitError' && retries > 0) {
      console.warn(`Rate limit exceeded. Retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateTopicsFromKeywords({ type, category, keywords }, retries - 1);
    } else {
      console.error("Generate topics error:", error.message || error);
      throw error;
    }
  }
}
module.exports = { generateTopicsFromKeywords };
