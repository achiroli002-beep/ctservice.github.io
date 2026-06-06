# [NOME AZIENDA] — Sito Web B2B

Sito web istituzionale **one-page** per azienda italiana B2B produttrice di distributori automatici meccanici.
Navigazione ad ancora con scroll-spy attivo, smooth scroll e header sticky.

## Struttura del progetto

```
/
├── index.html          # Unica pagina: hero + 6 sezioni ancorate
├── assets/
│   ├── css/main.css    # Design system + tutti gli stili
│   ├── js/main.js      # Nav scroll-spy, reveal, contatori, configuratore, validazione
│   └── img/            # Cartella immagini (da popolare)
└── README.md
```

## Sezioni e ancore

| Ancora | Contenuto |
|---|---|
| `#azienda` | Chi siamo — identità aziendale + 4 valori |
| `#produzione` | Produzione — statistiche + timeline 6 fasi + ISO 9001 |
| `#prodotti` | Gamma — VM-CAP, VM-GAD, VM-PAL, VM-SFU, VM-PRO con configuratori |
| `#soluzioni` | Soluzioni per settore — Retail, Intrattenimento, Promo, Sport |
| `#preventivo` | Form richiesta preventivo B2B |
| `#contatti` | Info cards + form contatto |

Ancore sub-prodotto disponibili: `#capsule`, `#gadget`, `#palline`, `#sfuso-card`, `#promo`.

## Come personalizzare

### 1 · Nome azienda
Cercate `[NOME AZIENDA]` in `index.html` e sostituitelo con il nome reale.
Aggiornate P.IVA, REA, Cap. soc. nella sezione `#contatti` e nel footer.

### 2 · Design tokens (colori, font)
In `assets/css/main.css`, sezione `:root {}`:
```css
--ink:        #0E0F11;   /* Sfondo scuro principale */
--surface:    #1A1C20;   /* Sfondo sezioni elevate */
--paper:      #E8EAE6;   /* Sfondo sezioni chiare */
--brass:      #E0A43B;   /* Accento dorato (CTA, highlight) */
--brass-deep: #C8821E;   /* Hover dell'accento */
```

### 3 · Immagini prodotti
Cercate `<!-- TODO: inserire foto reale ... -->` in `index.html`.
Salvate le immagini in `assets/img/`. Proporzioni consigliate:
- Schede prodotto VM-CAP/GAD/PAL: **3:4** (es. 600×800 px)
- Hero macchina: **3:4** (es. 800×1066 px)
- Foto stabilimento (sezione Azienda): **4:3** (es. 800×600 px)
- Schede VM-SFU/PRO: **16:9** (es. 800×450 px)

### 4 · Integrazione form
In `index.html`, i tag `<form>` hanno `action="#"`. Per connettere i form:

**Formspree:**
```html
<form action="https://formspree.io/f/VOSTRO_ID" method="POST">
```

**Backend custom:** in `assets/js/main.js` cercate il commento `TODO: sostituire con fetch()`.

### 5 · Catalogo PDF
Nei link con `onclick="return false;"`, sostituite `href="#"` con il percorso al PDF:
```html
<a href="assets/img/catalogo-2025.pdf">↓ Catalogo PDF</a>
```

### 6 · Dati di contatto
Cercate `TODO: inserire` in `index.html` per trovare telefono, email, indirizzo, P.IVA.

## Stack tecnico
- HTML5 semantico · CSS custom properties + Grid/Flexbox + clamp()
- JavaScript vanilla — zero dipendenze esterne
- Google Fonts: Space Grotesk · Inter · IBM Plex Mono
- Navigazione one-page: smooth scroll + IntersectionObserver scroll-spy
- Accessibilità WCAG AA · prefers-reduced-motion · focus visibili
