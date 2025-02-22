"use client";
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
import { getJobsByIntegrationType } from '@/app/server/integration_actions';
import { format, render, cancel, register } from 'timeago.js';

export default function UserJobs() {
  const queryClient = useQueryClient()
  const { isPending: workableIntegrationPending, data  } = useQuery({
    queryKey: ['workable_jobs'],
    queryFn: () => getJobsByIntegrationType({ integrationType: 'workable' }),
  });
  const jobs = data?.jobs ?? [];

  console.log("found my jobs: ", data);
  return (    
    <div>
      <div className="my-5 text-2xl font-bold text-gray-800 dark:text-white">
        My Jobs
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {jobs?.map((job: any, index: number) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{job?.title}</CardTitle>
                <CardDescription className="text-xs">{job?.location?.location_str}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5">
                <p className="text-xs">Created {format(job?.created_at, 'en-US')}</p>
                <Link href={"/jobs/" + job?.shortcode}>
                  <Button>
                    View Job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}