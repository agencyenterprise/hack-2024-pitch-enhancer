import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("OpenAI API key is not configured");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function transcribeAudio(formData: FormData) {
  const file = formData.get("file") as File;

  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
  });

  return transcription;
}

export async function generatePresentationTips(transcription: string) {
  const prompt = `Here is a presentation script: "${transcription}".
    You will provide instructions on how to make the presentation better, make sure you pay attention topics
    that the may not be clear for the audience, topics that the speaker may have spend to much time on, or 
    topics that the speaker may have spend little time on.

    The response should be a HTML list of tips.
  `;
  let retries = 0;
  while (retries < 3) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("No content received from OpenAI");
      }
      // Remove markdown code block syntax if present
      const cleanContent = content
        .replace(/^```html\n?/, "") // Remove opening ```html
        .replace(/\n?```$/, ""); // Remove closing ```

      if (cleanContent.startsWith("<ul>")) {
        return cleanContent;
      }

      throw new Error("Invalid response format from OpenAI");
    } catch (error) {
      console.error(error);
      retries += 1;
    }
  }

  throw new Error("Failed to generate presentation tips");
}

export async function generateOptimizedScript(
  tips: string,
  originalTranscription: string
) {
  const prompt = `Here is an original presentation script: "${originalTranscription}"
    
    And here are the improvement tips: "${tips}"
    
    Please rewrite the presentation as an optimized 3-minute pitch script, incorporating the improvement suggestions.
    Focus on clarity, conciseness, and maintaining a natural speaking flow.
    The script should be structured with clear introduction, key points, and conclusion.
    
    Format the response as plain text, optimized for speaking in 3 minutes (approximately 450 words).
  `;

  let retries = 0;
  while (retries < 3) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4", // Using GPT-4 for better script generation
        messages: [{ role: "user", content: prompt }],
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("No content received from OpenAI");
      }

      return content;
    } catch (error) {
      console.error(error);
      retries += 1;
    }
  }

  throw new Error("Failed to generate optimized script");
}
