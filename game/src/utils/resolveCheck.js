/**
 * @typedef {Object} Interaction
 * @property {string} [challenge]      - What challenge should be solved?
 * @property {boolean} [success]       - Did it work?
 */

/**
 * @typedef {Object} InteractionOutcome
 * @property {number}   [rate]
 * @property {boolean}  [abilityCheck]- True if this outcome represents an ability/skill check (optional).
 */

/**
 * Normalizes an interaction object to ensure a consistent structure.
 * @param {Interaction} interaction
 * @returns {InteractionOutcome}
 */
export default function resolveCheck(interaction) {
  //ToDo: Do error checks for if the rate is not a number.
  const interactionOutcome = {
    rate: interaction.success ? 1 : 0,
    abilityCheck: interaction.success,
  };

  return interactionOutcome;
}
