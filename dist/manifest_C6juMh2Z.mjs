import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, i as decodeKey } from './chunks/astro/server_CXbqzzyb.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/kwsty/lonely-limit/","adapterName":"","routes":[{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/ad-security/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/ad-security","isIndex":true,"type":"page","pattern":"^\\/proof\\/ad-security\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"ad-security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/ad-security/index.astro","pathname":"/proof/ad-security","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/cloud-security/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/cloud-security","isIndex":true,"type":"page","pattern":"^\\/proof\\/cloud-security\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"cloud-security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/cloud-security/index.astro","pathname":"/proof/cloud-security","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/devsecops/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/devsecops","isIndex":true,"type":"page","pattern":"^\\/proof\\/devsecops\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"devsecops","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/devsecops/index.astro","pathname":"/proof/devsecops","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/incident-response/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/incident-response","isIndex":true,"type":"page","pattern":"^\\/proof\\/incident-response\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"incident-response","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/incident-response/index.astro","pathname":"/proof/incident-response","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/logs-siem/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/logs-siem","isIndex":true,"type":"page","pattern":"^\\/proof\\/logs-siem\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"logs-siem","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/logs-siem/index.astro","pathname":"/proof/logs-siem","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/network-security/packet-capture/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/network-security/packet-capture","isIndex":false,"type":"page","pattern":"^\\/proof\\/network-security\\/packet-capture\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"network-security","dynamic":false,"spread":false}],[{"content":"packet-capture","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/network-security/packet-capture.mdx","pathname":"/proof/network-security/packet-capture","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/network-security/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/network-security","isIndex":true,"type":"page","pattern":"^\\/proof\\/network-security\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"network-security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/network-security/index.astro","pathname":"/proof/network-security","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/os-hardening/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/os-hardening","isIndex":true,"type":"page","pattern":"^\\/proof\\/os-hardening\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"os-hardening","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/os-hardening/index.astro","pathname":"/proof/os-hardening","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/threat-modeling/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/threat-modeling","isIndex":true,"type":"page","pattern":"^\\/proof\\/threat-modeling\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"threat-modeling","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/threat-modeling/index.astro","pathname":"/proof/threat-modeling","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/vuln-mgmt/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof/vuln-mgmt","isIndex":true,"type":"page","pattern":"^\\/proof\\/vuln-mgmt\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}],[{"content":"vuln-mgmt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/vuln-mgmt/index.astro","pathname":"/proof/vuln-mgmt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/proof/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proof","isIndex":true,"type":"page","pattern":"^\\/proof\\/?$","segments":[[{"content":"proof","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proof/index.astro","pathname":"/proof","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/story/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/story","isIndex":true,"type":"page","pattern":"^\\/story\\/?$","segments":[[{"content":"story","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/story/index.astro","pathname":"/story","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/structure/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/structure","isIndex":true,"type":"page","pattern":"^\\/structure\\/?$","segments":[[{"content":"structure","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/structure/index.astro","pathname":"/structure","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/kwsty/lonely-limit/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/kwsty/lonely-limit/src/pages/proof/ad-security/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/cloud-security/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/devsecops/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/incident-response/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/logs-siem/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/network-security/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/os-hardening/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/threat-modeling/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/vuln-mgmt/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/story/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/proof/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kwsty/lonely-limit/src/pages/structure/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/proof/ad-security/index@_@astro":"pages/proof/ad-security.astro.mjs","\u0000@astro-page:src/pages/proof/cloud-security/index@_@astro":"pages/proof/cloud-security.astro.mjs","\u0000@astro-page:src/pages/proof/devsecops/index@_@astro":"pages/proof/devsecops.astro.mjs","\u0000@astro-page:src/pages/proof/incident-response/index@_@astro":"pages/proof/incident-response.astro.mjs","\u0000@astro-page:src/pages/proof/logs-siem/index@_@astro":"pages/proof/logs-siem.astro.mjs","\u0000@astro-page:src/pages/proof/network-security/packet-capture@_@mdx":"pages/proof/network-security/packet-capture.astro.mjs","\u0000@astro-page:src/pages/proof/network-security/index@_@astro":"pages/proof/network-security.astro.mjs","\u0000@astro-page:src/pages/proof/os-hardening/index@_@astro":"pages/proof/os-hardening.astro.mjs","\u0000@astro-page:src/pages/proof/threat-modeling/index@_@astro":"pages/proof/threat-modeling.astro.mjs","\u0000@astro-page:src/pages/proof/vuln-mgmt/index@_@astro":"pages/proof/vuln-mgmt.astro.mjs","\u0000@astro-page:src/pages/proof/index@_@astro":"pages/proof.astro.mjs","\u0000@astro-page:src/pages/proof/[...slug]@_@astro":"pages/proof/_---slug_.astro.mjs","\u0000@astro-page:src/pages/story/index@_@astro":"pages/story.astro.mjs","\u0000@astro-page:src/pages/structure/index@_@astro":"pages/structure.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_C6juMh2Z.mjs","@astrojs/react/client.js":"_astro/client.BRZKPEzt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///C:/Users/kwsty/lonely-limit/dist/proof/ad-security/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/cloud-security/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/devsecops/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/incident-response/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/logs-siem/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/network-security/packet-capture/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/network-security/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/os-hardening/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/threat-modeling/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/vuln-mgmt/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/proof/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/story/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/structure/index.html","/file:///C:/Users/kwsty/lonely-limit/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"AgekvnB4wOE8Y/TFxoqCj1tWDAw1mCTTsq8uTME3qbw=","experimentalEnvGetSecretEnabled":false});

export { manifest };
