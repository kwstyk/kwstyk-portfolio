/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>OS Hardening（OSセキュリティ強化）</h1> <section> <h2>仮テーマ：UbuntuサーバーのOSハードニング設定</h2> <p>仮想マシン上に構築したUbuntuサーバーを対象に、OSレベルのセキュリティ強化設定（ハードニング）を施し、手順と効果を体系化する予定。</p> <ul> <li>不要サービスの停止と削除</li> <li>ファイアウォール（UFW）設定とポート制御</li> <li>ユーザー権限管理とログ監査設定</li> </ul> <p>セキュリティベースラインに沿ったOS設定力と、リスク低減の実践力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/os-hardening/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/os-hardening/index.astro";
const $$url = "/proof/os-hardening";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
