import initiateHandshake from "../utils/message";
/**
 * @typedef {Object} Interaction
 * @property {string} [challenge]      - What challenge should be solved?
 * @property {boolean} [abilityCheck]       - Did it work?
 */

/**
 * @typedef {Object} InteractionResult
 * @property {number}   [rate]
 * @property {boolean}  [abilityCheck] - True if this outcome represents an ability/skill check (optional).
 */

/**
 * Normalizes an interaction object to ensure a consistent structure.
 * @param {Interaction} interaction
 * @returns {InteractionResult}
 */
function resolveCheck(interaction) {
    //ToDo: Do error checks for if the rate is not a number.
    const interactionOutcome = {
        rate: interaction.abilityCheck ? 1 : 0,
        abilityCheck: interaction.abilityCheck
            ? true
            : false,
    };

    return interactionOutcome;
}

/**
@typedef {Object} Interaction
@property {string} challenge
@property {boolean} abilityCheck
*/

/**

@typedef {Object} InteractionResult
@property {number} rate
@property {boolean} abilityCheck
*/

/**

Handles a full challenge → handshake → resolveCheck flow.

Applies target restrictions and returns a normalized InteractionResult.

@param {Interaction} interaction

@param {Function} effect
@returns {Promise<InteractionResult>}
*/
export default async function runInteractionCheck(
    interaction
) {
    // Perform handshake
    const handshakeResult = await initiateHandshake(
        interaction
    );
    console.log("handshake result");
    console.log(handshakeResult);
    // Normalize result into { rate, abilityCheck }
    const modifier = resolveCheck(handshakeResult);

    if (typeof modifier.rate !== "number") {
        throw new Error("Modifier rate must be a number");
    }
    console.log("modifier");
    console.log(modifier);

    return {
        rate: modifier.rate,
        abilityCheck: modifier.abilityCheck,
    };
}
