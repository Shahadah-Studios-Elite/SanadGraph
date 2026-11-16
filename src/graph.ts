import { NarratorNode, GRADE_COLORS } from "./types.js";

declare const cytoscape: any;

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

        container.style.background = "radial-gradient(circle at center, #0d2b1d 0%, #061810 100%)";

        const elements = this.buildElements(nodes);

        this.cy = cytoscape({
            container,
            elements,
            wheelSensitivity: 0.25,
            style: [
                {
                    selector: "node",
                    style: {
                        "background-color": "#0f2e20",
                        "border-width": 2.5,
                        "border-color": "data(color)",
                        "label": "data(label)",
                        "color": "#f8fafc",
                        "text-valign": "center",
                        "text-halign": "center",
                        "font-size": "11px",
                        "font-weight": "600",
                        "text-wrap": "wrap",
                        "text-max-width": "135px",
                        "width": "155px",
                        "height": "52px",
                        "shape": "round-rectangle",
                        "shadow-blur": 14,
                        "shadow-color": "data(color)",
                        "shadow-opacity": 0.45,
                        "transition-property": "border-width, shadow-opacity, background-color",
                        "transition-duration": "0.2s"
                    }
                },
                {
                    selector: "node[grade = 'prophet']",
                    style: {
                        "background-color": "#2b2105",
                        "border-color": "#d4af37",
                        "border-width": 3.5,
                        "color": "#fef08a",
                        "font-size": "12px",
                        "font-weight": "800",
                        "width": "185px",
                        "height": "58px",
                        "shadow-blur": 22,
                        "shadow-color": "#d4af37",
                        "shadow-opacity": 0.8
                    }
                },
                {
                    selector: "node:selected",
                    style: {
                        "background-color": "#164e35",
                        "border-width": 4,
                        "border-color": "#fef08a",
                        "shadow-opacity": 0.95
                    }
                },
                {
                    selector: "edge",
                    style: {
                        "width": 2.2,
                        "line-color": "#34d399",
                        "target-arrow-color": "#34d399",
                        "target-arrow-shape": "triangle",
                        "arrow-scale": 0.9,
                        "curve-style": "bezier",
                        "opacity": 0.85
                    }
                },
                {
                    selector: "edge[?broken]",
                    style: {
                        "line-color": "#f87171",
                        "target-arrow-color": "#f87171",
                        "line-style": "dashed",
                        "width": 2.5
                    }
                }
            ],
            layout: {
                name: "breadthfirst",
                directed: true,
                roots: "#prophet",
                padding: 35,
                spacingFactor: 1.35,
                animate: true,
                animationDuration: 400
            }
        });

        this.cy.ready(() => {
            this.cy.fit(undefined, 35);
        });

        this.cy.on("tap", "node", (evt: any) => {
            const raw: NarratorNode = evt.target.data("raw");
            this.onNodeClick(raw, this.nodes);
        });
    }

    public fit(): void {
        if (this.cy) this.cy.fit(undefined, 35);
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
                    grade: node.grade,
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
