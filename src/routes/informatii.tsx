import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, FileText, Sparkles, XCircle } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/informatii")({
  head: () => ({
    meta: [
      { title: "Ce riști fără ITP și cum pregătești mașina — AutoNeg" },
      { name: "description", content: "Amenzi și consecințe dacă nu faci ITP la timp, plus lista completă de verificări tehnice și estetice pentru a trece inspecția din prima." },
      { property: "og:title", content: "Ce riști fără ITP și cum pregătești mașina — AutoNeg" },
      { property: "og:description", content: "Ghid complet: sancțiuni, acte necesare, checklist tehnic și estetic înainte de inspecția tehnică periodică." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InformatiiPage,
});

const RISKS = [
  {
    title: "Amendă contravențională",
    text: "Conducerea unui vehicul fără ITP valabil se sancționează cu amendă din clasa a IV-a de sancțiuni (câteva sute de lei, în funcție de valoarea punctului-amendă).",
  },
  {
    title: "Reținerea certificatului de înmatriculare",
    text: "Polițistul reține certificatul de înmatriculare și eliberează o dovadă fără drept de circulație până la efectuarea inspecției.",
  },
  {
    title: "Probleme cu despăgubirea RCA / CASCO",
    text: "În caz de accident, lipsa ITP-ului valabil poate duce la regres din partea asigurătorului sau la refuzul plății daunei pe CASCO.",
  },
  {
    title: "Risc de siguranță",
    text: "Frâne uzate, amortizoare moarte sau anvelope sub limită cresc semnificativ distanța de oprire și riscul de accident.",
  },
  {
    title: "Blocaje administrative",
    text: "Fără ITP valabil nu poți vinde, radia sau reînmatricula vehiculul și nu poți obține rovinieta pentru anumite categorii de transport.",
  },
];

const TECH_CHECKS = [
  "Frâne: plăcuțe și discuri în limita de uzură, fără scurgeri de lichid, frâna de mână funcțională.",
  "Direcție și suspensie: fără jocuri la capete de bară, bucșe și pivoți; amortizoare fără scurgeri.",
  "Anvelope: adâncime profil minim 1.6 mm, același tip pe aceeași axă, fără tăieturi sau umflături.",
  "Iluminare: toate becurile funcționale (faruri, poziții, stopuri, semnalizatoare, marșarier, plăcuță).",
  "Emisii: motor la temperatura de lucru, filtru de particule și catalizator funcționale, fără fum excesiv.",
  "Evacuare: fără găuri sau zgomot peste limită, toba și racordurile etanșe.",
  "Parbriz și geamuri: fără fisuri în câmpul vizual al șoferului, ștergătoare și spălător funcționale.",
  "Centuri de siguranță: fără rupturi, se blochează la tragere bruscă, cataramele funcționale.",
  "Fluide: fără scurgeri de ulei, lichid de frână sau antigel sub mașină.",
  "Baterie și electrice: fixată corect, fără oxidare, martori de avarie stinși în bord.",
];

const AESTHETIC_CHECKS = [
  "Numere de înmatriculare curate, lizibile, fixate corect și fără deteriorări.",
  "Caroserie fără muchii tăioase sau elemente desprinse (bare, praguri, aripi) care pot răni pietonii.",
  "Fără rugină perforantă pe elementele de rezistență (praguri, lonjeroane, puncte de prindere).",
  "Oglinzi retrovizoare complete, fixate și fără sticla spartă.",
  "Folii pe geamuri doar în limitele legale; parbrizul și geamurile laterale față trebuie să asigure vizibilitate.",
  "Interior curat, fără obiecte care blochează pedalele sau vizibilitatea.",
  "Modificări (jante, suspensie, instalație GPL, cârlig de remorcare) omologate și înscrise în talon.",
  "Mașina prezentată spălată — murdăria excesivă poate împiedica verificarea corectă a caroseriei și a numărului de șasiu.",
];

const DOCS = [
  "Certificatul de înmatriculare (talonul) în original.",
  "Cartea de identitate a vehiculului (CIV).",
  "Actul de identitate al persoanei care prezintă vehiculul.",
  "Asigurarea RCA valabilă.",
  "Pentru instalații GPL: certificatul de omologare / montaj.",
];

const FAQ = [
  { q: "Cât de des trebuie făcut ITP-ul?", a: "Autoturismele noi se prezintă la 3 ani de la prima înmatriculare, apoi la 2 ani, iar după 12 ani vechime anual. Taxiurile, școlile de șoferi și transportul de persoane se prezintă la 6 luni." },
  { q: "Pot face ITP mai devreme?", a: "Da, poți face inspecția cu până la 30 de zile înainte de expirare, fără să pierzi din valabilitate — noua perioadă se calculează de la data expirării." },
  { q: "Ce se întâmplă dacă mașina nu trece?", a: "Primești raportul cu defectele constatate. Ai 30 de zile să remediezi problemele și să revii pentru reverificare la tarif redus, fără a relua întreaga inspecție." },
  { q: "Cât durează o inspecție?", a: "În medie 30 de minute pentru un autoturism, dacă vii la ora programată și actele sunt complete." },
  { q: "Mașina trebuie să fie spălată?", a: "Da, recomandăm insistent. Murdăria excesivă pe caroserie și pe partea inferioară poate împiedica verificarea și poate duce la amânarea inspecției." },
  { q: "Pot veni fără programare?", a: "Da, în limita locurilor disponibile, dar programarea online îți garantează ora și reduce timpul de așteptare." },
];

function InformatiiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Informații utile</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Ce riști fără ITP și cum îți pregătești mașina
      </h1>
      <p className="mt-4 text-muted-foreground">
        Inspecția tehnică periodică nu e doar o formalitate: e obligatorie prin lege și este singura
        verificare independentă a stării mașinii tale. Mai jos găsești consecințele lipsei ITP-ului
        și lista completă de pregătire.
      </p>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          La ce te expui dacă nu faci ITP
        </h2>
        <div className="mt-6 space-y-4">
          {RISKS.map((r) => (
            <div key={r.title} className="rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <XCircle className="h-4 w-4 text-destructive" />
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Valorile amenzilor se actualizează periodic prin lege; îți recomandăm să verifici cuantumul
          în vigoare la data controlului.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          Checklist tehnic înainte de inspecție
        </h2>
        <ul className="mt-6 space-y-3">
          {TECH_CHECKS.map((c) => (
            <li key={c} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Sparkles className="h-6 w-6 text-accent-foreground" />
          Aspect estetic și conformitate
        </h2>
        <ul className="mt-6 space-y-3">
          {AESTHETIC_CHECKS.map((c) => (
            <li key={c} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <FileText className="h-6 w-6 text-primary" />
          Acte necesare
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {DOCS.map((d) => (
            <li key={d} className="rounded-xl bg-muted px-4 py-3 text-sm">{d}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Întrebări frecvente</h2>
        <Accordion type="single" collapsible className="mt-4">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Link
        to="/programare"
        className="mt-12 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Programează inspecția
      </Link>
    </div>
  );
}
