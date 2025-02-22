"use client";
import Image from "next/image";
import Link from 'next/link';

import illustration from "@/public/assets/svg/undraw_access_denied.svg";

export default function ErrorComponent({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  return (
    <div className="flex flex-1 h-screen flex-row justify-center items-center">
      <div className="flex flex-col-reverse md:flex md:flex-row">
        <div className="flex flex-col md:col-span-7 justify-center items-center md:items-end md:text-end max-w-md">
            <h1 className="block text-5xl md:text-7xl xl:text-9xl font-bold text-gray-800 dark:text-white">404</h1>
            <p className="text-lg font-semibold md:mb-5 text-gray-800 dark:text-white">
              Required page could not be found.
            </p>
            <p>
              The page you're trying to access either does not exist 
              or you don't have permissions to access it.
            </p>
            <p className="mt-1">
              Please either log in or go back to the home page.
            </p>
            <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                <Link
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-4 dark:ring-offset-slate-900"
                    href="/">
                    <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Back to Homepage
                </Link>
                
                <button
                    className="btn btn-primary rounded-md text-sm py-3 px-4"
                    onClick={() => reset()}>
                    Refresh
                </button>
            </div>
        </div>
        <div className="max-w-md p-20">
          <Image src={illustration} alt="Error Loading Page"/>
        </div>
      </div>
    </div>
  )
}
