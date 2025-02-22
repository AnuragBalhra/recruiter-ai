import dbConnect from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({status: "success", message: "Healthcheck complete!"});
}
