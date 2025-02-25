"use server";
import DashboardBanner from "@/app/components/dashboard-banner"
import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';
import StartOnboarding from "@/app/components/onboarding/start-onboarding";
import { auth } from "@clerk/nextjs/server";
import UserJobs from "../jobs/user-jobs";
import {ConvAI} from "@/app/components/xilabs/ConvAI";


export default async function DashboardPage() {
  const tourComplete = auth()?.sessionClaims?.metadata?.tourComplete; 

  return (
    <div className="flex flex-col w-full min-h-screen flex-1 ">
      <InternalHeaderBar title={"Dashboard"} />

      {!tourComplete && <StartOnboarding tourComplete={tourComplete} />}
      
      <DashboardBanner />

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
        <UserJobs />
      </main>
      <div className="fixed bottom-8 right-8">
        <ConvAI/>
      </div>
    </div>
  )
}