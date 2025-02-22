"use client";
import { useEffect } from "react";
import { useOnborda } from "onborda";
import { Button } from "@/components/ui/button";

export default function StartOnboarding({ tourComplete }: { tourComplete: any }) {
  const { startOnborda, closeOnborda } = useOnborda();

  console.log("props in start onboarding: ", tourComplete);

  useEffect(() => {
    if (!tourComplete) {
      console.log("starting the onboarding tour!!!");
      const timeout = setTimeout(() => {
        startOnborda('user');
      }, 5000);
      return () => {
        closeOnborda();
        clearTimeout(timeout);
      }
    }
  }, [tourComplete])

  return <></>;
}