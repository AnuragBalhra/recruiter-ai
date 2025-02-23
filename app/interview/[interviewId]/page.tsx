"use client";
import React, { useEffect, useState } from "react";
import SimliElevenlabs from "@/app/components/simli/SimliElevenlabs";
import DottedFace from "@/app/components/simli/DottedFace";
import Image from "next/image";

interface avatarSettings {
  elevenlabs_agentid: string;
  simli_faceid: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  elevenlabs_agentid: "4DEbuqFe3a3yimXaGH7Z",
  simli_faceid: "86ce4210-8301-4e04-a2e3-a2aba6fff2bf",
};

export default async function InterviewPage({ params: { interviewId } }:
  { params: { interviewId: string }}) {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div>
          {showDottedFace && <DottedFace />}
          <SimliElevenlabs
            agentId={avatar.elevenlabs_agentid}
            simli_faceid={avatar.simli_faceid}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
            interviewId={interviewId}
          />
        </div>
      </div>
    </div>
  );
};

