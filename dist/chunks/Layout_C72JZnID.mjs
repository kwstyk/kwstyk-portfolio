import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, g as renderSlot, d as addAttribute, r as renderComponent, f as renderHead } from './astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                         */
import 'clsx';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="navbar"> <div class="navbar-container"> <a href="/" class="navbar-logo">My Portfolio</a> <div class="navbar-links"> <a href="/structure" class="navbar-link">Structure</a> <a href="/proof" class="navbar-link">Proof</a> <a href="/story" class="navbar-link">Story</a> </div> </div> </nav>`;
}, "C:/Users/kwsty/lonely-limit/src/components/molecules/Navbar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    class: className
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Astro Portfolio</title><script src="https://kit.fontawesome.com/your-code.js" crossorigin="anonymous"><\/script>', '</head> <body> <div class="min-h-screen flex flex-col"> <header class="sticky top-0 z-50 border-b border-border bg-bg-start/80 backdrop-blur"> ', " </header> <main", '> <!-- \u5FC5\u8981\u306A\u3089\u5E45\u5236\u9650\u3092\u639B\u3051\u305F\u3044\u6240\u3060\u3051 wrapper \u3092\u7F6E\u304F --> <div class="container mx-auto"> ', " </div> </main> ", " </div> </body></html>"])), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), addAttribute(["flex-1 px-4 py-8", className], "class:list"), renderSlot($$result, $$slots["default"]), Astro2.slots.has("footer") && renderTemplate`<footer class="border-t border-border bg-bg-start"> <div class="container mx-auto px-4 py-8"> ${renderSlot($$result, $$slots["footer"])} </div> </footer>`);
}, "C:/Users/kwsty/lonely-limit/src/components/organisms/Layout.astro", void 0);

export { $$Layout as $ };
