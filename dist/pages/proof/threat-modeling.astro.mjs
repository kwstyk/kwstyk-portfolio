/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Threat Modeling（脅威モデリング）</h1> <section> <h2>仮テーマ：シンプルな社内システムに対する脅威モデリング実践</h2> <p>仮想的な社内情報共有システムを対象に、STRIDEなどのフレームワークを用いて脅威モデリングを実施し、リスク分析と対策立案を体系化する予定。</p> <ul> <li>アセット・データフロー・エントリポイントの特定</li> <li>脅威リスト作成とリスクレベル評価</li> <li>緩和策（Mitigation）提案と実装優先順位付け</li> </ul> <p>システム設計段階におけるセキュリティリスク管理能力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/threat-modeling/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/threat-modeling/index.astro";
const $$url = "/proof/threat-modeling";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
