import { HadithChain } from "./types.js";

export const PRESET_CHAINS: Record<string, HadithChain> = {
    intentions: {
        title: "Hadith of Intentions (Multi-Branch Tree)",
        text: '"Verily, actions are judged by intentions..." — Sahih al-Bukhari 1, Sahih Muslim 1907, Abu Dawud 2201, Tirmidhi 1647',
        verdict: "sahih",
        nodes: [
            // Root
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Source", grade: "prophet", gradeLabel: "Messenger of Allah", bio: "Delivered this foundational Hadith on the pulpit in Madinah." },
            // Gen 1
            { id: "umar", name: "Umar ibn al-Khattab", deathAH: 23, rank: "Sahabi", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "Second Caliph; narrated this solely at the beginning before it spread widely.", parentId: "prophet" },
            // Gen 2
            { id: "alqamah", name: "Alqamah ibn Waqqas", deathAH: 73, rank: "Senior Tabi'i", grade: "thiqah", gradeLabel: "Thiqah", bio: "Senior Madinan Tabi'i who heard directly from Umar.", parentId: "umar" },
            // Gen 3
            { id: "muhammad", name: "Muhammad b. Ibrahim", deathAH: 120, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah", bio: "Trusted Madinan jurist.", parentId: "alqamah" },
            // Gen 4 (Branching Hub!)
            { id: "yahya", name: "Yahya ibn Sa'id al-Ansari", deathAH: 143, rank: "Junior Tabi'i", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "The great branching point: over 200 scholars narrated this Hadith from Yahya.", parentId: "muhammad" },
            // Gen 5 (4 Major Branches from Yahya!)
            { id: "sufyan_u", name: "Sufyan ibn Uyaynah", deathAH: 198, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Thiqah Hafiz", bio: "Grand Imam of Makkah.", parentId: "yahya" },
            { id: "malik", name: "Imam Malik ibn Anas", deathAH: 179, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Imam Dar al-Hijrah", bio: "Imam of Madinah; included this in Al-Muwatta.", parentId: "yahya" },
            { id: "shubah", name: "Shu'bah ibn al-Hajjaj", deathAH: 160, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Amir al-Mu'minin", bio: "Pioneer of Hadith criticism in Basra.", parentId: "yahya" },
            { id: "hammad", name: "Hammad ibn Zayd", deathAH: 179, rank: "Atba' al-Tabi'in", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "Leading Basran Hadith master.", parentId: "yahya" },
            // Gen 6 (Compilers & Great Imams)
            { id: "humaydi", name: "Al-Humaydi", deathAH: 219, rank: "Shaykh al-Bukhari", grade: "thiqah", gradeLabel: "Thiqah Hafiz", bio: "Teacher of Imam al-Bukhari in Makkah.", parentId: "sufyan_u" },
            { id: "bukhari", name: "Imam al-Bukhari", deathAH: 256, rank: "Compiler", grade: "thiqah", gradeLabel: "Sahih al-Bukhari #1", bio: "Recorded this as the very first Hadith in his Sahih.", parentId: "humaydi" },
            { id: "qanabi", name: "Abdullah al-Qa'nabi", deathAH: 221, rank: "Scholar", grade: "thiqah", gradeLabel: "Thiqah 'Abid", bio: "Top student of Imam Malik.", parentId: "malik" },
            { id: "abudawud", name: "Imam Abu Dawud", deathAH: 275, rank: "Compiler", grade: "thiqah", gradeLabel: "Sunan Abi Dawud #2201", bio: "Recorded via al-Qa'nabi from Malik.", parentId: "qanabi" },
            { id: "ghundar", name: "Muhammad b. Ja'far (Ghundar)", deathAH: 193, rank: "Scholar", grade: "thiqah", gradeLabel: "Thiqah", bio: "Most accurate student of Shu'bah.", parentId: "shubah" },
            { id: "muslim", name: "Imam Muslim", deathAH: 261, rank: "Compiler", grade: "thiqah", gradeLabel: "Sahih Muslim #1907", bio: "Recorded in Kitab al-Imarah.", parentId: "ghundar" },
            { id: "tirmidhi", name: "Imam al-Tirmidhi", deathAH: 279, rank: "Compiler", grade: "thiqah", gradeLabel: "Jami' al-Tirmidhi #1647", bio: "Graded it Hasan Sahih.", parentId: "hammad" }
        ]
    },
    gold_chain: {
        title: "Silsilat al-Dhahab (Branching Golden Tree)",
        text: '"Do not let one of you undercut the sale of his brother..." — Transmitted across the Four Imams & Six Books',
        verdict: "sahih",
        nodes: [
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Source", grade: "prophet", gradeLabel: "Source", bio: "Source of the Sunnah." },
            { id: "ibnumar", name: "Abdullah ibn Umar", deathAH: 73, rank: "Sahabi", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "Preserved thousands of narrations in Madinah.", parentId: "prophet" },
            { id: "nafi", name: "Nafi' Mawla Ibn Umar", deathAH: 117, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "Served Ibn Umar for over 30 years.", parentId: "ibnumar" },
            { id: "salim", name: "Salim ibn Abdullah", deathAH: 106, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah Faqih", bio: "Son of Ibn Umar and one of the Seven Fuqaha of Madinah.", parentId: "ibnumar" },
            { id: "malik", name: "Imam Malik ibn Anas", deathAH: 179, rank: "Imam", grade: "thiqah", gradeLabel: "Imam Dar al-Hijrah", bio: "The Golden Chain: Malik from Nafi' from Ibn Umar.", parentId: "nafi" },
            { id: "ubaydullah", name: "Ubaydullah ibn Umar", deathAH: 147, rank: "Scholar", grade: "thiqah", gradeLabel: "Thiqah Thabt", bio: "Great-grandson of Umar ibn al-Khattab.", parentId: "nafi" },
            { id: "zuhri", name: "Ibn Shihab al-Zuhri", deathAH: 124, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Grand Hafiz", bio: "First official compiler of Hadith.", parentId: "salim" },
            { id: "shafii", name: "Imam al-Shafi'i", deathAH: 204, rank: "Mujtahid", grade: "thiqah", gradeLabel: "Founder of Shafi'i Madhhab", bio: "Narrated directly from Imam Malik.", parentId: "malik" },
            { id: "bukhari", name: "Imam al-Bukhari", deathAH: 256, rank: "Compiler", grade: "thiqah", gradeLabel: "Sahih al-Bukhari", bio: "Recorded via Malik → Nafi' → Ibn Umar.", parentId: "malik" },
            { id: "muslim", name: "Imam Muslim", deathAH: 261, rank: "Compiler", grade: "thiqah", gradeLabel: "Sahih Muslim", bio: "Recorded via Ubaydullah → Nafi' → Ibn Umar.", parentId: "ubaydullah" },
            { id: "ahmad", name: "Imam Ahmad ibn Hanbal", deathAH: 241, rank: "Compiler", grade: "thiqah", gradeLabel: "Al-Musnad", bio: "Recorded via al-Zuhri → Salim → Ibn Umar.", parentId: "zuhri" }
        ]
    },
    broken_example: {
        title: "Comparison: Valid vs. Broken (Munqati') Branches",
        text: 'Compare how one branch remains continuous (solid green) while another branch breaks due to a missing link (dashed red).',
        verdict: "daif",
        nodes: [
            { id: "prophet", name: "Prophet Muhammad ﷺ", deathAH: 11, rank: "Source", grade: "prophet", gradeLabel: "Source", bio: "Source of the narration." },
            { id: "umar", name: "Umar ibn al-Khattab", deathAH: 23, rank: "Sahabi", grade: "sahabi", gradeLabel: "Sahabi ('Adl)", bio: "Martyred in 23 AH.", parentId: "prophet" },
            { id: "aslam", name: "Aslam Mawla Umar", deathAH: 80, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah (Connected)", bio: "Freedman of Umar; heard directly from him for years.", parentId: "umar" },
            { id: "hasan", name: "Al-Hasan al-Basri", deathAH: 110, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah (No Sama' from Umar)", bio: "Born in 21 AH (2 years old when Umar died). Did not hear directly from Umar.", parentId: "umar", brokenLink: true },
            { id: "zayd", name: "Zayd ibn Aslam", deathAH: 136, rank: "Tabi'i", grade: "thiqah", gradeLabel: "Thiqah", bio: "Narrated reliably from his father Aslam.", parentId: "aslam" },
            { id: "weak_narrator", name: "Unverified Transmitter", deathAH: 165, rank: "Transmitter", grade: "daif", gradeLabel: "Da'if (Weak Memory)", bio: "Frequent mistakes in attribution.", parentId: "hasan" }
        ]
    }
};
