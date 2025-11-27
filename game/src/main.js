import k from "./kaplayCtx";
import { makePlayer } from "./entities/player";
import { makeEnemy } from "./entities/enemy";
import makeBattleSystem from "./systems/battleSystem";
import playerStatsManager from "./state/playerStatsManager";
k.scene("playground", () => {
  k.add([k.rect(k.width(), k.height()), k.color(0, 184, 148)]);
  const player = makePlayer(k.center(), "Red");
  player.setControls();
  player.onCollide("enemy", (enemy) => {
    makeBattleSystem(player, enemy);
  });

  const spider = makeEnemy(
    k.vec2(600, 300),
    "Officer",
    "officer",

    {
      attack: 6,
      defense: 2,
      health: 10,
      maxHealth: 10,
      illness: {
        type: null,
        recurringDamage: 0,
      },
      exp: 12,
      items: [{ name: "spear", target: "enemy", effect: "harm", value: 7 }],
    }
  );

  makeEnemy(k.vec2(1000, 300), "Spider", "spider", {
    attack: 5,
    defense: 3,
    health: 6,
    maxHealth: 6,
    illness: {
      type: null,
      recurringDamage: 0,
    },
    exp: 10,
    items: [
      { name: "apple", target: "self", effect: "heal", value: 2 },
      {
        name: "poison bottle",
        target: "player",
        effect: "illness",
        type: "poison",
        value: 2,
        rate: 0.8,
      },
      { name: "antidote", target: "self", effect: "cure", type: "poison" },
      {
        name: "strong herb",
        target: "self",
        effect: "buff",
        targetStat: "attack",
        value: 2,
      },
      {
        name: "leg hold trap",
        target: "enemy",
        effect: "debuff",
        targetStat: "attack",
        value: 2,
      },
    ],
  });
});

k.scene("gameover", () => {
  playerStatsManager.setIllness(null, 0);

  k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0)]);
  k.add([
    k.text("GAME OVER!", { size: 64 }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);
});
k.go("playground");

