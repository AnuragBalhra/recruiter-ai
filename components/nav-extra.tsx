"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Youtube,
  Github,
  Headset,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link";

export function NavExtra({
  options,
}: {
  options: {
    name: string
    url: string
    icon: LucideIcon
    id?: string
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Useful Links</SidebarGroupLabel>
      <SidebarMenu>
        {options.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild id={item?.id}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal />
                <span>More</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              <Link href="https://www.youtube.com/">
                <DropdownMenuItem className="cursor-pointer">
                  <Youtube className="text-muted-foreground mr-2" />
                  <span>Demo Video</span>
                </DropdownMenuItem>
              </Link>
              <Link href="https://github.com/AnuragBalhra/recruiter-ai">
                <DropdownMenuItem className="cursor-pointer">
                  <Github className="text-muted-foreground mr-2" />
                  <span>Github Repo</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
