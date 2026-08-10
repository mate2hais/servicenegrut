# Plan: Aplicație de închiriat biciclete "Uber-style" — Galați

## Scop
O aplicație web unde utilizatorii autentificați pot vedea pe hartă o flotă de 50 de biciclete în Galați, pot închiri cea mai apropiată bicicletă, pot urmări în timp real cursa, pot seta o destinație și pot vedea costul estimat (1 leu/km). Plata cu cardul va fi simulată în această fază.

## Tehnologii
- Lovable Cloud (auth + bază de date)
- Google Maps Platform (hartă, locație, rutare)
- TanStack Start + React + Tailwind CSS

## Structura aplicației

### Rute
- `/` — landing page cu CTA "Începe o cursă" și login
- `/auth` — autentificare / înregistrare (email + Google)
- `/app` — zona principală (protejată, sub `_authenticated/`)
  - `/app/map` — harta cu bicicletele și buton de închiriere
  - `/app/ride` — ecranul de cursă activă (timp, distanță, cost, baterie, destinație)
  - `/app/history` — istoricul curselor

### Baza de date
- `profiles` — profil user (id, nume, telefon, created_at, updated_at)
- `bikes` — flotă de biciclete (id, status, battery_level, lat, lng, code, created_at, updated_at)
- `rides` — curse (id, user_id, bike_id, start_lat, start_lng, end_lat, end_lng, started_at, ended_at, distance_km, cost_lei, status, destination_lat, destination_lng, created_at, updated_at)

### Funcționalități cheie
1. **Hartă live**
   - Încarcă Google Maps async cu markeri pentru biciclete.
   - Bicicletele au baterie vizibilă (culoare: verde >50%, galben 20-50%, roșu <20%).
   - User-ul vede propria locație și cea mai apropiată bicicletă.
2. **Închiriere**
   - Buton "Deblochează bicicleta" pentru cea mai apropiată disponibilă.
   - La deblocare: ecran cu bateria și confirmare start cursă.
3. **Cursă activă**
   - Contorizare timp și distanță (simulată prin update periodic al poziției).
   - Cost live = distanță km × 1 leu.
   - Buton "Setează destinație" — deschide search pe hartă, calculează rută și cost estimat total.
   - Buton "Încheie cursa".
4. **Plată simulată**
   - Ecran de plată cu card (date fictive, fără procesare reală).
   - Confirmare plată reușită.
5. **Istoric**
   - Listă cu curse trecute, distanță, cost, dată.

## Design
- Temă închisă, modernă, mobile-first.
- Culori: verde neon pentru acțiuni principale, gri închis pentru fundal.
- Header simplu cu logo, balanță cont (simulată) și logout.

## Date inițiale
- 50 de biciclete seed-uite în Galați, cu coordonate realiste în zone centrale și rezidențiale.

## Pași de implementare
1. Conectare Google Maps Platform.
2. Migrare bază de date + seed biciclete.
3. Configurare autentificare (email + Google).
4. Layout autentificat și rute.
5. Componenta de hartă cu markeri și geolocație.
6. Logica de închiriere și cursă activă.
7. Ecran destinație + cost estimat.
8. Simulare plată.
9. Istoric curse.
10. Testare end-to-end.
