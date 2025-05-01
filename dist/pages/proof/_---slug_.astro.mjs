/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CXbqzzyb.mjs';
import 'kleur/colors';
import 'html-escaper';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { frontmatter, Content } = Astro2.props;
  console.log("Frontmatter:", JSON.stringify(frontmatter, null, 2));
  if (!frontmatter) {
    throw new Error("Frontmatter is missing");
  }
  const requiredProps = ["title", "difficulty", "repro", "stack", "updated", "ci_status"];
  const missingProps = requiredProps.filter((prop) => !frontmatter[prop]);
  if (missingProps.length > 0) {
    throw new Error(`Missing required frontmatter properties: ${missingProps.join(", ")}`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", Layout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<main class="max-w-4xl mx-auto py-12"> <!-- frontmatter.* を ProofHero に渡す --> ${renderComponent($$result2, "ProofHero", ProofHero, { "title": frontmatter.title, "difficulty": frontmatter.difficulty, "repro": frontmatter.repro, "stack": frontmatter.stack, "ci_status": frontmatter.ci_status, "updated": frontmatter.updated })} <!-- MDX 本文をここで描画 --> <article class="prose prose-invert max-w-none mt-8"> ${renderComponent($$result2, "Content", Content, {})} </article> </main> `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Navbar", Navbar, { "slot": "header" })}` })}`;
}, "C:/Users/kwsty/lonely-limit/src/pages/proof/[...slug].astro", void 0);

const $$file = "C:/Users/kwsty/lonely-limit/src/pages/proof/[...slug].astro";
const $$url = "/proof/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
