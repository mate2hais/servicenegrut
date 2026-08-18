import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-CUF6Mbtm2.mjs";
import { n as object, r as string, t as literal } from "../_libs/zod.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/appointments.functions-BS-fK1iG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function createPublicSupabase() {
	const url = processModule.env["SUPABASE_URL"];
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	return createClient(url, key, {
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
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
var createAppointment_createServerFn_handler = createServerRpc({
	id: "52202c0fe9cced691b9e5c401ded308dd2f1b2db932a05ff8e37a647a31de2a2",
	name: "createAppointment",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => createAppointment.__executeServer(opts));
var createAppointment = createServerFn({ method: "POST" }).inputValidator((data) => appointmentSchema.parse(data)).handler(createAppointment_createServerFn_handler, async ({ data }) => {
	const { error } = await createPublicSupabase().from("appointments").insert({
		full_name: data.full_name,
		phone: data.phone,
		email: data.email || null,
		plate: data.plate.toUpperCase(),
		car_model: data.car_model || null,
		vehicle_category: data.vehicle_category,
		preferred_date: data.preferred_date,
		preferred_time: data.preferred_time,
		notes: data.notes || null
	});
	if (error) throw new Error("Programarea nu a putut fi salvată. Încearcă din nou.");
	return { ok: true };
});
//#endregion
export { createAppointment_createServerFn_handler };
