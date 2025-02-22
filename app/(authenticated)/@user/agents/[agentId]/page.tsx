"use client";
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
import { getAgentDetails } from '@/app/server/user_actions';

export default async function AgentDetailsPage({ params: { agentId } }:
  { params: { agentId: string }}) {
  
  console.log("got agent Id: ", agentId);
  const response = await getAgentDetails({ agentId });
  console.log("response from server action: ", response);
  if (response?.error) { 
    notFound();
  }
  const agent = response;
  console.log("agent from server action: ", agent);

  return (
    <div className="flex flex-col w-full min-h-screen flex-1 ">
      <InternalHeaderBar title={agent?.name ?? `Agent #${agent?._id}`} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
        {/* <UserAgents /> */}
      </main>
    </div>
  )
}