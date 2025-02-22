"use client"

import {Button} from "@/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Conversation} from "@11labs/client";
import {cn} from "@/lib/utils";
import { getElevenLabsSignedUrl } from "@/app/server/elevenlabs_actions";

async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({audio: true})
        return true
    } catch {
        console.error('Microphone permission denied')
        return false
    }
}

export function ConvAI() {
    const [conversation, setConversation] = useState<Conversation | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    async function startConversation() {
        const hasPermission = await requestMicrophonePermission()
        if (!hasPermission) {
            alert("No permission")
            return;
        }
        const response = await getElevenLabsSignedUrl("T86id8RLLsalc7Ao3P0d")
        const conversation = await Conversation.startSession({
            signedUrl: response?.signed_url ?? "",
            onConnect: () => {
                setIsConnected(true)
                setIsSpeaking(true)
            },
            onDisconnect: () => {
                setIsConnected(false)
                setIsSpeaking(false)
            },
            onError: (error) => {
                console.log(error)
                alert('An error occurred during the conversation')
            },
            onModeChange: ({mode}) => {
                setIsSpeaking(mode === 'speaking')
            },
        })
        setConversation(conversation)
    }

    async function endConversation() {
        if (!conversation) {
            return
        }
        await conversation.endSession()
        setConversation(null)
    }

    return (
        <div className={"flex justify-center items-center gap-x-4"}>
            <Card className={'rounded-3xl'}>
                <CardContent>
                    <div className={'flex flex-row text-center items-center '}>
                        <div className={cn('orb my-b-0 mt-5 mx-4',
                            isSpeaking ? 'animate-orb' : (conversation && 'animate-orb-slow'),
                            isConnected ? 'orb-active' : 'orb-inactive')}
                        ></div>

                        <div className="flex flex-col items-center mt-4">
                            <div className="text-xs">
                                {isConnected ? (
                                    isSpeaking ? `Agent is speaking` : 'Agent is listening'
                                ) : (
                                    'Disconnected'
                                )}
                            </div>
                            {!!conversation ?
                                <Button
                                    variant={'outline'}
                                    className={'rounded-full'}
                                    size={"lg"}
                                    disabled={conversation === null && !isConnected}
                                    onClick={endConversation}
                                >
                                    End conversation
                                </Button> :
                                <Button
                                    variant={'outline'}
                                    className={'rounded-full'}
                                    size={"lg"}
                                    disabled={conversation !== null && isConnected}
                                    onClick={startConversation}
                                >
                                    Start conversation
                                </Button>}
                            </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}