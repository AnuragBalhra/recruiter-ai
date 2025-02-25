import React, { useCallback, useRef, useState } from "react";
import { useConversation } from "./elevenlabs/elevenlabs-react";
import { SimliClient } from "simli-client";
import VideoBox from "@/app/components/simli/VideoBox";
import { cn } from "@/lib/utils";
import IconSparkleLoader from "@/public/assets/media/IconSparkleLoader";
import { send } from "process";
import { getElevenLabsSignedUrl } from "@/app/server/elevenlabs_actions";
import UserVideo from "./UserVideo";

interface SimliElevenlabsProps {
  simli_faceid: string;
  agentId: string; // ElevenLabs agent ID
  onStart: () => void;
  onClose: () => void;
  showDottedFace: boolean;
  interviewId: string;
  username: string;
}

const simliClient = new SimliClient();

const SimliElevenlabs: React.FC<SimliElevenlabsProps> = ({
  simli_faceid,
  agentId,
  onStart,
  onClose,
  showDottedFace,
  interviewId,
  username,
}) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [error, setError] = useState("");
  const [userMessage, setUserMessage] = useState("...");

  // Refs for media elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize ElevenLabs conversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log("ElevenLabs conversation connected");
      setIsAvatarVisible(true);
      setIsLoading(false);
      // sendAudioDataToSimli();
    },

    onDisconnect: () => {
      console.log("ElevenLabs conversation disconnected");
      setIsAvatarVisible(false);
      simliClient?.ClearBuffer();
      simliClient?.close();
    },

    onMessage: (message) => {
      console.log("ElevenLabs conversation message:", message);
    },

    onModeChange(data) {
      console.log("ElevenLabs conversation mode change:", data);
      if (data.mode === "interrupted") {
        simliClient?.ClearBuffer();
      }
    },

    onError: (error) => {
      console.error("ElevenLabs conversation error:", error);
      setError(`Conversation error: ${error}`);
    },

    onAudioData: (audioData: Uint8Array) => {
      console.log("ElevenLabs conversation audio data:", audioData);
      simliClient.sendAudioData(audioData);
    },
  });

  /**
   * Initializes the Simli client with the provided configuration.
   */
  const initializeSimliClient = useCallback(() => {
    if (videoRef.current && audioRef.current) {
      const SimliConfig = {
        apiKey: process.env.NEXT_PUBLIC_SIMLI_API_KEY,
        faceID: simli_faceid,
        handleSilence: true,
        videoRef: videoRef.current,
        audioRef: audioRef.current,
      };

      simliClient.Initialize(SimliConfig as any);
      console.log("Simli Client initialized");
    }
  }, [simli_faceid]);

  const startElevenLabsConversation = async () => {
    // If agent is not publis then we must get signed URL from ElevenLabs
    await getElevenLabsSignedUrl(agentId).then((res) => {
      if ("error" in res) {
        console.error("Failed to get ElevenLabs URL:", res.error);
        return;
      }

      console.log("Got ElevenLabs signed URL:", res.signed_url);

      // Mute ElevenLabs internal audio to only hear it from Simli's side
      conversation.setVolume({ volume: 0 });

      conversation.startSession({
        agentId: agentId,
        signedUrl: res.signed_url,
        // interview_id: interviewId,
        username,
      });
    });
  };

  /**
   * Handles the start of the interaction
   */
  const handleStart = useCallback(async () => {
    initializeSimliClient();

    if (simliClient) {
      simliClient?.on("connected", () => {
        console.log("SimliClient connected");
        const audioData = new Uint8Array(6000).fill(0);
        simliClient?.sendAudioData(audioData);
        console.log("Sent initial audio data");

        startElevenLabsConversation();
      });

      simliClient?.on("disconnected", () => {
        console.log("SimliClient disconnected");
      });
    }

    setIsLoading(true);
    setError("");
    onStart();

    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start Simli client
      await simliClient?.start();
    } catch (error: any) {
      console.error("Error starting interaction:", error);
      setError(`Error starting interaction: ${error.message}`);
      setIsLoading(false);
    }
  }, [agentId, conversation, onStart]);

  /**
   * Handles stopping the interaction
   */
  const handleStop = useCallback(() => {
    console.log("Stopping interaction...");
    setIsLoading(false);
    setError("");
    setIsAvatarVisible(false);

    // Clean up ElevenLabs conversation
    conversation.endSession();

    // Clean up Simli client
    simliClient?.close();

    onClose();
    console.log("Interaction stopped");
  }, [conversation, onClose]);

  return (
    <>
      <div className={`grid grid-cols-2 transition-all duration-300 gap-5 ${
          showDottedFace ? "h-0 overflow-hidden" : "h-auto"
        }`}
      >
        <UserVideo />
        <VideoBox video={videoRef} audio={audioRef} />
      </div>
      <div className="flex flex-col items-center">
        {!isAvatarVisible ? (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className={cn(
              "w-full h-[52px] mt-4 disabled:bg-[#343434] disabled:text-white disabled:hover:rounded-[100px] bg-simliblue text-gray-800 py-3 px-6 rounded-sm transition-all duration-300 hover:text-white hover:bg-gray-800 hover:rounded-xl",
              "flex justify-center items-center"
            )}
          >
            {isLoading ? (
              <IconSparkleLoader className="h-[20px] animate-loader" />
            ) : (
              <span className="font-abc-repro-mono font-bold w-[164px]">
                Start Interview
              </span>
            )}
          </button>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={handleStop}
                className={cn(
                  "mt-4 group text-gray-800 flex-grow hover:rounded-sm hover:bg-gray-800 h-[52px] px-6 rounded-[100px] transition-all duration-300"
                )}
              >
                <span className="font-abc-repro-mono group-hover:text-white font-bold w-[164px] transition-all duration-300">
                  Stop Interview
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SimliElevenlabs;
