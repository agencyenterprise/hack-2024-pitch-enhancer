import { NextRequest, NextResponse } from "next/server";
import {
  transcribeAudio,
  generatePresentationTips,
  generateOptimizedScript,
  generatePitchScore,
} from "../../lib/openai";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as string;

    switch (type) {
      case "transcribe":
        const transcriptionData = await transcribeAudio(formData);
        return NextResponse.json(transcriptionData);

      case "tips":
        const transcription = formData.get("transcription") as string;
        const tipsData = await generatePresentationTips(transcription);
        return NextResponse.json(tipsData);

      case "optimize":
        const originalScript = formData.get("transcription") as string;
        const tips = formData.get("tips") as string;
        const optimizedScript = await generateOptimizedScript(
          tips,
          originalScript
        );
        return NextResponse.json({ optimizedScript });

      case "score":
        const scoreTranscription = formData.get("transcription") as string;
        const scoreData = await generatePitchScore(scoreTranscription);
        return NextResponse.json({ scores: scoreData });

      default:
        return NextResponse.json(
          { error: "Invalid request type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
