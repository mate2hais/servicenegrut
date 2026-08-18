import { n as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-CUF6Mbtm2.mjs";
import { n as object, r as string, t as literal } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CircleCheck, E as CalendarCheck, m as LoaderCircle } from "../_libs/lucide-react.mjs";
import { c as VEHICLE_CATEGORIES, o as SITE, s as TIME_SLOTS } from "./router-DhYNb39O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programare-Su2rHUT5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var appointmentSchema = object({
	full_name: string().min(3).max(80),
	phone: string().min(6).max(25),
	email: string().email().max(120).optional().or(literal("")),
	plate: string().min(4).max(15),
	car_model: string().max(80).optional().or(literal("")),
	vehicle_category: string().min(2).max(60),
	preferred_date: string().min(8).max(20),
	preferred_time: string().min(4).max(10),
	notes: string().max(600).optional().or(literal(""))
});
var createAppointment = createServerFn({ method: "POST" }).inputValidator((data) => appointmentSchema.parse(data)).handler(createSsrRpc("52202c0fe9cced691b9e5c401ded308dd2f1b2db932a05ff8e37a647a31de2a2"));
function ProgramarePage() {
	const submit = useServerFn(createAppointment);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = {
			full_name: String(fd.get("full_name") ?? "").trim(),
			phone: String(fd.get("phone") ?? "").trim(),
			email: String(fd.get("email") ?? "").trim(),
			plate: String(fd.get("plate") ?? "").trim(),
			car_model: String(fd.get("car_model") ?? "").trim(),
			vehicle_category: String(fd.get("vehicle_category") ?? ""),
			preferred_date: String(fd.get("preferred_date") ?? ""),
			preferred_time: String(fd.get("preferred_time") ?? ""),
			notes: String(fd.get("notes") ?? "").trim()
		};
		if (payload.full_name.length < 3 || payload.phone.length < 6 || payload.plate.length < 4) {
			toast.error("Completează numele, telefonul și numărul de înmatriculare.");
			return;
		}
		setLoading(true);
		try {
			await submit({ data: payload });
			setDone(true);
			toast.success("Programarea a fost trimisă!");
		} catch {
			toast.error("Nu am putut trimite programarea. Încearcă din nou sau sună-ne.");
		} finally {
			setLoading(false);
		}
	};
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-14 w-14 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-3xl font-extrabold tracking-tight",
				children: "Cererea ta a fost trimisă"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-muted-foreground",
				children: [
					"Te sunăm în cel mult o oră lucrătoare pentru a confirma ora exactă. Dacă e urgent, ne poți suna direct la ",
					SITE.phone,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setDone(false),
				className: "mt-8 rounded-lg border border-border px-6 py-3 text-sm font-semibold",
				children: "Fă o altă programare"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Programare"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "h-8 w-8 text-primary" }), "Rezervă ora pentru ITP"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Completează formularul, iar noi confirmăm telefonic intervalul ales. Durata medie a inspecției este de 30 de minute."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nume și prenume *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "full_name",
							required: true,
							maxLength: 80,
							className: inputCls,
							placeholder: "Ion Popescu"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Telefon *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "phone",
							required: true,
							type: "tel",
							maxLength: 25,
							className: inputCls,
							placeholder: "07xx xxx xxx"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							maxLength: 120,
							className: inputCls,
							placeholder: "email@exemplu.ro"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Număr de înmatriculare *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "plate",
							required: true,
							maxLength: 15,
							className: `${inputCls} uppercase`,
							placeholder: "GL 12 ABC"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Marcă și model",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "car_model",
							maxLength: 80,
							className: inputCls,
							placeholder: "Dacia Logan 1.5 dCi"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Categorie vehicul *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "vehicle_category",
							required: true,
							defaultValue: VEHICLE_CATEGORIES[0],
							className: inputCls,
							children: VEHICLE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Data dorită *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "preferred_date",
							required: true,
							type: "date",
							min: today,
							defaultValue: today,
							className: inputCls
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Interval orar *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "preferred_time",
							required: true,
							defaultValue: "09:00",
							className: inputCls,
							children: TIME_SLOTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Observații",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "notes",
								rows: 4,
								maxLength: 600,
								className: inputCls,
								placeholder: "Ex: instalație GPL, revin după reverificare, prefer dimineața..."
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-60",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Trimite cererea de programare"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-xs text-muted-foreground",
							children: "Datele sunt folosite exclusiv pentru gestionarea programării."
						})]
					})
				]
			})
		]
	});
}
var inputCls = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { ProgramarePage as component };
