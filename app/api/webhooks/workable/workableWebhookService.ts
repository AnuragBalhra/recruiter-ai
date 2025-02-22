"use server";
import dbConnect from "@/lib/db-connect";
import Candidate from "@/app/models/candidates/candidate";
import { NextResponse } from "next/server";

export async function handleWorkableWebhooks(payload: any) {
    await dbConnect();
    console.log("payload in workable webhook: ", payload);

    const data = payload?.data;
    if (data?.evenet_type === "candidate_created") {
        const candidate = await Candidate.create({
            workable_id: data?.id,
            name: data?.name,
            job: data?.job,
            email: data?.email,
            stage: data?.stage
        });
        return NextResponse.json(candidate);
    }
    
    return {
        message: "unconfigured webhook", 
        webhook_name: "Unknown",
    }
}
