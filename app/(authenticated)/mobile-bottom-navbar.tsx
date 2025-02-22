import React from 'react'
import { SidebarConfig } from "./navbar.types"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import Link from "next/link"
import classnames from "clsx";
import { usePathname } from "next/navigation";

export default function MobileBottomNavbar({ config }: { config: SidebarConfig }) {
  const pathName = usePathname();
  const count = config?.main?.filter(item => item?.visible)?.length ?? 1;
  return (
    <TooltipProvider>
      <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className={`grid h-full max-w-lg grid-cols-${count} mx-auto font-medium`}>
          {config?.main?.filter(item => item?.visible).map((item, index) => { 
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Link
                      id={item.id + "-mobile"}
                      href={item.link}
                        className={classnames("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        pathName === item?.link && "font-semibold text-primary"
                      )}
                    >
                      {item.icon}
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">{item?.name}</TooltipContent>
            </Tooltip>
              )
            })}
          </div>
      </div>
    </TooltipProvider>
  );
}
