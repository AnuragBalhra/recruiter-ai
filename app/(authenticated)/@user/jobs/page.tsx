"use server";

import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';
import UserJobs from "./user-jobs";


export default async function JobsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen flex-1 ">
      <InternalHeaderBar title={"Agents"} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
        <UserJobs />
      </main>
    </div>
  )
}