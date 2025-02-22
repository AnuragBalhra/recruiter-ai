
import { format, addSeconds, intervalToDuration } from 'date-fns';
import { addHours, getMinutes, getHours, getSeconds } from 'date-fns';
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FaCode } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { DatabaseBackup, AlignLeft } from "lucide-react";

export function capitalizeFirstLetter(word: string) {
    if (!word) { 
       return '';
    }
    let lowerCase = word.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
}

export async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}

export function formatDateString(timestamp: any) {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(date);
}
  
export function isProdEnv() {
    return process.env.ENVIRONMENT === "prod"
}

export function isLocalEnv() {
    return process.env.ENVIRONMENT === "local"
}

export function cn(...inputs: any) {
  return twMerge(clsx(inputs))
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isValidDateString(dateString: any) {
  const date = new Date(dateString);
  return !isNaN(date.getTime()); // Returns true only if it's a valid date
}