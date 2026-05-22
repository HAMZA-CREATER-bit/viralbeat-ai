import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { niche, country, language, idea } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const promptMessage = `
      You are an expert AI Music Producer and YouTube SEO expert.
      Generate a viral music package based on these parameters:
      - Niche Category: ${niche}
      - Target Country Audience: ${country}
      - Output Language/Script: ${language}
      - User's Central Song Idea: ${idea}

      Provide your response in raw JSON text strictly adhering to the following structure format:
      {
        "sunoPrompt": "Provide a precise Suno AI prompt under 200 characters containing style, instruments, and tempo suitable for the genre.",
        "title1": "Provide a high CTR YouTube title based on the idea.",
        "title2": "Provide a second viral YouTube title suggestion.",
        "lyrics": "Provide full complete song lyrics structured with proper markers like [Verse 1] and [Chorus] inside this field.",
        "tags": "Provide 5 to 7 highly searched tags separated by spaces starting with hashes."
      }
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptMessage }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Google Server Side Error:", data.error.message);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const jsonOutput = JSON.parse(data.candidates[0].content.parts[0].text.trim());
    return NextResponse.json(jsonOutput);

  } catch (error) {
    console.error("Advanced Diagnostic Logs:", error);
    return NextResponse.json({ error: "AI Parsing Error. Resetting system configuration." }, { status: 500 });
  }
}