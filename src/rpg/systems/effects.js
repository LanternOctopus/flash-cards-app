import kaplay from "kaplay";

function reduceHealth(damageDealt, target){
    if(damageDealt < target.stats.health){
        target.stats.health -= damageDealt
    }else{
        target.stats.health = 0;
    }
}
export async function applyAttackEffect(textBox, attacker, target){
    if(target.stats.defense < attacker.stats.attack){
        console.log(`${target.name} health before attack`)
        console.log(target.stats.health)
        const damageDealt = attacker.stats.attack-target.stats.defense;
        await reduceHealth(damageDealt, target);
        console.log(`${target.name} health after attack`)
        console.log(target.stats.health)
        await textBox.displayLine(`${attacker.name} dealt ${damageDealt} points of damage to ${target.name}`)
        return;
    }
    await textBox.displayLine(
        `${target.name}'s defense was too strong. Attack failed!`
    )
}

export async function applyItemHarmEffect(textBox, target, item){
    if(target.stats.defense < item.value){
        const damageDealt = item.value - target.stats.defense;
        reduceHealth(damageDealt, target);
        await textBox.displayLine(
            `${target.name} recieved ${damageDealt} pts of damage!`
        )
        return;
    }
    await textBox.displayLine(
        `${target.name}'s defense is too strong! Attack deflected!`
    )
}
export async function applyItemHealEffect(textBox, target, item){
    const resultingHealth = target.stats.health+item.value;
    if(target.stats.maxHealth< resultingHealth){
        target.stats.health =target.stats.maxHealth;
        await textBox.displayLine(`${target.name}'s max health was reached!`)
        return;
    }
    target.stats.health = resultingHealth;
    await textBox.displayLine(`${target.name}'s health was increased by ${item.value}!`)
    return;
}
export async function applyItemIllnessEffect(textBox, target, item){
    const isIll = kaplay.rand(0,1) < item.rate;
    if(isIll){
        target.stats.illness.type = item.type;
        target.stats.illness.recurringDamage = item.value;
        await textBox.displayLine(`${target.name} got an illness through contact with ${item.name}!`);
        return;
    }
    await textBox.displayLine(`${item.name} was inffective!`);
}
export async function applyIllnessDamageEffect(textBox, target){
    const resultingHealth = target.stats.health-target.stats.illness.recurringDamage;
    console.log('after illness the resulting health is')
    console.log(`${resultingHealth}`)
    target.stats.health = resultingHealth;

    console.log(target.stats.health)
    await textBox.displayLine(`${target.name} was hurt by ${target.stats.illness.type}`)
    await textBox.displayLine(`${target.name}'s health was decreased by ${target.stats.illness.recurringDamage}!`)
    if(resultingHealth<= 0){
        target.stats.health = 0
        await textBox.displayLine(`${target.name} fainted!`)
    }
   
    return;
}

export async function applyItemCureEffect(textBox, target, item){
  if (target.stats.illness.type !== item.type) {
    await textBox.displayLine(`${item.name} had no effect!`);
    return;
  }

  target.stats.illness.type = null;
  target.stats.illness.recurringDamage = 0;

  await textBox.displayLine(`${target.name} healed from ${item.type} illness!`);
}

export async function applyItemBuffEffect(textBox, target, item) {
  const resultingStatValue = target.stats[item.targetStat] + item.value;

  target.stats[item.targetStat] = resultingStatValue;

  await textBox.displayLine(
    `${target.name}'s ${item.targetStat} was increased by ${item.value}.`
  );
}
export async function applyItemDebuffEffect(textBox, target, item) {
  const resultingStatValue = target.stats[item.targetStat] - item.value;

  target.stats[item.targetStat] =
    resultingStatValue >= 0 ? resultingStatValue : 0;

  await textBox.displayLine(
    `${target.name}'s ${item.targetStat} was decreased by ${item.value}.`
  );
}
