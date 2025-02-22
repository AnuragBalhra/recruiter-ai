import { useEffect, useRef, useState } from "react";

const UserVideo = () => {
  const videoRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | undefined>();

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();

    return () => {
      if (mediaStreamRef?.current) {
        mediaStreamRef?.current?.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: "350px", height: "300px" }} className="object-cover rounded-2xl" />
    </div>
  );
};

export default UserVideo;