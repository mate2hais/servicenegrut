import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { O as BadgeCheck, _ as GraduationCap, k as Award } from "../_libs/lucide-react.mjs";
import { n as ACCREDITATIONS, r as ENGINEERS } from "./router-DhYNb39O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/echipa-Dehh5xs4.js
var import_jsx_runtime = require_jsx_runtime();
function EchipaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Echipa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Inginerii care îți verifică mașina"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Fiecare inspecție este realizată de un inginer atestat RAR, care îți explică rezultatul și îți spune exact ce trebuie remediat."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2",
				children: ENGINEERS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground",
								children: e.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: e.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: e.role
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3.5 w-3.5" }), e.experience]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Specializări"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-wrap gap-2",
							children: e.specialties.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-md bg-muted px-2.5 py-1 text-xs font-medium",
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Certificări"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1.5",
							children: e.certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), c]
							}, c))
						})
					]
				}, e.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-16 text-2xl font-bold tracking-tight",
				children: "Acreditări și autorizații"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2",
				children: ACCREDITATIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-bold",
							children: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: a.description
						})
					]
				}, a.title))
			})
		]
	});
}
//#endregion
export { EchipaPage as component };
