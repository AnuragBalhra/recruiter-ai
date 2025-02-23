"use server";
import dbConnect from "@/lib/db-connect";
import Candidate from "@/app/models/candidates/candidate";
import Interview from "@/app/models/interviews/interview";
import { NextResponse } from "next/server";

export async function handleWorkableWebhooks(payload: any) {
    await dbConnect();
    console.log("payload in workable webhook: ", payload);

    const data = payload?.data;
    if (payload?.event_type === "candidate_created") {
        const candidate = await Candidate.create({
            workable_id: data?.id,
            name: data?.name,
            job: data?.job,
            email: data?.email,
            stage: data?.stage
        });
        const interview = await Interview.create({
            job_id: data?.job?.shortcode,
            candidate_id: data?.id,
        });
        const candidateObj = JSON.parse(JSON.stringify(candidate));
        const interviewObj = JSON.parse(JSON.stringify(interview));
        return NextResponse.json({ interview: interviewObj, candidate: candidateObj});
    }
    
    return {
        message: "unconfigured webhook", 
        webhook_name: "Unknown",
    }
}
