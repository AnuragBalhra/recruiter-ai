"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Youtube,
  Rss,
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
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
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
              <Link href="https://www.youtube.com/@smartintervu">
                <DropdownMenuItem className="cursor-pointer">
                  <Youtube className="text-muted-foreground mr-2" />
                  <span>Youtube Channel</span>
                </DropdownMenuItem>
              </Link>
              <Link href="https://blog.smartutr.com/">
                <DropdownMenuItem className="cursor-pointer">
                  <Rss className="text-muted-foreground mr-2" />
                  <span>Read Our Blog</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/contact">
                <DropdownMenuItem className="cursor-pointer">
                  <Headset className="text-muted-foreground mr-2" />
                  <span>Contact Us</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
