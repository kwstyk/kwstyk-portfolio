/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BBzQKoZV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>DevSecOps（セキュア開発・CI/CD）</h1> <section> <h2>仮テーマ：CI/CDパイプラインにおけるセキュリティチェック組み込み実験</h2> <p>仮想プロジェクトを想定し、GitHub ActionsやGitLab CI/CDなどを用いたパイプラインに、セキュリティスキャン（SAST、依存関係チェック）を自動組み込みするプロセスを設計・検証する予定。</p> <ul> <li>ソースコード静的解析ツール（SAST）のパイプライン統合</li> <li>依存関係スキャンツール（OSSライブラリ脆弱性検出）の組み込み</li> <li>ビルド・デプロイ時のセキュリティゲート設計</li> </ul> <p>DevSecOps実践に必要なセキュリティチェック自動化設計力と、運用導入力を証明する。</p> </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/devsecops/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/devsecops/index.astro";
const $$url = "/proof/devsecops";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
