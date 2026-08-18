import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CircleCheck, E as CalendarCheck, a as TriangleAlert, b as Clock, c as ShieldCheck, f as MapPin, k as Award, l as Quote, o as Star, v as Gauge } from "../_libs/lucide-react.mjs";
import { a as PRICES, o as SITE, r as ENGINEERS } from "./router-DhYNb39O.mjs";
import { i as hero_itp_default, n as gallery_headlight_default, r as gallery_lift_default, t as gallery_emissions_default } from "./gallery-headlight-Bj-PX8pp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cw3l03HB.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Programează-te",
		text: "Alegi data și intervalul orar direct de pe site, în mai puțin de un minut."
	},
	{
		n: "02",
		title: "Vii cu actele",
		text: "Talon, CIV, RCA și buletin. Preluăm mașina la ora stabilită, fără cozi."
	},
	{
		n: "03",
		title: "Inspecția pe stand",
		text: "Frâne, suspensii, emisii, iluminare, caroserie — verificate cu aparatură omologată."
	},
	{
		n: "04",
		title: "Primești rezultatul",
		text: "Îți explicăm fiecare punct din raport și îți eliberăm certificatul pe loc."
	}
];
var REVIEWS = [
	{
		name: "Mihai R.",
		text: "M-am programat seara, dimineața la 9 eram deja pe stand. În 25 de minute aveam ITP-ul. Recomand!"
	},
	{
		name: "Alina D.",
		text: "Domnul inginer mi-a explicat clar de ce nu trecea mașina și ce trebuie schimbat. Zero bătaie de cap."
	},
	{
		name: "George P.",
		text: "Prețuri corecte, afișate pe site, fără surprize la plată. Stație curată și oameni serioși."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_itp_default,
					alt: "Autoturism pe linia de inspecție tehnică din stația AutoNeg",
					width: 1600,
					height: 912,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl px-4 py-20 sm:py-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
								"Autorizație RAR ",
								SITE.authNumber
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl",
							children: "ITP-ul mașinii tale, rezolvat în 30 de minute"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 max-w-xl text-lg text-muted-foreground",
							children: [SITE.name, " este stația de inspecție tehnică periodică din Galați unde primești programare fermă, prețuri afișate și explicații pe înțelesul tău."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/programare",
								className: "inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "h-4 w-4" }), "Programează-te online"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/preturi",
								className: "rounded-lg border border-border bg-background/80 px-7 py-3.5 text-sm font-semibold backdrop-blur",
								children: "Vezi prețurile"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4",
							children: [
								{
									k: "30 min",
									v: "durata medie"
								},
								{
									k: "14 ani",
									v: "experiență"
								},
								{
									k: "4",
									v: "ingineri atestați"
								},
								{
									k: "100%",
									v: "prețuri afișate"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-2xl font-extrabold text-primary",
								children: s.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: s.v
							})] }, s.v))
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: Clock,
						t: "Programare fermă",
						d: "Îți respectăm ora rezervată, fără așteptări inutile."
					},
					{
						icon: Gauge,
						t: "Aparatură modernă",
						d: "Stand frâne, analizor noxe și reglofar verificate metrologic."
					},
					{
						icon: Award,
						t: "Ingineri atestați",
						d: "Inspectori tehnici cu atestat RAR valabil și experiență reală."
					},
					{
						icon: MapPin,
						t: "Central în Galați",
						d: `${SITE.address}, cu parcare la intrarea în hală.`
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-bold",
							children: b.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: b.d
						})
					]
				}, b.t))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Cum decurge o inspecție"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-2xl border border-border bg-background p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-extrabold text-primary/25",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-bold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: s.text
							})
						]
					}, s.n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Prețuri populare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/preturi",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "Lista completă →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-3",
				children: PRICES.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: p.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: p.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-3xl font-extrabold text-primary",
							children: [
								p.price,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-semibold",
									children: "lei"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground",
							children: ["Valabilitate ", p.validity]
						})
					]
				}, p.detail))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold tracking-tight",
						children: "Echipa AutoNeg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/echipa",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "Vezi echipa și acreditările →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: ENGINEERS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-background p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground",
								children: e.initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-bold",
								children: e.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: e.role
							})
						]
					}, e.name))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold tracking-tight",
					children: "Din stația noastră"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/galerie",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "Toată galeria →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-3",
				children: [
					{
						src: gallery_lift_default,
						alt: "Inginer verificând suspensia unei mașini pe elevator"
					},
					{
						src: gallery_emissions_default,
						alt: "Sondă de analiză a noxelor în eșapamentul unei mașini"
					},
					{
						src: gallery_headlight_default,
						alt: "Aparat de reglaj faruri în fața farului unei mașini"
					}
				].map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img.src,
					alt: img.alt,
					loading: "lazy",
					width: 1200,
					height: 800,
					className: "h-56 w-full rounded-2xl border border-border object-cover"
				}, img.alt))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-destructive/25 bg-destructive/5 p-8 sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-8 w-8 text-destructive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-2xl font-extrabold tracking-tight",
						children: "Ce riști dacă nu faci ITP la timp?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Amendă, reținerea certificatului de înmatriculare, probleme la despăgubirea RCA/CASCO și, cel mai grav, un risc real de siguranță. Am pregătit un ghid complet cu sancțiunile și cu tot ce trebuie verificat la mașină înainte de inspecție."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/informatii",
						className: "mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Citește ghidul complet"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-extrabold tracking-tight",
				children: "Ce spun clienții"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-3",
				children: REVIEWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-6 w-6 text-primary/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: r.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex gap-0.5",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-accent text-accent" }, i))
							})]
						})
					]
				}, r.name))
			})]
		})
	] });
}
//#endregion
export { HomePage as component };
