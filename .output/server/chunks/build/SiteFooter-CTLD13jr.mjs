import { defineComponent, ref, mergeProps, unref, shallowRef, h, resolveComponent, computed, useSSRContext, resolveDirective, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrGetDirectiveProps, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, b as useRouter, e as encodeRoutePath, r as resolveRouteObject, n as navigateTo, d as useNuxtApp, f as useRuntimeConfig, g as nuxtLinkDefaults } from './server.mjs';
import { ak as parseQuery, X as hasProtocol, n as joinURL, H as withTrailingSlash, a4 as withoutTrailingSlash } from '../nitro/nitro.mjs';

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = useRuntimeConfig();
    const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (unref(props.external)) {
        return true;
      }
      const path = unref(props.to) || unref(props.href) || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to, viewTransition: unref(props.viewTransition) });
    const href = computed(() => {
      const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: unref(props.replace), external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value);
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, locales, setLocale } = useI18n();
    const isMenuOpen = ref(false);
    const scrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300", unref(scrolled) ? "bg-[#070d16]/95 border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.4)]" : "bg-[#070d16]/70 border-b border-white/5"]
      }, _attrs))}><div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-6"><a href="/" class="flex items-center gap-3 flex-shrink-0"><div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-base shadow-[0_0_20px_rgba(0,212,255,0.4)]">⬡</div><span class="font-display font-bold text-xl tracking-wide text-white">CANLAH AI</span></a><nav aria-label="Main navigation" class="hidden md:flex items-center gap-6 flex-1 justify-center"><a href="#products" class="text-sm text-[#6b82b5] hover:text-white transition-colors">${ssrInterpolate(_ctx.$t("nav.products"))}</a><a href="#pricing" class="text-sm text-[#6b82b5] hover:text-white transition-colors">${ssrInterpolate(_ctx.$t("nav.pricing"))}</a><a href="#platform" class="text-sm text-[#6b82b5] hover:text-white transition-colors">${ssrInterpolate(_ctx.$t("nav.platform"))}</a><a href="#faq" class="text-sm text-[#6b82b5] hover:text-white transition-colors">${ssrInterpolate(_ctx.$t("nav.faq"))}</a></nav><div class="hidden md:flex items-center gap-3 flex-shrink-0"><select${ssrRenderAttr("value", unref(locale))} class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] cursor-pointer outline-none hover:border-white/25 transition-colors"><!--[-->`);
      ssrRenderList(unref(locales), (loc) => {
        _push(`<option${ssrRenderAttr("value", loc.code)} class="bg-[#0a1520]">${ssrInterpolate(loc.name)}</option>`);
      });
      _push(`<!--]--></select><a href="mailto:hello@canlah.ai" class="text-sm text-[#6b82b5] hover:text-white transition-colors px-3 py-2">${ssrInterpolate(_ctx.$t("nav.demo"))}</a><a href="https://app.canmarket.ai" target="_blank" class="group text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_24px_rgba(0,212,255,0.45)] transition-all hover:scale-[1.03] flex items-center gap-1.5">${ssrInterpolate(_ctx.$t("nav.tryFree"))} <span class="group-hover:translate-x-0.5 transition-transform text-xs">→</span></a></div><button class="md:hidden text-white p-1"${ssrRenderAttr("aria-label", unref(isMenuOpen) ? "Close menu" : "Open menu")}><span class="text-xl leading-none">${ssrInterpolate(unref(isMenuOpen) ? "✕" : "☰")}</span></button></div>`);
      if (unref(isMenuOpen)) {
        _push(`<div class="md:hidden border-t border-white/8 bg-[#070d16]/98 px-6 py-5 flex flex-col gap-4"><a href="#products" class="text-sm text-[#8ba4cc] py-1">${ssrInterpolate(_ctx.$t("nav.products"))}</a><a href="#pricing" class="text-sm text-[#8ba4cc] py-1">${ssrInterpolate(_ctx.$t("nav.pricing"))}</a><a href="#platform" class="text-sm text-[#8ba4cc] py-1">${ssrInterpolate(_ctx.$t("nav.platform"))}</a><a href="#faq" class="text-sm text-[#8ba4cc] py-1">${ssrInterpolate(_ctx.$t("nav.faq"))}</a><div class="border-t border-white/8 pt-4 flex flex-col gap-3"><select${ssrRenderAttr("value", unref(locale))} class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] w-fit"><!--[-->`);
        ssrRenderList(unref(locales), (loc) => {
          _push(`<option${ssrRenderAttr("value", loc.code)} class="bg-[#0a1520]">${ssrInterpolate(loc.name)}</option>`);
        });
        _push(`<!--]--></select><a href="mailto:hello@canlah.ai" class="text-sm text-[#6b82b5]">${ssrInterpolate(_ctx.$t("nav.demo"))}</a><a href="https://app.canmarket.ai" target="_blank" class="text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white text-center">${ssrInterpolate(_ctx.$t("nav.tryFree"))} → </a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "SiteHeader" });
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_1;
  const _directive_reveal = resolveDirective("reveal");
  _push(`<footer${ssrRenderAttrs(mergeProps({
    role: "contentinfo",
    "aria-label": "Site footer",
    class: "py-16 pb-24 md:pb-16 px-6 border-t border-white/5 mt-8"
  }, _attrs))}><div class="max-w-[1400px] mx-auto"><div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-4 gap-10 mb-12" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><div class="md:col-span-2"><div class="flex items-center gap-3 mb-4"><div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-base shadow-[0_0_20px_rgba(0,212,255,0.3)]">⬡</div><span class="font-display font-bold text-xl tracking-wide text-white">CANLAH AI</span></div><p class="text-[13px] text-[#4a5a7a] leading-relaxed max-w-xs mb-5">${ssrInterpolate(_ctx.$t("footer.tagline"))}</p><div class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] animate-pulse"></span><span class="text-[11px] font-mono text-[#4a5a7a]">${ssrInterpolate(_ctx.$t("footer.status"))}</span></div></div><div><div class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-4">${ssrInterpolate(_ctx.$t("footer.products"))}</div><ul class="space-y-2.5"><li><a href="https://app.canmarket.ai" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">CanMarket ↗</a></li><li><span class="text-[13px] text-[#3a4a62]">CanService</span></li><li><span class="text-[13px] text-[#3a4a62]">CanSales</span></li><li><span class="text-[13px] text-[#3a4a62]">CanCommerce</span></li></ul></div><div><div class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-4">${ssrInterpolate(_ctx.$t("footer.company"))}</div><ul class="space-y-2.5"><li><a href="https://canmarket.ai" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">${ssrInterpolate(_ctx.$t("footer.aboutLink"))}</a></li><li><a href="mailto:hello@canlah.ai" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">${ssrInterpolate(_ctx.$t("footer.contactLink"))}</a></li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/privacy",
    class: "text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Privacy Policy`);
      } else {
        return [
          createTextVNode("Privacy Policy")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/terms",
    class: "text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Terms of Service`);
      } else {
        return [
          createTextVNode("Terms of Service")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"><div class="font-mono text-[11px] text-[#3a4a62]">${ssrInterpolate(_ctx.$t("footer.rights"))}</div><div class="font-mono text-[11px] text-[#3a4a62]">MWC Pitch2Pitch 2025 · Global Runner-up</div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_12 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "SiteFooter" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a, __nuxt_component_12 as b, _export_sfc as c };
//# sourceMappingURL=SiteFooter-CTLD13jr.mjs.map
