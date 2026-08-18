import { n as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_react, i as Root2, n as Header, r as Item, s as require_jsx_runtime, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CircleCheck, S as CircleX, a as TriangleAlert, s as Sparkles, w as ChevronDown, y as FileText } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/informatii-Egyi2_92.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var RISKS = [
	{
		title: "Amendă contravențională",
		text: "Conducerea unui vehicul fără ITP valabil se sancționează cu amendă din clasa a IV-a de sancțiuni (câteva sute de lei, în funcție de valoarea punctului-amendă)."
	},
	{
		title: "Reținerea certificatului de înmatriculare",
		text: "Polițistul reține certificatul de înmatriculare și eliberează o dovadă fără drept de circulație până la efectuarea inspecției."
	},
	{
		title: "Probleme cu despăgubirea RCA / CASCO",
		text: "În caz de accident, lipsa ITP-ului valabil poate duce la regres din partea asigurătorului sau la refuzul plății daunei pe CASCO."
	},
	{
		title: "Risc de siguranță",
		text: "Frâne uzate, amortizoare moarte sau anvelope sub limită cresc semnificativ distanța de oprire și riscul de accident."
	},
	{
		title: "Blocaje administrative",
		text: "Fără ITP valabil nu poți vinde, radia sau reînmatricula vehiculul și nu poți obține rovinieta pentru anumite categorii de transport."
	}
];
var TECH_CHECKS = [
	"Frâne: plăcuțe și discuri în limita de uzură, fără scurgeri de lichid, frâna de mână funcțională.",
	"Direcție și suspensie: fără jocuri la capete de bară, bucșe și pivoți; amortizoare fără scurgeri.",
	"Anvelope: adâncime profil minim 1.6 mm, același tip pe aceeași axă, fără tăieturi sau umflături.",
	"Iluminare: toate becurile funcționale (faruri, poziții, stopuri, semnalizatoare, marșarier, plăcuță).",
	"Emisii: motor la temperatura de lucru, filtru de particule și catalizator funcționale, fără fum excesiv.",
	"Evacuare: fără găuri sau zgomot peste limită, toba și racordurile etanșe.",
	"Parbriz și geamuri: fără fisuri în câmpul vizual al șoferului, ștergătoare și spălător funcționale.",
	"Centuri de siguranță: fără rupturi, se blochează la tragere bruscă, cataramele funcționale.",
	"Fluide: fără scurgeri de ulei, lichid de frână sau antigel sub mașină.",
	"Baterie și electrice: fixată corect, fără oxidare, martori de avarie stinși în bord."
];
var AESTHETIC_CHECKS = [
	"Numere de înmatriculare curate, lizibile, fixate corect și fără deteriorări.",
	"Caroserie fără muchii tăioase sau elemente desprinse (bare, praguri, aripi) care pot răni pietonii.",
	"Fără rugină perforantă pe elementele de rezistență (praguri, lonjeroane, puncte de prindere).",
	"Oglinzi retrovizoare complete, fixate și fără sticla spartă.",
	"Folii pe geamuri doar în limitele legale; parbrizul și geamurile laterale față trebuie să asigure vizibilitate.",
	"Interior curat, fără obiecte care blochează pedalele sau vizibilitatea.",
	"Modificări (jante, suspensie, instalație GPL, cârlig de remorcare) omologate și înscrise în talon.",
	"Mașina prezentată spălată — murdăria excesivă poate împiedica verificarea corectă a caroseriei și a numărului de șasiu."
];
var DOCS = [
	"Certificatul de înmatriculare (talonul) în original.",
	"Cartea de identitate a vehiculului (CIV).",
	"Actul de identitate al persoanei care prezintă vehiculul.",
	"Asigurarea RCA valabilă.",
	"Pentru instalații GPL: certificatul de omologare / montaj."
];
var FAQ = [
	{
		q: "Cât de des trebuie făcut ITP-ul?",
		a: "Autoturismele noi se prezintă la 3 ani de la prima înmatriculare, apoi la 2 ani, iar după 12 ani vechime anual. Taxiurile, școlile de șoferi și transportul de persoane se prezintă la 6 luni."
	},
	{
		q: "Pot face ITP mai devreme?",
		a: "Da, poți face inspecția cu până la 30 de zile înainte de expirare, fără să pierzi din valabilitate — noua perioadă se calculează de la data expirării."
	},
	{
		q: "Ce se întâmplă dacă mașina nu trece?",
		a: "Primești raportul cu defectele constatate. Ai 30 de zile să remediezi problemele și să revii pentru reverificare la tarif redus, fără a relua întreaga inspecție."
	},
	{
		q: "Cât durează o inspecție?",
		a: "În medie 30 de minute pentru un autoturism, dacă vii la ora programată și actele sunt complete."
	},
	{
		q: "Mașina trebuie să fie spălată?",
		a: "Da, recomandăm insistent. Murdăria excesivă pe caroserie și pe partea inferioară poate împiedica verificarea și poate duce la amânarea inspecției."
	},
	{
		q: "Pot veni fără programare?",
		a: "Da, în limita locurilor disponibile, dar programarea online îți garantează ora și reduce timpul de așteptare."
	}
];
function InformatiiPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Informații utile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Ce riști fără ITP și cum îți pregătești mașina"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Inspecția tehnică periodică nu e doar o formalitate: e obligatorie prin lege și este singura verificare independentă a stării mașinii tale. Mai jos găsești consecințele lipsei ITP-ului și lista completă de pregătire."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" }), "La ce te expui dacă nu faci ITP"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-4",
						children: RISKS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-destructive/25 bg-destructive/5 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "flex items-center gap-2 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-destructive" }), r.title]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: r.text
							})]
						}, r.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Valorile amenzilor se actualizează periodic prin lege; îți recomandăm să verifici cuantumul în vigoare la data controlului."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-primary" }), "Checklist tehnic înainte de inspecție"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: TECH_CHECKS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-xl border border-border bg-card p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-accent-foreground" }), "Aspect estetic și conformitate"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: AESTHETIC_CHECKS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-xl border border-border bg-card p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6 text-primary" }), "Acte necesare"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 grid gap-3 sm:grid-cols-2",
					children: DOCS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl bg-muted px-4 py-3 text-sm",
						children: d
					}, d))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Întrebări frecvente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "mt-4",
					children: FAQ.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: f.q,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-muted-foreground",
							children: f.a
						})]
					}, f.q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/programare",
				className: "mt-12 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
				children: "Programează inspecția"
			})
		]
	});
}
//#endregion
export { InformatiiPage as component };
