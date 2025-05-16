// src/data/timeline.ts

/** 来歴データの項目型 */
export interface TimelineItem {
  year:    string
  title:   string
  details: string
}

/** キャリア来歴一覧 */
export const timeline: TimelineItem[] = [
  {
    year:    "2022",
    title:   "地元密着ハウスメーカーに入社",
    details: "新卒で施工管理として入社。安全管理を担当。",
  },
  {
    year:    "2023",
    title:   "大阪に移住 オフィス空間構築会社へ転職",
    details: "福岡の天神ビックバンプロジェクトの職長も経験",
  },
  {
    year:    "2024",
    title:   "事業会社の社内SEにキャリアチェンジ",
    details: "社内システムの開発や運用、管理、ヘルプデスク業務を担当",
  },
  {
    year:    "2025",
    title:   "個人ポートフォリオ開始",
    details: "Proof‐Based ポートフォリオサイトを立ち上げ、実績を公開。",
  },
]
