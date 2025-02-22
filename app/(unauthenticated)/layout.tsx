import type { Metadata } from 'next'
import TopNavBar from "@/app/components/TopNavBar";
import { auth } from "@clerk/nextjs/server";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
  }) {
  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      <TopNavBar />
      <div className="flex flex-1">
        {children}
      </div> 
    </div>
  );
}
