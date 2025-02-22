"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/clerk-react";
import Link from "next/link"
import Image from "next/image";
import logoSrc from "@/public/icon.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import cx from "clsx";


export function SidebarLogo() {
  const { user, isSignedIn } = useUser();
  const { open, isMobile } = useSidebar();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={isSignedIn ? "/dashboard": "/"}
          className={cx((open || isMobile) ? "group flex shrink-0 items-center justify-start text-foreground px-4 py-2": "flex bg-gray-200 dark:bg-primary/80 rounded-full w-8 h-8 items-center justify-center")}
        >
          <Image 
            src={logoSrc} 
            alt="RecruiterAI Logo"
            className={cx((open || isMobile) ? "w-8 h-8" : "w-6 h-6", "transition-all group-hover:scale-110")} 
          />
          {/* <Fingerprint className="h-4 w-4 transition-all group-hover:scale-110" /> */}
          {(open || isMobile) && <span className="ml-2 text-sm leading-tight truncate font-semibold">RecruiterAI</span>}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">RecruiterAI</TooltipContent>
    </Tooltip>
  )
}
