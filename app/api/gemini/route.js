import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request, { params }) {
  const formData = await request.formData();
  const chatString = formData.get("chat");
  const chat = JSON.parse(chatString || "[]");
  const msg = formData.get("message");
  const file = formData.get("file");

  const inputs = [];
  const history = chat
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))
    .slice(-12); // Limit to last 12 messages to manage context length

  if (msg) {
    inputs.push({
      role: "user",
      parts: [{ text: msg }],
    });
  }
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    inputs.push({
      role: "user",
      parts: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64,
          },
        },
      ],
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI study tutor. 
        Teach step by step, give examples, and ask short questions to check understanding. 
        Stay conversational and continue from previous context.`,
            },
          ],
        },
        ...history,
        ...inputs,
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ message: `Something went wrong: ${error.message}` }),
      { status: 500 }
    );
  }
}
