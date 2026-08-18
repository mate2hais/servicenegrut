import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Clock, f as MapPin, p as Mail, u as Phone } from "../_libs/lucide-react.mjs";
import { o as SITE } from "./router-DhYNb39O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-s6DPCN2O.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Unde ne găsești"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${SITE.phone.replace(/\s/g, "")}`,
							className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Telefon"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: SITE.phone
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `mailto:${SITE.email}`,
							className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: SITE.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Adresă"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: SITE.address
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Program"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2 text-sm",
								children: SITE.schedule.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: s.day
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: s.hours
									})]
								}, s.day))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/programare",
							className: "inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
							children: "Programare online"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Hartă locație AutoNeg Galați",
						src: "https://www.google.com/maps?q=Strada%20Traian%20128%2C%20Gala%C8%9Bi&output=embed",
						className: "h-[420px] w-full",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
