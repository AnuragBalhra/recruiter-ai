"use client"

import * as React from "react"
import {
  Zap,
  Blocks,
  Home,
  ShieldQuestion,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavExtra } from "@/components/nav-extra"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/clerk-react";
import CustomUserButton from '@/app/components/custom-user-button'
import { SidebarLogo } from '@/components/sidebar-logo'
import { useTheme } from 'next-themes'
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

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      id: "onborda-dashboard",
      icon: Home,
    },
    {
      title: "Integrations",
      url: "/integrations",
      id: "onborda-integrations",
      icon: Blocks,
    }
  ],
  options: [
    {
      name: "Help",
      url: "/faqs",
      id: "onborda-help",
      icon: ShieldQuestion,
    },
  ],
}

export function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isSignedIn } = useUser();
  const { open, isMobile } = useSidebar();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavExtra options={data.options} />
      </SidebarContent>
      <SidebarFooter>
        <div className={(open || isMobile) ? "flex flex-row justify-between items-center": "flex flex-col gap-2"}>
          <CustomUserButton showName={open}/>
          <SidebarTrigger />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
