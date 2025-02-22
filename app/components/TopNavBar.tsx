"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "../icon.png";
import { cx } from "../../lib/cx";
import {
  AtSymbolIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic"

const DynamicAccountSection = dynamic(() => import('./AccountSection'), {
  loading: () => <div className="animate-pulse">
    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
  </div>,
  ssr: false,
})

const TopNavBar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-900">
      <nav
        className="flex flex-1 flex-row max-w-[85rem] w-full mx-auto px-4 items-center justify-between"
        aria-label="Navigation Bar"
       >
          <div className="flex flex-none flex-row gap-2">
            <div className="flex items-center justify-between">
              <a href="/" className="flex flex-row text-xl font-semibold items-center gap-1">
                <div className="">
                  {/* <img src={branding} alt="logo" className="w-10 h-10" /> */}
                  <Image 
                    src={logoSrc} 
                    alt="Recruiter AI Logo"
                    className="w-10 h-10" 
                  />
                </div>
                <span className="hidden md:inline-flex text-xl text-gray-900 dark:text-gray-50 font-sans">
                  Recruiter AI
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-1 lg:gap-3 items-center">
            <DynamicAccountSection />
          </div>
      </nav>
    </header>
  );
};

export default TopNavBar;