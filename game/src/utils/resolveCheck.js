function resolveCheck(rawScore, maxValue) {
  let score;

  if (rawScore === true) score = 100;
  else if (rawScore === false) score = 0;
  else score = rawScore; // assume 0–100

  const pct = score / 100;
  const success = Math.random() < pct;

  // If no maxValue (like doors, dialogue, persuasion), just return success
  if (maxValue == null) {
    return { success };
  }

  // Otherwise calculate amount (damage, mitigation, etc.)
  const amount = Math.floor(maxValue * pct);

  return { success };
}

export default resolveCheck;