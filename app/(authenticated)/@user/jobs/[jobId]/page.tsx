import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { notFound, redirect } from 'next/navigation';
import { getJobsDetailsFromATS } from '@/app/server/integration_actions';
import JobApplications from "./job-applications";

export default async function JobDetailsPage({ params: { jobId } }:
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
      <InternalHeaderBar title={job?.title ?? `Job #${job?._id}`} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
        <JobApplications jobId={jobId} />
      </main>
    </div>
  )
}