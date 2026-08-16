import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-itp.jpg";
import liftImg from "@/assets/gallery-lift.jpg";
import emissionsImg from "@/assets/gallery-emissions.jpg";
import headlightImg from "@/assets/gallery-headlight.jpg";
import receptionImg from "@/assets/gallery-reception.jpg";
import diagnosticsImg from "@/assets/gallery-diagnostics.jpg";
import suspensionImg from "@/assets/gallery-suspension.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie foto stație ITP — AutoNeg" },
      { name: "description", content: "Fotografii din stația ITP AutoNeg: linia de inspecție, standul de frâne, analizorul de noxe, reglofarul și zona de recepție." },
      { property: "og:title", content: "Galerie foto stație ITP — AutoNeg" },
      { property: "og:description", content: "Vezi cum arată stația noastră de inspecție tehnică și echipamentele folosite." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriePage,
});

const PHOTOS = [
  { src: heroImg, alt: "Autoturism pe linia de inspecție tehnică AutoNeg", caption: "Linia de inspecție" },
  { src: liftImg, alt: "Inginer verificând suspensia unei mașini pe elevator", caption: "Verificare pe elevator" },
  { src: emissionsImg, alt: "Sondă analizor de noxe introdusă în eșapamentul unei mașini", caption: "Măsurare noxe" },
  { src: headlightImg, alt: "Aparat de reglaj faruri poziționat în fața unui far", caption: "Reglaj faruri" },
  { src: suspensionImg, alt: "Roată de mașină pe placa standului de testare a suspensiei", caption: "Stand suspensii" },
  { src: diagnosticsImg, alt: "Tehnician folosind o tabletă de diagnoză conectată la mașină", caption: "Diagnoză computerizată" },
  { src: receptionImg, alt: "Zona de recepție și așteptare a service-ului auto", caption: "Recepție și zonă de așteptare" },
];

function GaleriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Galerie</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Stația noastră în imagini</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Hală modernă, echipamente verificate metrologic și o zonă de așteptare confortabilă pentru
        cele 30 de minute cât durează inspecția.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((p) => (
          <figure key={p.caption} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              width={1200}
              height={800}
              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <figcaption className="px-5 py-3 text-sm font-medium text-muted-foreground">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
