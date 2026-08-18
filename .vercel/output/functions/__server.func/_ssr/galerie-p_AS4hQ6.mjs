import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as hero_itp_default, n as gallery_headlight_default, r as gallery_lift_default, t as gallery_emissions_default } from "./gallery-headlight-Bj-PX8pp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/galerie-p_AS4hQ6.js
var import_jsx_runtime = require_jsx_runtime();
var PHOTOS = [
	{
		src: hero_itp_default,
		alt: "Autoturism pe linia de inspecție tehnică AutoNeg",
		caption: "Linia de inspecție"
	},
	{
		src: gallery_lift_default,
		alt: "Inginer verificând suspensia unei mașini pe elevator",
		caption: "Verificare pe elevator"
	},
	{
		src: gallery_emissions_default,
		alt: "Sondă analizor de noxe introdusă în eșapamentul unei mașini",
		caption: "Măsurare noxe"
	},
	{
		src: gallery_headlight_default,
		alt: "Aparat de reglaj faruri poziționat în fața unui far",
		caption: "Reglaj faruri"
	},
	{
		src: "/assets/gallery-suspension-CPbAU-vg.jpg",
		alt: "Roată de mașină pe placa standului de testare a suspensiei",
		caption: "Stand suspensii"
	},
	{
		src: "/assets/gallery-diagnostics-KDKXB5df.jpg",
		alt: "Tehnician folosind o tabletă de diagnoză conectată la mașină",
		caption: "Diagnoză computerizată"
	},
	{
		src: "/assets/gallery-reception-BW1_Z7yN.jpg",
		alt: "Zona de recepție și așteptare a service-ului auto",
		caption: "Recepție și zonă de așteptare"
	}
];
function GaleriePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Galerie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Stația noastră în imagini"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Hală modernă, echipamente verificate metrologic și o zonă de așteptare confortabilă pentru cele 30 de minute cât durează inspecția."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: PHOTOS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.src,
						alt: p.alt,
						loading: "lazy",
						width: 1200,
						height: 800,
						className: "h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "px-5 py-3 text-sm font-medium text-muted-foreground",
						children: p.caption
					})]
				}, p.caption))
			})
		]
	});
}
//#endregion
export { GaleriePage as component };
