import initiateHandshake from "../utils/message";
import resolveCheck from "../utils/resolveCheck";
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
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! Attack failed!`
    );
  }
  if (
    target.stats.defense >
    attacker.stats.attack * modifier.rate
  ) {
    await textBox.displayLine(
      `${target.name}'s defense was too strong. Attack failed!`
    );
  }

  const damageDealt =
    attacker.stats.attack * modifier.rate -
    target.stats.defense;
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
  //ToDo: Find out why challenge success doesn't influence the harm effect
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! The ${item.name} didn't work!`
    );
  }
  if (target.stats.defense < item.value) {
    const damageDealt =
      item.value * modifier.rate - target.stats.defense;
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
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! The ${item.name} didn't work!`
    );
  }
  const resultingHealth =
    target.stats.health + item.value * modifier.rate;
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
  //TODO: Find out why Illness effect is not influenced by challenge success
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! ${player.name} fell ill!`
    );
  }
  const isIll = modifier.success ? false : true;
  if (isIll) {
    target.stats.illness.type = item.type;
    target.stats.illness.recurringDamage = item.value;
    await textBox.displayLine(
      `${target.name} got an illness through contact with ${item.name}!`
    );
    return;
  }
  await textBox.displayLine(`${item.name} was inffective!`);
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
    await textBox.displayLine(`${target.name} fainted!`);
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
  //ToDo: Check if the target is the same as the player
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! The ${item.name} didn't work!`
    );
  }
  const resultingStatValue =
    target.stats[item.targetStat] +
    item.value * modifier.rate;

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
  const result = await initiateHandshake({
    challenge: "Scrambler",
    success: null,
    score: null,
  });
  const modifier = resolveCheck(result);
  if (typeof modifier.rate !== "number") {
    throw new Error("Rate is not a number");
  }
  if (modifier.success === false) {
    await textBox.displayLine(
      `${player.name} failed the challenge! The ${player.name} got debuffed!`
    );
  }
  const resultingStatValue =
    target.stats[item.targetStat] -
    item.value +
    item.value * modifier.rate;

  target.stats[item.targetStat] =
    resultingStatValue >= 0 ? resultingStatValue : 0;

  await textBox.displayLine(
    `${target.name}'s ${item.targetStat} was decreased by ${item.value}.`
  );
}
