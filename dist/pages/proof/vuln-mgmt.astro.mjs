/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Vulnerability Management（脆弱性管理）</h1> <section> <h2>仮テーマ：社内端末に対する脆弱性スキャン・パッチ運用設計</h2> <p>仮想組織における社内端末（Windows/Linux）を対象に、脆弱性スキャンの実施・リスク評価・パッチ適用運用までの一連の管理プロセスを設計・検証する予定。</p> <ul> <li>オープンソース脆弱性スキャナ（例：OpenVAS, Nessus）の適用検証</li> <li>脆弱性評価基準（CVSS）に基づくリスク分類</li> <li>パッチ適用優先順位付けと適用フロー設計</li> </ul> <p>脆弱性管理ライフサイクルを運用レベルで設計し、リスク低減への具体的アプローチ力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/vuln-mgmt/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/vuln-mgmt/index.astro";
const $$url = "/proof/vuln-mgmt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
