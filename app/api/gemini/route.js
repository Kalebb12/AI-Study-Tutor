import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request, { params }) {
  const { msg } = await request.json();

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // const result = await model.generateContentStream({
    //   contents: [{ role: "user", parts: [{ text: `Explain ${msg} in a concise and clear manner. Give notes, examples, and a short quiz at the end to test understanding.` }] }],
    // });

    const result = await model.generateContentStream(msg,{
      
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
