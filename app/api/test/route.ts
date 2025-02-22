import dbConnect from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const payload = req.json();
    console.log("payload received in post req: ", payload);
    
    return NextResponse.json({ status: "success", "message": "Healthcheck complete!", payload});
}
