import { GoogleGenAI } from "@google/genai";

export async function POST(request, { params }) {
  const { msg } = await request.json();
  const ai = new GoogleGenAI({});

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain ${msg} in a concise and clear manner. Give notes, examples, and a short quiz at the end to test understanding.`,
    });

    return Response.json({ message: response.text });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
