// SoundObject.tsx
import { useState, useEffect, JSX } from "react";
import { useAudio } from "../providers/AudioProvider";

interface SoundObjectProps {
    file: string;
    loop?: boolean;
    children: (isPlaying: boolean) => JSX.Element;
    trigger?: number; // optional: increment to replay
}

export default function SoundObject({
    file,
    loop = false,
    children,
    trigger,
}: SoundObjectProps) {
    const { soundsAllowed } = useAudio();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!soundsAllowed) return; // respect user preference

        const audio = new Audio(file);
        audio.loop = loop;

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);

        audio.play().catch(() => {
            console.log(
                "Waiting for user interaction to start audio...",
            );
        });

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [file, loop, trigger, soundsAllowed]);

    return children(isPlaying);
}
