# ポートフォリオ構成仕様書 v1.1

---

## 1. コンセプト

- 実証（Proof）に基づくセキュリティ・システム技術ポートフォリオ
- 成長過程を透明に見せることを目的
- プロフェッショナル（採用担当者、クライアント）に伝わる構成

---

## 2. 技術スタック

- Astro
- Tailwind CSS（テーマカラー設計）
- GitHub Pages / Vercelデプロイ
- モジュール化コンポーネント構成（Atomic Design）

---

# ポートフォリオ構成仕様書（最新版）

---

## コアコンポーネント設計

### Atoms
- **Button**：variant（primary / ghost）、href
- **Badge**：type（success / warn / info）
- **Heading**：level（h1〜h4）

### Molecules
- **Card**：title、link、icon?、slot body
- **Accordion**：title、slot body
- **Navbar**：slots left/right

### Organisms
- **Hero**：title、subtitle、CTA配列
- **ProofList**：items[]（証明タイル一覧）
- **Layout**：header / footer / main のslot

### Templates
- **LandingTemplate**：トップページ専用
- **ProofPageTemplate**：Proof記事ページ専用

### Pages
- `/`：トップページ
- `/structure/`：技術要素ページ
- `/proof/`：実績証明ページ一覧
- `/proof/[slug]/`：各実績ページ
- `/story/`：成長物語ページ


---

## ディレクトリ構成（src/）

```plaintext
src/
├─ assets/        # 画像やアイコン素材
│    ├─ astro.svg
│    └─ background.svg
│
├─ components/
│    ├─ atoms/     # 小さい再利用部品
│    │    ├─ Button.astro
│    │    ├─ Badge.astro
│    │    └─ Heading.astro
│    │
│    ├─ molecules/ # 複数部品の組み合わせ
│    │    ├─ Card.astro
│    │    ├─ Accordion.astro
│    │    └─ Navbar.astro
│    │
│    └─ organisms/ # 大きな画面要素
│         ├─ Hero.astro
│         ├─ ProofList.astro
│         └─ Layout.astro
│
├─ layouts/
│    └─ Layout.astro
│
├─ pages/
│    ├─ index.astro          # Landingページ
│    ├─ structure/index.astro
│    ├─ proof/index.astro
│    ├─ proof/[slug].astro
│    └─ story/index.astro
│
├─ styles/
│    ├─ globals.css          # Reset、テーマカラー共通定義
│    ├─ landing.css          # トップページ専用スタイル
│    ├─ structure.css        # Structureページ専用スタイル
│    ├─ proof.css            # Proofページ専用スタイル
│    └─ accordion.css        # アコーディオン専用スタイル
│
├─ data/
│    └─ proof.json           # 証明メタデータ (タイトル、難易度、slug)
│
└─ utils/ （※将来拡張用）

```

---

## テーマカラー設計（globals.css内）

```css
:root {
  --bg-start:    #0d1b2a;
  --bg-mid:      #162d46;
  --bg-end:      #0a2540;
  --accent:      #61dafb;
  --text:        #e0e7ff;
  --card-bg:     #112240;
  --card-accent: #64ffda;
  --border:      #233554;
}
```

- 背景は深い青系グラデーション
- アクセントはライトブルー（目立つ水色）
- テキストは白に近い柔らかい色
- カードはさらに濃いネイビー系
- ボーダーは控えめな淡い青

**→ 全ページこのテーマカラーをベースに統一する。**

---

## 今後のCSS構成方針

- `globals.css` にテーマカラーとリセット系をまとめる
- 各ページ用CSS（landing.css, structure.css, proof.css）は最小限の追加上書きのみ
- コンポーネント単位で必要なら局所スタイル（コンポーネント内埋め込み）

---

以上が、**現時点での最新版ポートフォリオ構成仕様書**です！



## . 改善案まとめ

- globals.css作成（テーマ色、リセット統合）
- components以下にコンポーネント専用CSS配置
- pages以下にページ専用CSS配置
- StructureTemplateを新設し、Structureページも整理
- globalsレベルで背景色・基本スタイル統一
- Cardコンポーネント正式適用
- 不要なCommonコンポーネント設置は見送り（当面不要）

---

これが【ポートフォリオ構成仕様書 v1.1】の最新版であり、今後の開発方針となる。
