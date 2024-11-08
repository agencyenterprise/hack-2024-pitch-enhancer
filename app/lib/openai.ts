const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("OpenAI API key is not configured");
}

export async function transcribeAudio(formData: FormData) {
  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Transcription failed");
  }

  return response.json();
}

export async function generatePresentationTips(transcription: string) {
  const prompt = `Here is a presentation script: "${transcription}".
    You will provide instructions on how to make the presentation better, make sure you pay attention topics
    that the may not be clear for the audience, topics that the speaker may have spend to much time on, or 
    topics that the speaker may have spend little time on.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4", // Fixed the model name from "gpt-4o-mini"
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate presentation tips");
  }

  return response.json();
}
