export type NarratorGrade = "prophet" | "sahabi" | "thiqah" | "saduq" | "daif" | "matruk";

export interface NarratorNode {
    id: string;
    name: string;
    deathAH: number;
    rank: string;
    grade: NarratorGrade;
    gradeLabel: string;
    bio: string;
    parentId?: string;
    brokenLink?: boolean;
}

export interface HadithChain {
    title: string;
    text: string;
    verdict: "sahih" | "daif";
    nodes: NarratorNode[];
}

export const GRADE_COLORS: Record<NarratorGrade, string> = {
    prophet: "#d4af37",
    sahabi: "#0f5132",
    thiqah: "#16a34a",
    saduq: "#0284c7",
    daif: "#dc2626",
    matruk: "#7f1d1d"
};

export const GRADE_LABELS: Record<NarratorGrade, string> = {
    prophet: "Source of Revelation",
    sahabi: "Sahabi ('Adl)",
    thiqah: "Thiqah (Trustworthy)",
    saduq: "Saduq (Truthful)",
    daif: "Da'if (Weak)",
    matruk: "Matruk (Abandoned)"
};
