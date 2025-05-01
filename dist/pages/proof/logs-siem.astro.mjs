/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Logs & SIEM（ログ分析・SIEM運用）</h1> <section> <h2>仮テーマ：社内SIEM運用設計とログ分析基盤構築</h2> <p>仮想企業を想定し、SIEM（Security Information and Event Management）運用設計、および社内ログ分析環境の設計・構築を行うプロジェクト。</p> <ul> <li>Windowsログ、Linuxログ、ネットワーク機器ログの収集設計</li> <li>オープンソースSIEM（例：Wazuh、Elastic Stack）による運用設計</li> <li>インシデント検知ルールとアラート設計</li> </ul> <p>ログ活用による脅威検知力と運用設計力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/logs-siem/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/logs-siem/index.astro";
const $$url = "/proof/logs-siem";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
