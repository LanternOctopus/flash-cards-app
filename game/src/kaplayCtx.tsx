import kaplay from "kaplay";
const k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    global: false,
    debug: true,
    debugKey: "d",
    buttons: {
        confirm: {
            keyboard: ["space"],
        },
        left: {
            keyboard: ["left"],
        },
        right: {
            keyboard: ["right"],
        },
        up: {
            keyboard: ["up"],
        },
        down: {
            keyboard: ["down"],
        },
    },
});
k.loadSprite(
    "spider",
    window.location.href + "/enemies/spider.png"
);
k.loadSprite(
    "officer",
    window.location.href + "/enemies/officer.png"
);
k.loadSprite(
    "officer",
    window.location.href + "/enemies/officerMap.png"
);
k.loadSprite(
    "naruto",
    window.location.href + "/enemies/naruto.png"
);
k.loadSprite(
    "player",
    window.location.href + "/player/player.png"
);

export default k;
