import React, { useState } from 'react'
import { SidebarConfig } from "../(authenticated)/navbar.types"
import { usePathname } from "next/navigation";
import { UserSidebar } from "@/components/user-sidebar"

export default function CustomSidebar({ config }: { config: SidebarConfig }) {
  const pathName = usePathname();
  return <UserSidebar />;
}
