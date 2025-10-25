"use client";

import { cn, getSubjectColor } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import soundwaves from "@/constants/soundwaves.json"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: 
  CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if(lottieRef) {
      if(isSpeaking) {
        lottieRef.current?.play()
        } else { 
          lottieRef.current?.stop() 
        }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = () => {};

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
    vapi.off('call-start', onCallStart);
    vapi.off('call-end', onCallEnd);
    vapi.off('message', onMessage);
    vapi.off('error', onError);
    vapi.off('speech-start', onSpeechStart);
    vapi.off('speech-end', onSpeechEnd);
    }
  }, []);

  return (
    <section className="flex flex-col h-[70vh]">
        <section className="flex gap-8 max-sm:flex-col">
            <div className="companion-section">
                <div className="companion-avatar" style={{backgroundColor: getSubjectColor(subject)}}>
                  <div 
                  className={cn('absolute transition-opacity duration-1000',
                     callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE
                     ? 'opacity-1000' : 'opacity-0', callStatus === CallStatus.CONNECTING
                     && 'opacity-100 animate-pulse')}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={150}
                      height={150}
                      className="max-sm:w-fit"
                      />
                  </div>
                  <div className={cn('absolute transition-opacity duration-1000',
                    callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                      <Lottie
                        lottieRef={lottieRef}
                        animationData={soundwaves}
                        autoPlay={false}
                        className="companion-lottie"
                      />
                    </div>
                </div>
                <p className="font-bold text-2xl">{name}</p>
            </div>
            <div></div>
        </section>
    </section>
  )
}

export default CompanionComponent
