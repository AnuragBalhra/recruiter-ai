"use client";
import React, { useState } from 'react'
import { usePathname, useRouter } from "next/navigation";
import CustomSidebar from './custom-sidebar';
import { ArrowPathRoundedSquareIcon, BoltIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChartPieIcon, ClipboardDocumentListIcon, Cog6ToothIcon, ListBulletIcon, QuestionMarkCircleIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { SidebarConfig } from "../(authenticated)/navbar.types"
import {
  Zap,
  Home,
  Bot,
  LayoutPanelTop,
  ShieldQuestion,
  MessagesSquare,
  MonitorSmartphone,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  CircleUserRound,
  GemIcon,
  BitcoinIcon,
  UserSearchIcon,
  Video,
} from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function AuthenticatedSidebar() {
  const pathName = usePathname();
  const router = useRouter()

  const sidebar_config = {
    'main': [
      {
        name: 'Dashboard',
        icon: <Home className="h-5 w-5" />,
        link: '/dashboard',
        active: pathName.startsWith('/dashboard'),
        id: "onborda-dashboard",
        visible: true,
        mobile: true
      }
    ],
    'extra': [
      {
        name: 'Help',
        id: "onborda-help",
        icon: <ShieldQuestion className="h-5 w-5" />,
        link: '/faqs',
        visible: true,
      }
    ]
  }

  return (
    <div className="flex flex-none">
      <CustomSidebar config={sidebar_config} />
    </div>
  )
}
