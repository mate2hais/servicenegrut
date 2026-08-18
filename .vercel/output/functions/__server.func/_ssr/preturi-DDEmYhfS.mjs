import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Info } from "../_libs/lucide-react.mjs";
import { a as PRICES, i as EXTRA_SERVICES } from "./router-DhYNb39O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preturi-DDEmYhfS.js
var import_jsx_runtime = require_jsx_runtime();
function PreturiPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Tarife"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Lista de prețuri"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Prețurile includ taxa RAR și eliberarea certificatului. Plata se face la recepție, numerar sau card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-x-auto rounded-2xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 font-semibold",
								children: "Categorie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 font-semibold",
								children: "Detalii"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 font-semibold",
								children: "Valabilitate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 text-right font-semibold",
								children: "Preț"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: PRICES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-medium",
								children: p.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: p.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: p.validity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4 text-right font-bold text-primary",
								children: [p.price, " lei"]
							})
						] }, `${p.category}-${p.detail}`))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 text-2xl font-bold tracking-tight",
				children: "Servicii suplimentare"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: EXTRA_SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-bold text-primary",
						children: [s.price, " lei"]
					})]
				}, s.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex gap-3 rounded-2xl border border-border bg-muted/50 p-5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Reverificarea este gratuită pentru defectele minore remediate în aceeași zi. Pentru revenirea în termen de 30 de zile se aplică tariful redus de reverificare." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/programare",
				className: "mt-10 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
				children: "Fă o programare"
			})
		]
	});
}
//#endregion
export { PreturiPage as component };
