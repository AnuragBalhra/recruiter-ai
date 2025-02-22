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
import AddAgentModel from './add-agent-modal';

export default function UserAgents() {
  const queryClient = useQueryClient()
  const { isPending, isError, data, error } = useQuery<any>({
      queryKey: ['my_agents'],
      queryFn: async () => await getMyAgents({
        page: 1,
        pageSize: 5,
      }),
  })

  const mutation = useMutation<any, any,any>({
    mutationFn: (payload) => {
      consoleLog("payload received in add agent mutation call: ", payload);
      return addAgent({ payload });
    },
    onSuccess: (data, variables, context) => {
      consoleLog("agent add response: ", data);
      toast.success("Course add!");
      queryClient.invalidateQueries({ queryKey: ['course_details'] })
    },
    onError: (error, variables, context) => {
      consoleLog("Error received during add agent name mutation: ", error);
      toast.error("Something went wrong!");
    },
  })
  const agents = data?.entities ?? [];
  const count = data?.metadata?.count;
  console.log("found my agents: ", data);
  return (    
    <div>
      <div className="my-5 text-2xl font-bold text-gray-800 dark:text-white">
        My Agents
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {agents?.map((agent: any, index: number) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardDescription>{agent?.name ?? `Agent #${agent?._id}`}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5">
                <p className="line-clamp-4">{agent?.description ?? agent?.context}</p>
                <Link href={"/agents/" + agent?._id}>
                  <Button>
                    Go to Agent
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
        <AddAgentModel />
      </div>
    </div>
  )
}