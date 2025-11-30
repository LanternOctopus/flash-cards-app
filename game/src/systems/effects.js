import runInteractionCheck from "../utils/resolveCheck";
import k from "../kaplayCtx";

//TODO: move this to ui folder
async function displayAndWait(textBox, message) {
    await textBox.displayLine(message);
    await k.wait(2);
}

function reduceHealth(damageDealt, target) {
    if (damageDealt < target.stats.health) {
        target.stats.health -= damageDealt;
    } else {
        target.stats.health = 0;
    }
}
export async function applyAttackEffect(
    textBox,
    attacker,
    target
) {
    var rate = 1;
    if (attacker.tags.includes("player")) {
        const result = await runInteractionCheck({
            challenge: "Scrambler",
            abilityCheck: null,
            score: null,
            modalString:
                "Solve this challege to successfully attack!",
        });
        if (result.abilityCheck === false) {
            await displayAndWait(
                textBox,
                `That's the wrong answer  😞!`
            );
            return;
        }
        await displayAndWait(
            textBox,
            `That's the right answer 😄`
        );
        rate = result.rate;
    }

    if (
        target.stats.defense >
        attacker.stats.attack * rate
    ) {
        await textBox.displayLine(
            `${target.name}'s defense was too strong. Attack failed!`
        );
        return;
    }

    const damageDealt =
        attacker.stats.attack * rate - target.stats.defense;
    await reduceHealth(damageDealt, target);
    await textBox.displayLine(
        `${attacker.name} dealt ${damageDealt} points of damage to ${target.name}`
    );
    return;
}

export async function applyItemHarmEffect(
    textBox,
    target,
    item
) {
    var rate = 1;
    if (target.tags.includes("enemy")) {
        const result = await runInteractionCheck({
            challenge: "Flashcard",
            abilityCheck: null,
            score: null,
            modalString: `Solve this challenge to successfully use ${item.name}!`,
        });
        if (result.abilityCheck === false) {
            await displayAndWait(
                textBox,
                `That's the wrong answer  😞!`
            );
            return;
        }
        await displayAndWait(
            textBox,
            `That's the right answer 😄`
        );
        rate = result.rate;
    }

    if (target.stats.defense < item.value * rate) {
        const damageDealt =
            item.value * rate - target.stats.defense;
        reduceHealth(damageDealt, target);
        await textBox.displayLine(
            `${target.name} recieved ${damageDealt} pts of damage!`
        );
        return;
    }
    await textBox.displayLine(
        `${target.name}'s defense is too strong! Attack deflected!`
    );
}
export async function applyItemHealEffect(
    textBox,
    target,
    item
) {
    const resultingHealth =
        target.stats.health + item.value;
    if (target.stats.maxHealth < resultingHealth) {
        target.stats.health = target.stats.maxHealth;
        await textBox.displayLine(
            `${target.name}'s max health was reached!`
        );
        return;
    }
    target.stats.health = resultingHealth;
    await textBox.displayLine(
        `${target.name}'s health was increased by ${item.value}!`
    );
    return;
}
export async function applyItemIllnessEffect(
    textBox,
    target,
    item
) {
    var isIll = true;
    if (target.tags[1] === "player") {
        var result = await runInteractionCheck({
            challenge: "Flashcard",
            abilityCheck: null,
            score: null,
            modalString: `Solve this challenge to successfully avoid illness through contact with ${item.name}!`,
        });
        if (result.abilityCheck === false) {
            await displayAndWait(
                textBox,
                `That's the wrong answer  😞!`
            );
            return;
        }
        await displayAndWait(
            textBox,
            `That's the right answer 😄`
        );
        isIll = !result.abilityCheck;
    } else {
        isIll = k.rand(0, 1) < item.rate;
    }

    if (isIll) {
        target.stats.illness.type = item.type;
        target.stats.illness.recurringDamage = item.value;
        await textBox.displayLine(
            `${target.name} got an illness through contact with ${item.name}!`
        );
        return;
    }
    await textBox.displayLine(
        `${item.name} was inffective!`
    );
}
export async function applyIllnessDamageEffect(
    textBox,
    target
) {
    const resultingHealth =
        target.stats.health -
        target.stats.illness.recurringDamage;
    console.log("after illness the resulting health is");
    console.log(`${resultingHealth}`);
    target.stats.health = resultingHealth;

    console.log(target.stats.health);
    await textBox.displayLine(
        `${target.name} was hurt by ${target.stats.illness.type}`
    );
    await textBox.displayLine(
        `${target.name}'s health was decreased by ${target.stats.illness.recurringDamage}!`
    );
    if (resultingHealth <= 0) {
        target.stats.health = 0;
        await textBox.displayLine(
            `${target.name} fainted!`
        );
    }

    return;
}

export async function applyItemCureEffect(
    textBox,
    target,
    item
) {
    if (target.stats.illness.type !== item.type) {
        await textBox.displayLine(
            `${item.name} had no effect!`
        );
        return;
    }

    target.stats.illness.type = null;
    target.stats.illness.recurringDamage = 0;

    await textBox.displayLine(
        `${target.name} healed from ${item.type} illness!`
    );
}

export async function applyItemBuffEffect(
    textBox,
    target,
    item
) {
    var rate = 1;
    if (target.tags.includes("player")) {
        const result = await runInteractionCheck({
            challenge: "Typing",
            abilityCheck: null,
            score: null,
            modalString: `Solve this challenge to successfully use ${item.name}!`,
        });

        if (result.abilityCheck === false) {
            await textBox.displayLine(
                `${target.name} was unable to use ${item.name}!`
            );
            return;
        }
        if (result.abilityCheck === false) {
            await displayAndWait(
                textBox,
                `That's the wrong answer  😞!`
            );
            return;
        }
        await displayAndWait(
            textBox,
            `That's the right answer 😄`
        );
        rate = result.rate;
    }

    const resultingStatValue =
        target.stats[item.targetStat] + item.value * rate;

    target.stats[item.targetStat] = resultingStatValue;

    await textBox.displayLine(
        `${target.name}'s ${item.targetStat} was increased by ${item.value}.`
    );
}
export async function applyItemDebuffEffect(
    textBox,
    target,
    item
) {
    var rate = 1;
    if (target.tags.includes("enemy")) {
        const result = await runInteractionCheck({
            challenge: "Scrambler",
            abilityCheck: null,
            score: null,
            modalString: `Solve this challenge to successfully avoid a debuff from ${item.name}!`,
        });
        if (result.abilityCheck === false) {
            await textBox.displayLine(
                `${target.name} was unaffected by ${item.name}!`
            );
            return;
        }
        if (result.abilityCheck === false) {
            await displayAndWait(
                textBox,
                `That's the wrong answer  😞!`
            );
            return;
        }
        await displayAndWait(
            textBox,
            `That's the right answer 😄`
        );
        rate = result.rate;
    }
    const resultingStatValue =
        target.stats[item.targetStat] - item.value * rate;

    target.stats[item.targetStat] =
        resultingStatValue >= 0 ? resultingStatValue : 0;

    await textBox.displayLine(
        `${target.name}'s ${item.targetStat} was decreased by ${resultingStatValue}.`
    );
}
