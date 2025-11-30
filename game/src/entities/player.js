// import { DIAGONAL_FACTOR } from "../constant";
import k from "../kaplayCtx";
import gameStateManager from "../state/gameStateManager";
import playerStatsManager from "../state/playerStatsManager";

export function makePlayer(pos, name) {
    const playerStats = playerStatsManager.current();

    return k.add([
        k.sprite("player", { width: 150, height: 150 }),
        k.anchor("center"),
        k.area(),
        k.body(),
        k.pos(pos),
        "player",
        {
            name,
            stats: playerStats,
            speed: 400,
            setControls() {
                this.onUpdate(() => {
                    if (
                        gameStateManager.current()
                            .isInBattle
                    )
                        return;

                    const directionVector = k.vec2(0, 0);
                    if (k.isButtonDown("left"))
                        directionVector.x = -1;
                    if (k.isButtonDown("right"))
                        directionVector.x = 1;
                    if (k.isButtonDown("up"))
                        directionVector.y = -1;
                    if (k.isButtonDown("down"))
                        directionVector.y = 1;

                    if (
                        directionVector.x &&
                        directionVector.y
                    ) {
                        this.move(
                            directionVector.scale(
                                (1 / Math.sqrt(2)) *
                                    this.speed
                            )
                        );
                        return;
                    }
                    this.move(
                        directionVector.scale(this.speed)
                    );
                });
            },
        },
    ]);
}
