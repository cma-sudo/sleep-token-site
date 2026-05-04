# Sleep Token / Analyses

Site personnel d'analyses longues sur Sleep Token. Astro + GitHub Pages + Giscus.

**Stack** :
- **Astro** — site statique, très rapide
- **GitHub Pages** — hébergement gratuit
- **Giscus** — commentaires basés sur GitHub Discussions
- **GitHub Actions** — build/deploy automatique + notification Discord
- **Pas de newsletter** (Discord remplace, mieux adapté au rythme libre)

## Premier déploiement — checklist

### 1. Créer le repo GitHub

```bash
gh repo create sleep-token-site --public --source=. --remote=origin
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2. Activer GitHub Pages

Dans le repo sur github.com :
- **Settings → Pages → Source : GitHub Actions** (pas "Deploy from branch")

### 3. Adapter `astro.config.mjs`

Édite ces deux lignes selon ton username :

```js
site: 'https://TON_USER.github.io',
base: '/sleep-token-site',  // nom du repo
```

### 4. Activer Discussions sur le repo

- **Settings → General → Features → Discussions** : coche
- Crée une catégorie "Articles" type **Announcement** (lecture seule sauf mainteneurs pour les posts, commentaires libres pour tout le monde)

### 5. Configurer Giscus

Va sur **https://giscus.app**, remplis le formulaire avec ton repo. Tu obtiens 4 valeurs :
- `data-repo`
- `data-repo-id`
- `data-category`
- `data-category-id`

Édite `src/layouts/PostLayout.astro` et remplace les `REMPLACE_PAR_*` correspondants.

### 6. Configurer le webhook Discord (optionnel)

Sur ton serveur Discord :
- **Paramètres du serveur → Intégrations → Webhooks → Nouveau webhook**
- Copie l'URL du webhook
- Sur GitHub : **Settings → Secrets and variables → Actions** :
  - Nouveau **Secret** : `DISCORD_WEBHOOK` = l'URL copiée
  - Nouvelle **Variable** : `SITE_URL` = `https://TON_USER.github.io/sleep-token-site` (sans slash final)

### 7. Lien Discord public

Cherche `REMPLACE_PAR_TON_INVITE` dans tout le projet et remplace par ton lien d'invitation Discord (`discord.gg/xxxxx`).

```bash
grep -rn "REMPLACE_PAR" src/
```

## Workflow d'écriture

### Création d'un nouvel article

```bash
# Créer un fichier dans src/content/posts/
# Format : YYYY-MM-DD-slug-kebab-case.md
```

Frontmatter requis :

```yaml
---
title: "Titre de l'article"
description: "Description courte (1-2 phrases) qui apparaît dans la liste et les méta tags"
date: 2026-05-04
era: "Even in Arcadia"  # optionnel : Sundowning | This Place | Take Me Back to Eden | Even in Arcadia | Inter-cycle | Méta
tags: ["analyse", "cycles"]  # optionnel
confidence: 0.85  # optionnel : 0 à 1
draft: false  # mettre true pour cacher
---
```

Le contenu est en Markdown standard. Les articles avec `draft: true` ne s'affichent pas.

### Test local

```bash
npm install
npm run dev
# Ouvre http://localhost:4321
```

### Publication

```bash
git add src/content/posts/2026-XX-XX-mon-article.md
git commit -m "post: Mon article"
git push
```

GitHub Actions :
1. Build le site
2. Déploie sur GitHub Pages (~2 min)
3. Détecte le nouvel article et poste une notif dans Discord

## Garde-fous juridiques (important)

Le contexte Rico Management / RCA est tendu (vague Content ID YouTube en avril-mai 2026, plaintes copyright multiples sur tatoueuses et photographes en 2025). Pour minimiser le risque :

- **Aucune image officielle** Sleep Token (pochettes, photos de live, captures de clips)
- **Aucune lyric reproduite** au-delà de citations très courtes au strict cadre du droit de citation
- **Aucun audio/vidéo** intégré
- **Mentionner systématiquement** dans le footer "non affilié" (déjà fait)

L'analyse texte reste protégée par la liberté d'expression et le droit de citation. Les visuels et l'audio ne le sont pas dans la même mesure.

## Évolutions possibles plus tard

- Domaine custom : ajouter un fichier `public/CNAME` avec le domaine, pointer le DNS, retirer `base` dans astro.config
- Newsletter : ajouter Buttondown si la dynamique s'installe
- Recherche : pagefind (générateur statique d'index full-text)
- Mode présentation Sleep Token unique : ajouter un toggle ère active dans le header

## Structure

```
sleep-token-site/
├── astro.config.mjs        # Config Astro (URL, base path)
├── package.json
├── src/
│   ├── content/
│   │   ├── config.ts       # Schéma des articles
│   │   └── posts/          # ← Articles en markdown
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── index.astro     # Accueil
│   │   ├── about.astro
│   │   ├── posts/[...slug].astro
│   │   └── rss.xml.js
│   └── styles/
│       └── global.css      # Design system
└── .github/workflows/
    └── deploy.yml          # Build + deploy + notif Discord
```
