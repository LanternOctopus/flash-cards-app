import React from "react";
import { useScore } from "../../providers/ScoreProvider";
import Mascot from "../mascot/Mascot";

type Props = {
    inventory?: React.ReactNode;
};

export function ScoreBar({ inventory }: Props) {
    const { score, total, progress } = useScore();

    return (
        <div style={styles.wrapper}>
            <div style={styles.mascot}>
                <Mascot />
            </div>

            <div style={styles.barWrapper}>
                <div style={styles.scoreCircle}>
                    <span style={styles.scoreText}>
                        {score}/{total}
                    </span>
                </div>

                <div style={styles.track}>
                    <div
                        style={{
                            ...styles.fill,
                            width: `${progress * 100}%`,
                        }}
                    />
                </div>
            </div>

            <div style={styles.inventory}>{inventory}</div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
    },

    mascot: {
        flex: "0 0 20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    barWrapper: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        position: "relative",
        minHeight: 64,
    },

    scoreCircle: {
        width: 64,
        height: 64,
        borderRadius: "9999px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: "#A5D601",
        color: "black",

        zIndex: 2,

        flexShrink: 0,
    },

    scoreText: {
        fontWeight: 700,
        fontSize: 14,
    },

    track: {
        height: 24,
        borderRadius: 9999,

        overflow: "hidden",

        background: "#ddd",

        marginLeft: -8,

        flex: 1,
    },

    fill: {
        height: "100%",

        borderRadius: 9999,

        transition: "width 250ms ease",

        background: "#A5D601",
    },

    inventory: {
        flex: "0 0 20%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};
