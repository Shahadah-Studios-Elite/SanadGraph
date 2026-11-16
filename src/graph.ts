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

        container.style.position = "relative";
        container.style.display = "block";
        container.style.width = "100%";
        container.style.height = "560px";
        container.style.background = "radial-gradient(circle at center, #0d2b1d 0%, #061810 100%)";

        if (typeof cytoscape === "undefined") {
            container.innerHTML = `<div style="color:#fca5a5;padding:2rem;font-weight:bold;">Error: Cytoscape failed to load.</div>`;
            return;
        }

        if (this.cy) {
            this.cy.destroy();
        }

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
                        "font-weight": "bold",
                        "text-wrap": "wrap",
                        "text-max-width": "135px",
                        "width": "155px",
                        "height": "52px",
                        "shape": "round-rectangle"
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
                        "width": "185px",
                        "height": "58px"
                    }
                },
                {
                    selector: "node:selected",
                    style: {
                        "background-color": "#164e35",
                        "border-width": 4,
                        "border-color": "#fef08a"
                    }
                },
                {
                    selector: "edge",
                    style: {
                        "width": 2.5,
                        "line-color": "#34d399",
                        "target-arrow-color": "#34d399",
                        "target-arrow-shape": "triangle",
                        "curve-style": "bezier"
                    }
                },
                {
                    selector: "edge[?broken]",
                    style: {
                        "line-color": "#f87171",
                        "target-arrow-color": "#f87171",
                        "line-style": "dashed"
                    }
                }
            ],
            layout: {
                name: "breadthfirst",
                directed: true,
                roots: "#prophet",
                padding: 30,
                spacingFactor: 1.25,
                animate: false
            }
        });

        setTimeout(() => {
            if (this.cy) {
                this.cy.resize();
                this.cy.fit(this.cy.elements(), 35);
                this.cy.center();
            }
        }, 50);

        this.cy.on("tap", "node", (evt: any) => {
            const raw: NarratorNode = evt.target.data("raw");
            this.onNodeClick(raw, this.nodes);
        });
    }

    public fit(): void {
        if (this.cy) {
            this.cy.resize();
            this.cy.fit(this.cy.elements(), 35);
            this.cy.center();
        }
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
                    color: GRADE_COLORS[node.grade] || "#34d399",
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
