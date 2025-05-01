/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>AD Security（Active Directoryセキュリティ）</h1> <section> <h2>仮テーマ：中小規模企業向けActive Directoryセキュリティ設計</h2> <p>仮想企業を想定し、Active Directory環境の導入から、アカウント管理、グループポリシー（GPO）設計、アクセス制御のベストプラクティスに基づいたセキュリティ強化案を策定・検証する予定。</p> <ul> <li>最小権限の原則に基づくOU・グループ設計</li> <li>パスワードポリシー・MFA強制・監査設定</li> <li>ADログ監視による異常検知フロー構築</li> </ul> <p>ディレクトリサービス環境における認証・認可設計力と、運用リスク低減策の設計実装力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/ad-security/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/ad-security/index.astro";
const $$url = "/proof/ad-security";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
