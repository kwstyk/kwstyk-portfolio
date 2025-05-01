/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, g as renderSlot, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_C72JZnID.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$Hero } from '../chunks/Hero_DTZbtAqQ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    href,
    class: className,
    type = "button"
  } = Astro2.props;
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "button",
    { ghost: variant === "ghost" },
    className
  ], "class:list")}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute(type, "type")}${addAttribute([
    "button",
    { ghost: variant === "ghost" },
    className
  ], "class:list")}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "C:/Users/kwsty/lonely-limit/src/components/atoms/Button.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-background"> ${renderComponent($$result2, "Hero", $$Hero, { "title": "\u6210\u9577\u3068\u5B9F\u7E3E\u3092\u8A3C\u660E\u3059\u308B\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA", "subtitle": "\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3 \xD7 \u30A4\u30F3\u30D5\u30E9 \xD7 \u904B\u7528\u306E\u5168\u65B9\u4F4D\u30B9\u30AD\u30EB\u306B\u6311\u6226" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "variant": "primary", "href": "/structure/" }, { "default": ($$result4) => renderTemplate`
Structureを見る
` })} ${renderComponent($$result3, "Button", $$Button, { "variant": "ghost", "href": "/proof/" }, { "default": ($$result4) => renderTemplate`
Proofを見る
` })} ` })} <h1 class="title">My Astro Portfolio</h1> <p class="catchcopy">実証と成長の記録 — Proof-Based Portfolio</p> <section class="intro section-spacing"> <h2>自己紹介</h2> <p>セキュリティエンジニアを目指して、実践と学習を重ねています。</p> <p>本サイトはその成長過程と実績を、具体的な証明（Proof）を通じて可視化するポートフォリオです。</p> </section> <section class="intro section-spacing"> <h2>保有資格</h2> <ul class="qualification-list"> <li>情報処理安全確保支援士（受験予定）</li> <li>応用情報技術者</li> <li>ITパスポート</li> </ul> <input type="checkbox" id="toggle-other" class="accordion-toggle"> <label for="toggle-other" class="accordion-label">その他の資格</label> <div class="accordion-content"> <ul class="qualification-list"> <li>宅地建物取引士</li> <li>インテリアコーディネーター</li> <li>2級建築施工管理技士補</li> <li>ファイナンシャル・プランニング技能士3級</li> <li>普通自動車免許</li> </ul> </div> <div class="cta-section"> ${renderComponent($$result2, "Button", $$Button, { "href": "/structure/", "variant": "primary" }, { "default": ($$result3) => renderTemplate`
Structureページを見る
` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/story/", "variant": "ghost" }, { "default": ($$result3) => renderTemplate`
成長物語を読む
` })} </div> </section> <div class="button-group"> ${renderComponent($$result2, "Button", $$Button, { "variant": "primary", "href": "/structure" }, { "default": ($$result3) => renderTemplate`Structureを見る` })} ${renderComponent($$result2, "Button", $$Button, { "variant": "ghost", "href": "/proof" }, { "default": ($$result3) => renderTemplate`Proofを見る` })} </div> </div> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
