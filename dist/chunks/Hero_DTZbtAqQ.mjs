import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, subtitle, buttons = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero"> <div class="hero-inner"> <h1 class="hero-title">${title}</h1> <p class="hero-subtitle">${subtitle}</p> ${buttons.length > 0 && renderTemplate`<div class="hero-buttons"> ${buttons.map((btn) => renderTemplate`<a${addAttribute(btn.href, "href")}${addAttribute(`hero-button ${btn.variant}`, "class")}> ${btn.text} </a>`)} </div>`} </div> </section>`;
}, "C:/Users/kwsty/lonely-limit/src/components/organisms/Hero.astro", void 0);

export { $$Hero as $ };
