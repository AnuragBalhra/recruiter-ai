import type { Metadata } from 'next'
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from '@/app/components/providers/Provider';
import { auth } from "@clerk/nextjs/server";
import { OnbordaProvider } from "onborda";

export const metadata: Metadata = {
  title: {
    default: "RecruiterAI | AI agent to automate end to end recruitment pipelines",
    template: "%s | RecruiterAI | AI agents to automate end to end recruitment pipelines"
  },
  description:
    "RecruiterAI | AI agents to automate end to end recruitment pipelines.",
  keywords: ["Free AI Course Creation", "AI Educational Platform"]
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
  }) {
    const tourComplete = auth()?.sessionClaims?.metadata?.tourComplete;
    console.log("tourComplete in root layout: ", tourComplete);
  return (
    <ClerkProvider>
        <html lang="en" className="bg-white" suppressHydrationWarning>
          <body suppressHydrationWarning={true} className="min-h-screen w-full  overflow-none">
            <Provider>
              <OnbordaProvider>
                {children}
              </OnbordaProvider>
            </Provider>
          </body>
        </html>
    </ClerkProvider>
  );
}
