"use client";
import { PlusCircle, ChevronLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

export default function BackButton() {    
    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-5 w-5 lg:h-7 lg:w-7" onClick={() => { router.back(); }}>
                        <ChevronLeft className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Back</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}