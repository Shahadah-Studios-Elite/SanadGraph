import { HadithChain } from "./types.js";

export const PRESET_CHAINS: Record<string, HadithChain> = {
    intentions: {
        title: "Hadith of Intentions",
        text: '"Verily, actions are judged by intentions, and every person shall have what they intended." — Sahih al-Bukhari 1',
        verdict: "sahih",
        nodes: [
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Messenger of Allah", grade: "prophet", gradeLabel: "Source of Revelation", bio: "Delivered this foundational Hadith on the pulpit in Madinah." },
            { id: "umar", name: "Umar ibn al-Khattab", deathAH: 23, rank: "Sahabi (Companion)", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "Second Caliph of Islam; heard this Hadith directly from the Prophet ﷺ.", parentId: "prophet" },
            { id: "alqamah", name: "Alqamah ibn Waqqas", deathAH: 73, rank: "Senior Tabi'i", grade: "thiqah", gradeLabel: "Thiqah (Trustworthy)", bio: "Reputable Madinan Tabi'i who narrated directly from Umar ibn al-Khattab.", parentId: "umar" },
            { id: "muhammad", name: "Muhammad ibn Ibrahim al-Taymi", deathAH: 120, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah (Trustworthy)", bio: "Trusted Madinan jurist and transmitter from Alqamah.", parentId: "alqamah" },
            { id: "yahya", name: "Yahya ibn Sa'id al-Ansari", deathAH: 143, rank: "Junior Tabi'i", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "Qadi of Madinah; over 200 scholars narrated this Hadith from him.", parentId: "muhammad" },
            { id: "sufyan", name: "Sufyan ibn Uyaynah", deathAH: 198, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Thiqah Hafiz", bio: "Grand Imam of Makkah and teacher of Imam al-Shafi'i.", parentId: "yahya" },
            { id: "bukhari", name: "Imam al-Bukhari", deathAH: 256, rank: "Compiler", grade: "thiqah", gradeLabel: "Amir al-Mu'minin in Hadith", bio: "Placed this as the opening Hadith of Al-Jami' al-Sahih.", parentId: "sufyan" }
        ]
    },
    gold_chain: {
        title: "Silsilat al-Dhahab (The Golden Chain)",
        text: '"Do not let one of you undercut the sale of his brother..." — Al-Muwatta & Sahih al-Bukhari 2140',
        verdict: "sahih",
        nodes: [
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Messenger of Allah", grade: "prophet", gradeLabel: "Source", bio: "Source of the Sunnah." },
            { id: "ibnumar", name: "Abdullah ibn Umar", deathAH: 73, rank: "Sahabi", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "One of the most meticulous Companions in preserving the Sunnah.", parentId: "prophet" },
            { id: "nafi", name: "Nafi' Mawla Ibn Umar", deathAH: 117, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "Served and studied under Ibn Umar for over 30 years in Madinah.", parentId: "ibnumar" },
            { id: "malik", name: "Imam Malik ibn Anas", deathAH: 179, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Imam Dar al-Hijrah", bio: "Imam al-Bukhari called Malik → Nafi' → Ibn Umar the most authentic Isnad.", parentId: "nafi" },
            { id: "shafii", name: "Imam al-Shafi'i", deathAH: 204, rank: "Scholar / Mujtahid", grade: "thiqah", gradeLabel: "Thiqah Imam", bio: "Memorized Malik's Muwatta before studying directly under him in Madinah.", parentId: "malik" }
        ]
    },
    broken_example: {
        title: "Munqati' (Disconnected Chain) Case Study",
        text: 'Case Study: How Hadith scholars detect a missing link (Inqita\') when a student was too young or born after a teacher died.',
        verdict: "daif",
        nodes: [
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Messenger of Allah", grade: "prophet", gradeLabel: "Source", bio: "Source of the narration." },
            { id: "umar", name: "Umar ibn al-Khattab", deathAH: 23, rank: "Sahabi", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "Martyred in 23 AH.", parentId: "prophet" },
            { id: "hasan", name: "Al-Hasan al-Basri", deathAH: 110, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah (No Direct Sama')", bio: "Born in 21 AH (only 2 years old when Umar died in 23 AH). Hadith critics note he never heard directly from Umar.", parentId: "umar", brokenLink: true },
            { id: "weak_narrator", name: "Unverified Later Transmitter", deathAH: 165, rank: "Transmitter", grade: "daif", gradeLabel: "Da'if (Weak Memory)", bio: "Critiqued by Ibn Ma'in and Abu Hatim for frequent errors in attribution.", parentId: "hasan" }
        ]
    }
};
