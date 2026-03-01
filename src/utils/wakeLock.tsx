// WakeLockManager.ts
export class WakeLockManager {
    private wakeLock: any = null;

    async request() {
        if (document.visibilityState !== "visible") {
            return;
        }
        try {
            if ("wakeLock" in navigator) {
                this.wakeLock = await (
                    navigator as any
                ).wakeLock.request("screen");
                this.wakeLock.addEventListener(
                    "release",
                    () => {
                        console.log("Wake Lock released");
                    },
                );
                console.log("Wake Lock acquired");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async release() {
        if (this.wakeLock) {
            await this.wakeLock.release();
            this.wakeLock = null;
            console.log("Wake Lock manually released");
        }
    }

    // optional: handle visibility change
    initVisibilityHandler() {
        document.addEventListener(
            "visibilitychange",
            async () => {
                if (
                    this.wakeLock &&
                    document.visibilityState === "visible"
                ) {
                    await this.request();
                }
            },
        );
    }
}
