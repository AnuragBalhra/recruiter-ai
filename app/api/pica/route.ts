import dbConnect from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const payload = await req.json();
    console.log("payload received in post req: ", payload);

    // try {
    //     const { message } = req.body;

    //     const messages: CoreMessage[] = [{
    //         role: "user",
    //         content: message
    //     }];

    //     const pica = new Pica(process.env.PICA_SECRET_KEY as string);
    //     const systemPrompt = await pica.generateSystemPrompt();
    //     const stream = await streamText({
    //         model: openai("gpt-4o"),
    //         system: systemPrompt,
    //         tools: { ...pica.oneTool },
    //         messages,
    //         maxSteps: 10,
    //     });

    //     res.setHeader("Content-Type", "text/event-stream");
    //     res.setHeader("Cache-Control", "no-cache");
    //     res.setHeader("Connection", "keep-alive");

    //     if (!stream.textStream) {
    //         throw new Error("Stream does not support text streaming.");
    //     }

    //     for await (const chunk of stream.textStream) {
    //         res.write(`data: ${chunk}\n\n`);
    //     }
    //     res.end();

    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "An error occurred while processing your request." });
    // }
    return NextResponse.json({ status: "success", "message": "Healthcheck complete!", payload});
}
