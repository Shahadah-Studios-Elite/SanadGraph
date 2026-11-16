import { NarratorNode, NarratorGrade, GRADE_LABELS } from "./types.js";
import { PRESET_CHAINS } from "./data.js";
import { SanadVisualizer } from "./graph.js";

const visualizer = new SanadVisualizer((node, allNodes) => {
    showInspector(node, allNodes);
});

function showInspector(node: NarratorNode, allNodes: NarratorNode[]): void {
    const card = document.getElementById("inspector-content")!;
    card.classList.remove("hidden");

    document.getElementById("insp-rank")!.textContent = node.rank;
    const gradeEl = document.getElementById("insp-grade")!;
    gradeEl.textContent = node.gradeLabel;

    const isWeak = node.grade === "daif" || node.grade === "matruk";
    gradeEl.style.background = isWeak ? "#fee2e2" : "#dcfce7";
    gradeEl.style.color = isWeak ? "#991b1b" : "#166534";

    document.getElementById("insp-name")!.textContent = node.name;
    document.getElementById("insp-dates")!.textContent = `Died: ${node.deathAH} AH`;
    document.getElementById("insp-bio")!.textContent = node.bio;

    const contEl = document.getElementById("insp-continuity")!;
    if (!node.parentId) {
        contEl.textContent = "Primary Source of the Hadith.";
        contEl.style.color = "#166534";
    } else {
        const teacher = allNodes.find(n => n.id === node.parentId);
        if (teacher) {
            const gap = node.deathAH - teacher.deathAH;
            if (node.brokenLink || gap > 75 || gap < 0) {
                contEl.textContent = `⚠️ Disconnected (Munqati'): ${gap} years between deaths of ${teacher.name} (${teacher.deathAH} AH) and ${node.name} (${node.deathAH} AH).`;
                contEl.style.color = "#dc2626";
            } else {
                contEl.textContent = `✅ Connected (Muttasil): ${gap}-year difference with teacher ${teacher.name} (${teacher.deathAH} AH) confirms direct transmission.`;
                contEl.style.color = "#166534";
            }
        }
    }
}

function updateUI(nodes: NarratorNode[]): void {
    // Update Teacher Dropdown
    const select = document.getElementById("parent-select") as HTMLSelectElement;
    select.innerHTML = `<option value="">Narrated From (Select Teacher)...</option>`;
    nodes.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n.id;
        opt.textContent = `${n.name} (${n.deathAH} AH)`;
        select.appendChild(opt);
    });

    // Update Chain Verdict Pill
    const verdictEl = document.getElementById("chain-verdict")!;
    const hasWeak = nodes.some(n => n.grade === "daif" || n.grade === "matruk" || n.brokenLink);
    if (hasWeak) {
        verdictEl.className = "verdict-pill daif";
        verdictEl.textContent = "DA'IF / WEAK OR BROKEN SANAD";
    } else {
        verdictEl.className = "verdict-pill sahih";
        verdictEl.textContent = "SAHIH (AUTHENTIC • CONTINUOUS SANAD)";
    }
}

function loadPreset(key: string): void {
    const preset = PRESET_CHAINS[key];
    if (!preset) return;
    document.getElementById("hadith-text")!.textContent = preset.text;
    document.getElementById("inspector-content")!.classList.add("hidden");

    const clonedNodes: NarratorNode[] = JSON.parse(JSON.stringify(preset.nodes));
    visualizer.render(clonedNodes);
    updateUI(clonedNodes);
}

document.addEventListener("DOMContentLoaded", () => {
    const hadithSelect = document.getElementById("hadith-select") as HTMLSelectElement;
    hadithSelect.addEventListener("change", () => loadPreset(hadithSelect.value));

    document.getElementById("fit-btn")!.addEventListener("click", () => visualizer.fit());

    document.getElementById("toggle-builder-btn")!.addEventListener("click", () => {
        document.getElementById("builder-bar")!.classList.toggle("hidden");
    });

    document.getElementById("add-node-btn")!.addEventListener("click", () => {
        const nameInput = document.getElementById("new-name") as HTMLInputElement;
        const deathInput = document.getElementById("new-death") as HTMLInputElement;
        const gradeSelect = document.getElementById("new-grade") as HTMLSelectElement;
        const parentSelect = document.getElementById("parent-select") as HTMLSelectElement;

        const name = nameInput.value.trim();
        const deathAH = parseInt(deathInput.value, 10);
        const grade = gradeSelect.value as NarratorGrade;
        const parentId = parentSelect.value;

        if (!name || isNaN(deathAH)) {
            alert("Please enter both a narrator name and Hijri death year.");
            return;
        }

        const currentNodes = visualizer.getNodes();
        const teacher = currentNodes.find(n => n.id === parentId);
        const broken = teacher ? (deathAH - teacher.deathAH > 75 || deathAH < teacher.deathAH) : false;

        currentNodes.push({
            id: "custom_" + Date.now(),
            name,
            deathAH,
            rank: "Custom Narrator",
            grade,
            gradeLabel: GRADE_LABELS[grade],
            bio: "Added manually via SanadGraph Custom Chain Builder.",
            parentId: parentId || undefined,
            brokenLink: broken
        });

        nameInput.value = "";
        deathInput.value = "";
        visualizer.render(currentNodes);
        updateUI(currentNodes);
    });

    loadPreset("intentions");
});
