// AudioProvider.tsx
import {
    createContext,
    useContext,
    useRef,
    useEffect,
    ReactNode,
    useState,
} from "react";

interface AudioContextType {
    play: (
        src: string,
        volume?: number,
        loop?: boolean,
        startTime?: number,
    ) => void;
    soundsAllowed: boolean;
    toggleSoundsAllowed: (allowed: boolean) => void;
}

const AudioContext = createContext<
    AudioContextType | undefined
>(undefined);

interface AudioProviderProps {
    children: ReactNode;
}

export const AudioProvider = ({
    children,
}: AudioProviderProps) => {
    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const [soundsAllowed, setSoundsAllowed] =
        useState(false);

    const toggleSoundsAllowed = (allowed: boolean) =>
        setSoundsAllowed(allowed);

    const play = (
        src: string,
        volume = 1.0, // default max volume
        loop = false,
        startTime = 0,
    ) => {
        if (!soundsAllowed) return;

        const player = audioRef.current;

        // Reset and configure
        player.pause();
        player.src = `${process.env.PUBLIC_URL}/audio/${src}`;
        player.volume = Math.max(0, Math.min(volume, 1)); // clamp 0-1
        player.loop = loop;
        player.currentTime = startTime;

        // Execute
        player.play().catch((e) => {
            if (e.name !== "AbortError")
                console.log("Playback interrupted", e);
        });
    };

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.src = "";
        };
    }, []);

    return (
        <AudioContext.Provider
            value={{
                play,
                soundsAllowed,
                toggleSoundsAllowed,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = (): AudioContextType => {
    const context = useContext(AudioContext);
    if (!context)
        throw new Error(
            "useAudio must be used within an AudioProvider",
        );
    return context;
};
