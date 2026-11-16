import { NarratorNode, GRADE_COLORS } from "./types.js";

declare const cytoscape: any;
declare const cytoscapeDagre: any;

if (typeof cytoscapeDagre !== "undefined") {
    cytoscape.use(cytoscapeDagre);
}

export class SanadVisualizer {
    private cy: any = null;
    private nodes: NarratorNode[] = [];
    private onNodeClick: (node: NarratorNode, allNodes: NarratorNode[]) => void;

    constructor(onNodeClick: (node: NarratorNode, allNodes: NarratorNode[]) => void) {
        this.onNodeClick = onNodeClick;
    }

    public render(nodes: NarratorNode[]): void {
        this.nodes = nodes;
        const container = document.getElementById("cy");
        if (!container) return;

        const elements = this.buildElements(nodes);

        this.cy = cytoscape({
            container,
            elements,
            style: [
                {
                    selector: "node",
                    style: {
                        "background-color": "data(color)",
                        "label": "data(label)",
                        "color": "#ffffff",
                        "text-valign": "center",
                        "text-halign": "center",
                        "font-size": "11px",
                        "font-weight": "bold",
                        "text-wrap": "wrap",
                        "text-max-width": "130px",
                        "width": "145px",
                        "height": "54px",
                        "shape": "round-rectangle",
                        "border-width": 2,
                        "border-color": "#093621"
                    }
                },
                {
                    selector: "node:selected",
                    style: { "border-width": 4, "border-color": "#d4af37" }
                },
                {
                    selector: "edge",
                    style: {
                        "width": 3,
                        "line-color": "#0f5132",
                        "target-arrow-color": "#0f5132",
                        "target-arrow-shape": "triangle",
                        "curve-style": "bezier"
                    }
                },
                {
                    selector: "edge[?broken]",
                    style: {
                        "line-color": "#dc2626",
                        "target-arrow-color": "#dc2626",
                        "line-style": "dashed"
                    }
                }
            ],
            layout: {
                name: typeof cytoscapeDagre !== "undefined" ? "dagre" : "breadthfirst",
                rankDir: "TB",
                nodeSep: 40,
                rankSep: 65
            }
        });

        this.cy.on("tap", "node", (evt: any) => {
            const raw: NarratorNode = evt.target.data("raw");
            this.onNodeClick(raw, this.nodes);
        });
    }

    public fit(): void {
        if (this.cy) this.cy.fit(undefined, 30);
    }

    public getNodes(): NarratorNode[] {
        return this.nodes;
    }

    private buildElements(nodes: NarratorNode[]): any[] {
        const elements: any[] = [];
        const nodeMap = new Map<string, NarratorNode>();
        nodes.forEach(n => nodeMap.set(n.id, n));

        nodes.forEach(node => {
            elements.push({
                data: {
                    id: node.id,
                    label: `${node.name}\n(${node.deathAH} AH)`,
                    color: GRADE_COLORS[node.grade],
                    raw: node
                }
            });

            if (node.parentId && nodeMap.has(node.parentId)) {
                const teacher = nodeMap.get(node.parentId)!;
                const gap = node.deathAH - teacher.deathAH;
                const isBroken = Boolean(node.brokenLink || gap > 75 || gap < 0);

                elements.push({
                    data: {
                        id: `${node.parentId}->${node.id}`,
                        source: node.parentId,
                        target: node.id,
                        broken: isBroken
                    }
                });
            }
        });

        return elements;
    }
}
