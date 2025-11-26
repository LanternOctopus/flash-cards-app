import { BaseChoice, BasePassage, BaseConversation } from "../types";

export class ConversationController<
  Conv extends BaseConversation,
  ChoiceExt extends BaseChoice = BaseChoice
> {
  public conversation: Conv & {
    start: keyof Conv["passages"] & string;
    passages: {
      [K in keyof Conv["passages"]]: BasePassage & {
        readonly choices?: (ChoiceExt & {
          next: keyof Conv["passages"] & string;
        })[];
      };
    };
  };

  constructor(
    conversation: ConversationController<Conv, ChoiceExt>["conversation"]
  ) {
    this.conversation = conversation;
  }
  getSpeaker() {
    const name = this.conversation.defaultSpeakerName;
    const role = this.conversation.defaultSpeakerRole;
    const image = this.conversation.defaultSpeakerImage;

    return {
      ...(name && { name }),
      ...(role && { role }),
      ...(image && { image }),
    };
  }

  /**
   * Yields passages in conversation flow. At each step, you can provide
   * the choice to follow; otherwise it defaults to the first choice.
   */
  *getPassagesInteractive(
    startId?: keyof Conv["passages"] & string
  ): Generator<
    BasePassage & {
      readonly choices?: (ChoiceExt & {
        next: keyof Conv["passages"] & string;
      })[];
    },
    keyof Conv["passages"] | undefined,
    keyof Conv["passages"] | undefined
  > {
    type PassageId = keyof Conv["passages"] & string;
    let currentId: PassageId =
      startId ?? (this.conversation.start as PassageId);

    while (true) {
      const passage = this.conversation.passages[currentId];
      if (!passage) {
        throw new Error(
          `Conversation is missing passage "${currentId}". ` +
            "Check 'start' and all 'next' pointers."
        );
      }
      // Yield the current passage and wait for the user's next choice
      const selectedNext = yield passage;

      // If no choices or empty, conversation ends
      if (!passage.choices || passage.choices.length === 0) {
        return undefined;
      }

      // If the user provides a next choice, follow it
      if (selectedNext) {
        const nextId = selectedNext as PassageId;
        if (!passage.choices.some((c) => c.next === selectedNext)) {
          throw new Error(
            `Invalid choice: ${String(
              selectedNext
            )} is not a valid next passage from "${currentId}"`
          );
        }
        currentId = nextId;
      } else {
        // Default to first choice
        currentId = passage.choices[0].next as keyof Conv["passages"] & string;
      }
    }
  }
}
