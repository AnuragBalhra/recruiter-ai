"use client";
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { PlusCircle, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { consoleLog } from '@/utils/logging-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMyAgents, addAgent } from '@/app/server/user_actions';
import { AnimatePresence, motion } from "framer-motion";
import { cx } from '@/lib/cx';
import { Textarea } from '@/components/ui/textarea';
import { LoadingButton } from "@/components/extensions/loading-button";
import { Tooltip } from '@mui/material';

export default function AddAgentModal() {
  const router = useRouter();
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false);
  const [context, setContext] = useState('');

  useEffect(() => {
    if(!open) {
      setContext('');
    }
  }, [open]);

  const mutation = useMutation({
    mutationFn: () => addAgent({payload: { context } }),
    onSuccess: (data, variables, context) => {
      consoleLog("agent creation response: ", data);
      router.push(`/agents/${data?._id}`); 
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['my_agents'] })
    },
    onError: (error, variables, context) => {
      consoleLog("Error received during add agent mutation: ", error);
    },
  })

  consoleLog("agent creation data: ", context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip title="Start creating a new agent">
        <div id="onborda-agents">  
          <DialogTrigger asChild>
            <Card key="add_agent" className="flex items-center justify-center h-64 w-full border-4 border-dashed bg-transparent shadow-none hover:cursor-pointer">
              <CardContent className="flex flex-1 flex-col justify-between items-center gap-5">
                <div className="flex flex-col items-center">
                  <Plus className="w-8 h-8" />
                  Add Agent
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
        </div>
      </Tooltip>              
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create new agent</DialogTitle>
        </DialogHeader>
          <div className="relative flex flex-col flex-1 max-w-5xl rounded-xl">
            <div className="flex flex-col my-1 mx-3 gap-2 my-3">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Give a detailed idea about the agent you want to create.</span>
                </div>
                <Textarea
                    id="agent_context"
                    value={context}
                    placeholder="Topic of the agent you want to create"
                    onChange={(e: any) => { setContext(e.target.value)}}
                    required
                    className="min-h-32"
                />                        
            </div>
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton type="button" loading={mutation.isPending} onClick={() => { mutation.mutate(); }}>
                  {mutation.isPending ? "Creating Agent..." : "Create Agent"}
                </LoadingButton>
            </DialogFooter>
          </div>
      </DialogContent>
    </Dialog>
  );
}
  