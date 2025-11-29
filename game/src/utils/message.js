/**
 * @typedef {Object} Interaction
 * @property {string} [type]           - Will always be handshake
 * @property {string} [challenge]      - What challenge should be solved?
 * @property {boolean} [success]       - Did it work?
 */

/**
 * Normalizes an interaction object to ensure a consistent structure.
 * @param {Interaction} interaction
 * @returns {Interaction}
 */
function normalizeInteraction(interaction) {
  const possibleChallenges = ["Scrambler", "Flashcard"];
  return {
    type: "handshake",
    challenge: possibleChallenges.includes(
      interaction.challenge
    )
      ? interaction.challenge
      : "Scrambler",
    success:
      typeof interaction.success === "boolean"
        ? interaction.success
        : false,
  };
}

/**
 * Sends an interaction request to the parent window and waits for a response.
 * @param {Interaction} interaction
 * @returns {Promise<Interaction>}
 */
export default async function initiateHandshake(
  interaction
) {
  console.log("initiating handshake");
  const normalized = normalizeInteraction(interaction);

  // Send request to parent
  window.parent.postMessage(
    {
      ...normalized,
    },
    "*"
  );

  // Wait for parent's response
  return await waitForHandshakeResponse();
}

/**
 * Waits for the parent's handshake response and returns normalized data.
 * @returns {Promise<Interaction>}
 */
function waitForHandshakeResponse() {
  console.log("waiting for handshake response");
  return new Promise((resolve) => {
    function handler(event) {
      if (event.data?.type === "handshake") {
        window.removeEventListener("message", handler);
        resolve(normalizeInteraction(event.data));
      }
    }

    window.addEventListener("message", handler);
  });
}
