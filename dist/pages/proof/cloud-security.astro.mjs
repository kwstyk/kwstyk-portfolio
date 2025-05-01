/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Cloud Security（クラウドセキュリティ）</h1> <section> <h2>仮テーマ：AWS IAMベストプラクティス検証</h2> <p>AWS環境におけるIdentity and Access Management（IAM）設定のベストプラクティスを学び、実際に設定・検証し、リスク低減の効果を確認する予定。</p> <ul> <li>最小権限の原則（Principle of Least Privilege）適用</li> <li>IAMポリシー設計とロール分離</li> <li>多要素認証（MFA）強制適用の実験</li> </ul> <p>クラウド環境における認可管理の実践力と、セキュリティ設計力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/cloud-security/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/cloud-security/index.astro";
const $$url = "/proof/cloud-security";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
