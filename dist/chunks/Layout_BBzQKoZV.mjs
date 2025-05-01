import { c as createComponent, b as createAstro, f as renderHead, d as addAttribute, g as renderSlot, a as renderTemplate } from './astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { class: className } = Astro2.props;
  return renderTemplate`<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Astro Portfolio</title>${renderHead()}</head> <body> <!-- ここを修正する！ --> <main${addAttribute(["site-main", className], "class:list")}> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/kwsty/lonely-limit/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
