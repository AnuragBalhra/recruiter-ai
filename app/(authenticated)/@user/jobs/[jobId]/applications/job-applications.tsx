"use client";
import { useState } from "react";
import DashboardBanner from "@/app/components/dashboard-banner"
import { getMyAgents, addAgent } from '@/app/server/user_actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { consoleLog } from "@/utils/logging-utils";
import toast from "react-hot-toast";
import { Plus } from 'lucide-react';
import { getJobApplicationsByIntegrationType } from '@/app/server/integration_actions';
import { format, render, cancel, register } from 'timeago.js';
import { Skeleton } from '@mui/material';
import ApplicationFeedbackModal from "./application-feedback-modal";

export default function JobApplications({jobId}: {jobId: string}) {
  const queryClient = useQueryClient()
  const [application, setApplication] = useState();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { isPending, data  } = useQuery({
    queryKey: ['workable_job_applications'],
    queryFn: () => getJobApplicationsByIntegrationType({ integrationType: 'workable', jobId }),
  });
  const applications = data?.candidates ?? [];
  const getWorkableIntegrationSkeleton = () => {
    return <div className="flex flex-col gap-5 justify-center items-center p-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-center items-center ml-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-60 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-40 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
        </div>
        <div className="hidden lg:flex lg:flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-40 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
        </div>
        <div className="hidden xl:flex xl:flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-60 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
        </div>
      </div>
    </div>
  };

  if (isPending) { 
    return getWorkableIntegrationSkeleton();
  }

  console.log("found my applications: ", data);
  return (    
    <div>
      <div className="my-5 text-2xl font-bold text-gray-800 dark:text-white">
        Job Applications
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {applications?.map((application: any, index: number) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{application?.name}</CardTitle>
                <CardDescription className="text-xs">{application?.headline}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5">
                <p className="text-xs">Applied {format(application?.created_at, 'en-US')}</p>
                <Button variant="outline" onClick={() => {
                  setApplication(application?.id)
                  setFeedbackOpen(true);
                }}>
                  View Feedback
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {feedbackOpen && <ApplicationFeedbackModal applicationId={application} jobId={jobId} open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />}
      </div>
    </div>
  )
}