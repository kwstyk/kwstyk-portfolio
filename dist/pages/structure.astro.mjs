/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_C72JZnID.mjs';
import { $ as $$Hero } from '../chunks/Hero_DTZbtAqQ.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { title, description, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="card"> <div class="card-title">${title}</div> <div class="card-description">${description}</div> </a>`;
}, "C:/Users/kwsty/lonely-limit/src/components/molecules/Card.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "page-background" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Structure", "subtitle": "\u6280\u8853\u8981\u7D20 \xD7 \u8A3C\u660E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u4F53\u7CFB\u5316" })} ${maybeRenderHead()}<section class="card-grid"> ${renderComponent($$result2, "Card", $$Card, { "title": "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3", "description": "\u5B89\u5168\u306A\u901A\u4FE1\u3068\u76E3\u8996\u4F53\u5236\u3092\u78BA\u7ACB\u3059\u308B\u305F\u3081\u306E\u5B9F\u8DF5", "href": "/proof/network-security/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "\u30AF\u30E9\u30A6\u30C9\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3", "description": "AWS\u57FA\u76E4\u3067\u306E\u8106\u5F31\u6027\u7BA1\u7406\u3068IAM\u8A2D\u8A08", "href": "/proof/cloud-security/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "OS\u30CF\u30FC\u30C9\u30CB\u30F3\u30B0", "description": "Linux\u30B5\u30FC\u30D0\u3092\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u30D9\u30FC\u30B9\u30E9\u30A4\u30F3\u306B\u6E96\u62E0\u8A2D\u5B9A", "href": "/proof/os-hardening/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "\u8105\u5A01\u30E2\u30C7\u30EA\u30F3\u30B0", "description": "STRIDE\u624B\u6CD5\u306B\u57FA\u3065\u304F\u30B7\u30B9\u30C6\u30E0\u8105\u5A01\u5206\u6790", "href": "/proof/threat-modeling/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "\u30ED\u30B0\u30FBSIEM\u5206\u6790", "description": "\u53CE\u96C6\u30FB\u691C\u77E5\u30FB\u76F8\u95A2\u5206\u6790\u306B\u3088\u308B\u30A2\u30E9\u30FC\u30C8\u5BFE\u5FDC", "href": "/proof/logs-siem/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "\u8106\u5F31\u6027\u7BA1\u7406", "description": "\u30B9\u30AD\u30E3\u30F3\u30FB\u5206\u6790\u30FB\u30EA\u30B9\u30AF\u8A55\u4FA1\u30FB\u5BFE\u51E6\u30D7\u30ED\u30BB\u30B9\u69CB\u7BC9", "href": "/proof/vuln-mgmt/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "\u30A4\u30F3\u30B7\u30C7\u30F3\u30C8\u30EC\u30B9\u30DD\u30F3\u30B9", "description": "\u5B9F\u969B\u306E\u30A2\u30E9\u30FC\u30C8\u306B\u57FA\u3065\u304F\u5BFE\u5FDC\u624B\u9806\u306E\u8A2D\u8A08", "href": "/proof/incident-response/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "DevSecOps", "description": "CI/CD\u30D1\u30A4\u30D7\u30E9\u30A4\u30F3\u306B\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u691C\u8A3C\u3092\u7D71\u5408", "href": "/proof/devsecops/" })} ${renderComponent($$result2, "Card", $$Card, { "title": "AD\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3", "description": "Active Directory\u69CB\u6210\u306B\u5BFE\u3059\u308B\u6700\u5C0F\u6A29\u9650\u5316\u30FB\u76E3\u67FB\u8A2D\u5B9A", "href": "/proof/ad-security/" })} </section> ` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/structure/index.astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/structure/index.astro";
const $$url = "/structure";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
