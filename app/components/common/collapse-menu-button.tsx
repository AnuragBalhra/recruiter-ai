"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Dot, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

type Submenu = {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
  submenus: Submenu[];
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  href,
  active,
  submenus
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
        <div className="group w-full items-center flex flex-row flex-1 justify-between ">
            <Button
                variant={active ? "default" : "ghost"}
                className="flex flex-1 w-full justify-start h-10 rounded-e-none"
                asChild
            >
                <Link href={href}>
                    <div className="flex items-center">
                        <span className="lg:mx-2">
                            <Icon size={18} />
                        </span>
                        <p
                            className={cn(
                            "truncate translate-x-0 hidden lg:flex"
                            )}
                        >
                            {label}
                        </p>
                    </div>
                </Link>
            </Button>
            <CollapsibleTrigger
                className="[&[data-state=open]>div>div>svg]:rotate-180 flex flex-none rounded-s-none pl-2"
                asChild
            >
                <Button
                    variant={active ? "default" : "ghost"}
                    size="icon"
                    className="justify-start h-10"
                >
                    <ChevronDown
                        size={18}
                        className="transition-transform duration-200"
                    />
                </Button>          
            </CollapsibleTrigger>
        </div>
          
      <CollapsibleContent className="flex flex-col overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active, icon: Icon }, index) => (
          <Button
            key={index}
            variant={active ? "default" : "ghost"}
            className={cn("justify-start h-10 mb-1")}
            asChild
          >
            <Link href={href}>
                <div className="flex items-center">
                <span className="lg:ml-6 lg:mr-4">
                    <Icon size={18} />
                </span>
                <p
                    className={cn(
                    "truncate translate-x-0 opacity-100 hidden lg:flex"
                    )}
                >
                    {label} 
                </p>
                </div>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}