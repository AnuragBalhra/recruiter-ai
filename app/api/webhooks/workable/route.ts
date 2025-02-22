import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";
import { handleWorkableWebhooks } from "./workableWebhookService";

export async function POST(request: Request) { 
    const data = await request.json();
    const body = await handleWorkableWebhooks(data)
    return NextResponse.json(body);
}