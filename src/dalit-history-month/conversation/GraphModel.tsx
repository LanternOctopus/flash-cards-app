export type CoreChoice = {
    next: string;
    condition?: string;
    [key: string]: any; // allow anything else
};

export type CoreNode = {
    id: string;
    choices?: CoreChoice[];
    [key: string]: any; // fully flexible payload
};

export type CoreGraph = {
    start: string;
    nodes: Record<string, CoreNode>;
    [key: string]: any; // allow global metadata too
};

export class GraphController<
    G extends CoreGraph = CoreGraph,
> {
    public graph: G;

    constructor(graph: G) {
        this.graph = graph;
    }

    /**
     * Generic interactive traversal.
     * Yields the current node, waits for next node id.
     */
    *traverse(
        startId?: string,
    ): Generator<
        CoreNode,
        string | undefined,
        string | undefined
    > {
        let currentId = startId ?? this.graph.start;

        while (true) {
            const node = this.graph.nodes[currentId];

            if (!node) {
                throw new Error(
                    `Graph is missing node "${currentId}".`,
                );
            }

            // yield current node
            const selectedNext = yield node;

            // end if no choices
            if (
                !node.choices ||
                node.choices.length === 0
            ) {
                return undefined;
            }

            // follow user input or default
            if (selectedNext) {
                currentId = selectedNext;
            } else {
                currentId = node.choices[0].next;
            }
        }
    }
}
