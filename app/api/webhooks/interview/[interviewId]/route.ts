import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";
import Interview from "@/app/models/interviews/interview";

export async function POST(request: Request, { params }: any) { 
    const data = await request.json();
    const interviewId = params?.interviewId;
    const evaluation = data?.evaluation;
    await dbConnect();

    const response = await Interview.updateOne({ status: { $ne: "completed" } }, {
        $set: {
            evaluation,
            status: "completed",
        }
    });
    return NextResponse.json(JSON.parse(JSON.stringify(response)));
}