import { useEffect } from "react";
import { useAudio } from "../providers/AudioProvider";

interface PlayOnLoadProps {
    src: string;
    delay?: number;
    loop?: boolean;
}

export const PlayOnLoad = ({
    src,
    delay = 0,
    loop = false,
}: PlayOnLoadProps) => {
    const { play, soundsAllowed } = useAudio();

    useEffect(() => {
        if (!soundsAllowed) return; // wait until allowed

        const timeout = setTimeout(() => {
            play(src, 1, loop);
        }, delay);

        return () => clearTimeout(timeout);
    }, [src, delay, loop, play, soundsAllowed]);

    return null;
};
