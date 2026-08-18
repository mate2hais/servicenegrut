import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Bike, T as Car, c as ShieldCheck, h as Lightbulb, i as Truck, n as Wrench, r as Wind, v as Gauge, x as ClipboardCheck } from "../_libs/lucide-react.mjs";
import { i as EXTRA_SERVICES } from "./router-DhYNb39O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/servicii-fX7j-ZkE.js
var import_jsx_runtime = require_jsx_runtime();
var MAIN = [
	{
		icon: Car,
		title: "ITP autoturisme (M1)",
		text: "Inspecție completă pe stand pentru autoturisme până la 3.5 t, benzină, diesel, GPL sau hibrid."
	},
	{
		icon: Truck,
		title: "ITP autoutilitare (N1)",
		text: "Verificare pentru vehicule de marfă ușoare, inclusiv sisteme de frânare cu sarcină."
	},
	{
		icon: Bike,
		title: "ITP moto și mopede",
		text: "Inspecție dedicată motocicletelor și mopedelor, cu verificarea frânelor și a iluminării."
	},
	{
		icon: ShieldCheck,
		title: "ITP remorci",
		text: "Remorci și semiremorci până la 3.5 t: cuplă, instalație electrică, frâne de inerție."
	},
	{
		icon: ClipboardCheck,
		title: "Verificare pre-ITP",
		text: "Checklist complet înainte de inspecție, ca să știi exact ce trebuie remediat."
	},
	{
		icon: Wrench,
		title: "Consultanță tehnică",
		text: "Explicații clare pentru fiecare defect constatat și recomandări de reparație."
	}
];
var EQUIPMENT = [
	{
		icon: Gauge,
		title: "Stand de frânare cu role",
		text: "Măsoară forța de frânare pe fiecare roată și dezechilibrul între axe."
	},
	{
		icon: Wind,
		title: "Analizor de noxe / opacimetru",
		text: "Verifică emisiile pentru motoare pe benzină și diesel conform normelor Euro."
	},
	{
		icon: Lightbulb,
		title: "Reglofar digital",
		text: "Verifică și reglează înălțimea și intensitatea fasciculului luminos."
	},
	{
		icon: Car,
		title: "Stand de suspensii și jocuri",
		text: "Detectează uzura amortizoarelor, a bucșelor și jocurile în direcție."
	}
];
function ServiciiPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Servicii"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Tot ce ține de inspecția tehnică, într-un singur loc"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Lucrăm cu echipamente verificate metrologic și inspectori atestați RAR. Inspecția durează în medie 30 de minute, iar rezultatul îți este explicat punct cu punct."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: MAIN.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-lg font-bold",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: s.text
						})
					]
				}, s.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-16 text-2xl font-bold tracking-tight",
				children: "Echipamentele din stație"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2",
				children: EQUIPMENT.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: e.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: e.text
					})] })]
				}, e.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-16 text-2xl font-bold tracking-tight",
				children: "Servicii suplimentare"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card",
				children: EXTRA_SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-4 px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-sm font-bold text-primary",
						children: [s.price, " lei"]
					})]
				}, s.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/programare",
					className: "rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
					children: "Programează-te acum"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/preturi",
					className: "rounded-lg border border-border px-6 py-3 text-sm font-semibold",
					children: "Vezi lista completă de prețuri"
				})]
			})
		]
	});
}
//#endregion
export { ServiciiPage as component };
