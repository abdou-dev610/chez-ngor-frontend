# Chez Ngor — Frontend React

Interface web complète pour le restaurant sénégalais **Chez Ngor** · React / Vite / Tailwind CSS

---

## Technologies

| Couche         | Technologie             |
|----------------|-------------------------|
| Framework      | React 18                |
| Build          | Vite 6                  |
| CSS            | Tailwind CSS 3          |
| Routing        | React Router DOM v6     |
| HTTP Client    | Axios                   |
| Forms          | React Hook Form         |
| Icons          | Lucide React            |

---

## Structure du projet

```
chez-ngor-frontend/
├── src/
│   ├── api/axios.js              — Instance Axios + intercepteurs JWT
│   ├── context/AuthContext.jsx   — Contexte d'authentification admin
│   ├── components/
│   │   ├── layout/               — Header, Footer
│   │   ├── home/                 — Hero, Perks, FeaturedMenu, History, Testimonials, ReservationSection
│   │   ├── ui/                   — MenuCard, TestimonialCard, Spinner
│   │   └── admin/                — AdminLayout, Sidebar, ProtectedRoute
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Specialites.jsx
│   │   ├── APropos.jsx
│   │   ├── Contact.jsx
│   │   ├── Reservation.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── MenuAdmin.jsx
│   │       ├── ReservationsAdmin.jsx
│   │       ├── TestimonialsAdmin.jsx
│   │       └── MessagesAdmin.jsx
│   ├── App.jsx                   — Routes principales
│   ├── main.jsx                  — Point d'entrée React
│   └── index.css                 — Styles Tailwind + custom
├── index.html
├── vite.config.js
├── tailwind.config.js
├── .env
└── package.json
```

---

## Installation

```bash
cd chez-ngor-frontend
npm install
```

---

## Variables d'environnement

Copier `.env.example` en `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Lancer le projet

```bash
# S'assurer que le backend tourne d'abord (port 5000)

# Lancer le frontend
npm run dev
# → http://localhost:5173
```

---

## Pages disponibles

| Route                    | Description                        |
|--------------------------|------------------------------------|
| `/`                      | Accueil (hero, menu, témoignages)  |
| `/menu`                  | Carte complète avec filtres        |
| `/specialites`           | Plats avec badge uniquement        |
| `/a-propos`              | Histoire et valeurs                |
| `/contact`               | Formulaire de contact              |
| `/reservation`           | Formulaire de réservation          |
| `/admin/login`           | Connexion administrateur           |
| `/admin/dashboard`       | Tableau de bord (stats)            |
| `/admin/menu`            | CRUD menu                          |
| `/admin/reservations`    | Gestion réservations               |
| `/admin/testimonials`    | CRUD témoignages                   |
| `/admin/messages`        | Messages de contact                |

---

## Déploiement sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. **New Project** → importer le repo GitHub
3. Sélectionner le dossier `chez-ngor-frontend`
4. Framework preset : **Vite**
5. Ajouter la variable d'environnement :
   - `VITE_API_URL` = `https://ton-backend.onrender.com/api`
6. Déployer

---

## Identifiants admin de test

```
Email    : admin@chezngor.com
Password : Admin12345
```

> Ces identifiants sont insérés par le script `npm run seed` dans le backend.

---

## Palette de couleurs

| Couleur        | Valeur     | Usage                     |
|----------------|------------|---------------------------|
| Marron foncé   | `#3E1C00`  | Brand, header, footer     |
| Orange         | `#D97706`  | Boutons, accents, prix    |
| Beige clair    | `#FEF9F0`  | Fond de sections          |
| Blanc          | `#FFFFFF`  | Cartes, fond général      |
| Noir doux      | `#1A1A1A`  | Texte principal           |
