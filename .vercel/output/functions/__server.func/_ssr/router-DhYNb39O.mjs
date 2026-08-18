import { n as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { b as Clock, c as ShieldCheck, d as Menu, f as MapPin, p as Mail, t as X, u as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DhYNb39O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var SITE = {
	name: "AutoNeg",
	tagline: "Stație ITP autorizată RAR",
	phone: "0740 123 456",
	email: "contact@autoneg.ro",
	address: "Str. Traian nr. 128, Galați",
	schedule: [
		{
			day: "Luni – Vineri",
			hours: "08:00 – 18:00"
		},
		{
			day: "Sâmbătă",
			hours: "09:00 – 14:00"
		},
		{
			day: "Duminică",
			hours: "Închis"
		}
	],
	authNumber: "GL-0142"
};
var PRICES = [
	{
		category: "Autoturisme (M1)",
		detail: "până la 3.5 t, benzină",
		price: 160,
		validity: "2 ani / 1 an"
	},
	{
		category: "Autoturisme (M1)",
		detail: "până la 3.5 t, diesel",
		price: 175,
		validity: "2 ani / 1 an"
	},
	{
		category: "Autoturisme GPL / hibrid",
		detail: "instalație omologată",
		price: 195,
		validity: "2 ani / 1 an"
	},
	{
		category: "Autoutilitare (N1)",
		detail: "până la 3.5 t",
		price: 210,
		validity: "1 an"
	},
	{
		category: "Remorci (O1, O2)",
		detail: "până la 3.5 t",
		price: 110,
		validity: "1 an / 2 ani"
	},
	{
		category: "Motociclete (L3e)",
		detail: "peste 125 cmc",
		price: 90,
		validity: "2 ani"
	},
	{
		category: "Mopede (L1e)",
		detail: "până la 50 cmc",
		price: 75,
		validity: "2 ani"
	},
	{
		category: "Taxi / Școală de șoferi",
		detail: "regim special",
		price: 230,
		validity: "6 luni"
	},
	{
		category: "Reverificare",
		detail: "în termen de 30 de zile",
		price: 60,
		validity: "—"
	}
];
var EXTRA_SERVICES = [
	{
		name: "Verificare pre-ITP (checklist complet)",
		price: 50
	},
	{
		name: "Reglaj faruri",
		price: 40
	},
	{
		name: "Test frâne pe standul cu role",
		price: 45
	},
	{
		name: "Măsurare noxe / opacitate fum",
		price: 45
	},
	{
		name: "Diagnoză computerizată OBD",
		price: 70
	},
	{
		name: "Verificare geometrie direcție",
		price: 80
	}
];
var ENGINEERS = [
	{
		name: "Negruț Cosmin",
		role: "Inginer auto principal · Coordonator stație ITP",
		experience: "14 ani experiență",
		specialties: [
			"Inspecții M1 / N1",
			"Sisteme de frânare",
			"Diagnoză electronică"
		],
		certifications: ["Atestat RAR inspector tehnic", "Certificat ISO 9001 auditor intern"],
		initials: "NC"
	},
	{
		name: "Andrei Pavel",
		role: "Inginer autovehicule · Inspector tehnic",
		experience: "9 ani experiență",
		specialties: [
			"Motoare diesel",
			"Emisii poluante",
			"Sisteme de evacuare"
		],
		certifications: ["Atestat RAR inspector tehnic", "Certificare analizoare noxe"],
		initials: "AP"
	},
	{
		name: "Ioana Mureșan",
		role: "Inginer mecanic · Inspector tehnic",
		experience: "7 ani experiență",
		specialties: [
			"Suspensii și direcție",
			"Caroserie și șasiu",
			"Remorci"
		],
		certifications: ["Atestat RAR inspector tehnic", "Curs metrologie echipamente"],
		initials: "IM"
	},
	{
		name: "Vlad Ionescu",
		role: "Tehnician instalații GPL · Inspector tehnic",
		experience: "11 ani experiență",
		specialties: [
			"Instalații GPL/CNG",
			"Motociclete",
			"Iluminat și semnalizare"
		],
		certifications: ["Atestat RAR inspector tehnic", "Autorizație ISCIR instalații GPL"],
		initials: "VI"
	}
];
var ACCREDITATIONS = [
	{
		title: "Autorizație RAR nr. GL-0142",
		description: "Stație de inspecție tehnică periodică autorizată de Registrul Auto Român pentru categoriile M1, N1, O1, O2, L1e–L5e."
	},
	{
		title: "ISO 9001:2015",
		description: "Sistem de management al calității certificat pentru servicii de inspecție tehnică auto."
	},
	{
		title: "Metrologie legală",
		description: "Toate echipamentele (stand frâne, analizor noxe, opacimetru, reglofar) sunt verificate metrologic anual de BRML."
	},
	{
		title: "Inspectori atestați",
		description: "Toți inspectorii dețin atestat RAR valabil, reînnoit periodic prin cursuri de perfecționare."
	}
];
var VEHICLE_CATEGORIES = [
	"Autoturism (M1)",
	"Autoutilitară (N1)",
	"Remorcă (O1/O2)",
	"Motocicletă / Moped",
	"Taxi / Școală de șoferi",
	"Reverificare"
];
var TIME_SLOTS = [
	"08:00",
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00"
];
var NAV = [
	{
		to: "/",
		label: "Acasă"
	},
	{
		to: "/servicii",
		label: "Servicii"
	},
	{
		to: "/preturi",
		label: "Prețuri"
	},
	{
		to: "/echipa",
		label: "Echipă"
	},
	{
		to: "/galerie",
		label: "Galerie"
	},
	{
		to: "/informatii",
		label: "Informații ITP"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-extrabold tracking-tight",
							children: SITE.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
							children: "Stație ITP"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						activeOptions: { exact: item.to === "/" },
						activeProps: { className: "bg-muted text-foreground" },
						className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${SITE.phone.replace(/\s/g, "")}`,
							className: "hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary" }), SITE.phone]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/programare",
							className: "hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:scale-[1.03] sm:inline-flex",
							children: "Programare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-md p-2 text-foreground lg:hidden",
							"aria-label": "Meniu",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-border bg-background px-4 py-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					className: "rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/programare",
					onClick: () => setOpen(false),
					className: "mt-2 rounded-md bg-accent px-3 py-2.5 text-center text-sm font-semibold text-accent-foreground",
					children: "Fă o programare"
				})]
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 border-t border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-extrabold tracking-tight",
						children: SITE.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: [
						"Stație de inspecție tehnică periodică autorizată RAR, autorizație nr. ",
						SITE.authNumber,
						". Inspecții rapide, corecte și transparente pentru toate categoriile de vehicule."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold uppercase tracking-wider text-foreground",
					children: "Navigare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/servicii",
							className: "hover:text-foreground",
							children: "Servicii"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/preturi",
							className: "hover:text-foreground",
							children: "Prețuri"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/echipa",
							className: "hover:text-foreground",
							children: "Echipă și acreditări"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/galerie",
							className: "hover:text-foreground",
							children: "Galerie foto"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/informatii",
							className: "hover:text-foreground",
							children: "Informații ITP"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold uppercase tracking-wider text-foreground",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 shrink-0 text-primary" }), SITE.address]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-primary" }), SITE.phone]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 shrink-0 text-primary" }), SITE.email]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold uppercase tracking-wider text-foreground",
					children: "Program"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: SITE.schedule.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-foreground",
							children: s.day
						}), s.hours] })]
					}, s.day))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border py-5 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				SITE.name,
				" · Toate drepturile rezervate"
			]
		})]
	});
}
var styles_default = "/assets/styles-CmLf5I35.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AutoNeg — Stație ITP autorizată RAR în Galați" },
			{
				name: "description",
				content: "Stație ITP autorizată RAR în Galați: programare online, prețuri transparente și ingineri atestați."
			},
			{
				name: "author",
				content: "AutoNeg"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ro",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-Cw3l03HB.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "AutoNeg — Stație ITP autorizată RAR în Galați" },
		{
			name: "description",
			content: "Inspecție tehnică periodică rapidă la AutoNeg Galați: programare online, prețuri transparente, ingineri atestați RAR și echipamente moderne."
		},
		{
			property: "og:title",
			content: "AutoNeg — Stație ITP autorizată RAR în Galați"
		},
		{
			property: "og:description",
			content: "Programează online ITP-ul în 30 de minute. Prețuri transparente și inspectori atestați RAR."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./contact-s6DPCN2O.mjs");
var Route$6 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact stație ITP AutoNeg — Galați" },
		{
			name: "description",
			content: "Adresă, telefon, email și program de lucru pentru stația ITP AutoNeg din Galați. Sună-ne sau programează-te online."
		},
		{
			property: "og:title",
			content: "Contact stație ITP AutoNeg — Com. Corod, Jud. Galati"
		},
		{
			property: "og:description",
			content: "Ne găsești în ția ITP AutoNeg din Galați. Sună-ne sau programează-te online."
		},
		{
			property: "og:title",
			content: "Contact stație ITP AutoNeg — , Str. Stefan cel Mare nr. 128. Program luni–sâmbătă."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./echipa-Dehh5xs4.mjs");
var Route$5 = createFileRoute("/echipa")({
	head: () => ({ meta: [
		{ title: "Echipa de ingineri și acreditări — AutoNeg" },
		{
			name: "description",
			content: "Inginerii AutoNeg, condusi de Negruț Cosmin, sunt inspectori atestați RAR. Vezi specializările echipei și acreditările stației ITP."
		},
		{
			property: "og:title",
			content: "Echipa de ingineri și acreditări — AutoNeg"
		},
		{
			property: "og:description",
			content: "Inspectori tehnici atestați RAR, cu experiență în inspecții auto și diagnoză."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./galerie-p_AS4hQ6.mjs");
var Route$4 = createFileRoute("/galerie")({
	head: () => ({ meta: [
		{ title: "Galerie foto stație ITP — AutoNeg" },
		{
			name: "description",
			content: "Fotografii din stația ITP AutoNeg: linia de inspecție, standul de frâne, analizorul de noxe, reglofarul și zona de recepție."
		},
		{
			property: "og:title",
			content: "Galerie foto stație ITP — AutoNeg"
		},
		{
			property: "og:description",
			content: "Vezi cum arată stația noastră de inspecție tehnică și echipamentele folosite."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./informatii-Egyi2_92.mjs");
var Route$3 = createFileRoute("/informatii")({
	head: () => ({ meta: [
		{ title: "Ce riști fără ITP și cum pregătești mașina — AutoNeg" },
		{
			name: "description",
			content: "Amenzi și consecințe dacă nu faci ITP la timp, plus lista completă de verificări tehnice și estetice pentru a trece inspecția din prima."
		},
		{
			property: "og:title",
			content: "Ce riști fără ITP și cum pregătești mașina — AutoNeg"
		},
		{
			property: "og:description",
			content: "Ghid complet: sancțiuni, acte necesare, checklist tehnic și estetic înainte de inspecția tehnică periodică."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./preturi-DDEmYhfS.mjs");
var Route$2 = createFileRoute("/preturi")({
	head: () => ({ meta: [
		{ title: "Prețuri ITP 2026 — AutoNeg Galați" },
		{
			name: "description",
			content: "Lista de prețuri ITP AutoNeg: autoturisme, autoutilitare, remorci, motociclete, taxi și servicii suplimentare. Fără costuri ascunse."
		},
		{
			property: "og:title",
			content: "Prețuri ITP — AutoNeg Galați"
		},
		{
			property: "og:description",
			content: "Tarife transparente pentru inspecția tehnică periodică și serviciile conexe."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./programare-Su2rHUT5.mjs");
var Route$1 = createFileRoute("/programare")({
	head: () => ({ meta: [
		{ title: "Programare ITP online — AutoNeg Galați" },
		{
			name: "description",
			content: "Rezervă online ora pentru inspecția tehnică periodică la AutoNeg. Alege data, intervalul orar și categoria vehiculului în mai puțin de un minut."
		},
		{
			property: "og:title",
			content: "Programare ITP online — AutoNeg"
		},
		{
			property: "og:description",
			content: "Alege data și ora pentru inspecția tehnică. Confirmare telefonică rapidă."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./servicii-fX7j-ZkE.mjs");
var Route = createFileRoute("/servicii")({
	head: () => ({ meta: [
		{ title: "Servicii ITP și verificări tehnice — AutoNeg Galați" },
		{
			name: "description",
			content: "Inspecție tehnică periodică pentru autoturisme, autoutilitare, remorci și motociclete, plus verificare pre-ITP, reglaj faruri, test frâne și diagnoză."
		},
		{
			property: "og:title",
			content: "Servicii ITP și verificări tehnice — AutoNeg"
		},
		{
			property: "og:description",
			content: "ITP autorizat RAR pentru toate categoriile de vehicule și servicii tehnice conexe."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	ContactRoute: Route$6.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$8
	}),
	EchipaRoute: Route$5.update({
		id: "/echipa",
		path: "/echipa",
		getParentRoute: () => Route$8
	}),
	GalerieRoute: Route$4.update({
		id: "/galerie",
		path: "/galerie",
		getParentRoute: () => Route$8
	}),
	InformatiiRoute: Route$3.update({
		id: "/informatii",
		path: "/informatii",
		getParentRoute: () => Route$8
	}),
	PreturiRoute: Route$2.update({
		id: "/preturi",
		path: "/preturi",
		getParentRoute: () => Route$8
	}),
	ProgramareRoute: Route$1.update({
		id: "/programare",
		path: "/programare",
		getParentRoute: () => Route$8
	}),
	ServiciiRoute: Route.update({
		id: "/servicii",
		path: "/servicii",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { PRICES as a, VEHICLE_CATEGORIES as c, EXTRA_SERVICES as i, ACCREDITATIONS as n, SITE as o, ENGINEERS as r, TIME_SLOTS as s, router_exports as t };
