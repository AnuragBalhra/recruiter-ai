import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';
import { useRouter } from "next/navigation";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { RadioGroup } from "@headlessui/react";
import { cx } from "@/lib/cx";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { notFound, redirect } from 'next/navigation';
import { getJobsDetailsFromATS } from '@/app/server/integration_actions';

export default async function AgentDetailsPage({ params: { jobId } }:
  { params: { jobId: string }}) {
  
  console.log("got job Id: ", jobId);
  const response = await getJobsDetailsFromATS({ integrationType: "workable", externalId: jobId });
  console.log("job details response from server action: ", response);
  if (response?.error) { 
    notFound();
  }
  const job = response;
  console.log("job from server action: ", job);

  return (
    <div className="flex flex-col w-full min-h-screen flex-1 ">
      <InternalHeaderBar title={job?.name ?? `Agent #${job?._id}`} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
        {/* <UserAgents /> */}
      </main>
    </div>
  )
}