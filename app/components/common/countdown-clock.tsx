"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlusCircle, ChevronLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { format } from 'date-fns';
import { Timer } from "lucide-react";

function TimeFormatter({ seconds }: {seconds: number}) {
  const formattedTime = format(new Date(0, 0, 0, 0, 0, seconds), 'HH:mm:ss');
  return <span>{formattedTime}</span>;
}

export default function CountdownClock({initialTime, onChange, onFinish}: 
    {initialTime: number, onChange?: (time: number) => void, onFinish: any}) {    
    const router = useRouter();
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        if (remainingTime) {
            const interval = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        if (remainingTime === 0) {
            onFinish();
        }
    }, [remainingTime, setRemainingTime]); 

    useEffect(() => {
        if(onChange) {
            onChange(remainingTime);
        }
    }, [remainingTime])

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-row"><Timer className="w-5 h-5 mr-1"/>{<TimeFormatter seconds={remainingTime} />}</div>
                </TooltipTrigger>
                <TooltipContent side="right">Remaining Time: <TimeFormatter seconds={remainingTime} /> </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}