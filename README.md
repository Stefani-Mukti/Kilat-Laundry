# KilatLaundry — Website Multi-Halaman

Website statis (HTML5 + CSS3 + Vanilla JS, tanpa framework) untuk jasa laundry
antar-jemput. Fokus utama: mendorong pemesanan lewat **WhatsApp**, bukan
checkout e-commerce.

## Cara Menjalankan

Navbar, footer, dan tombol WhatsApp mengambang dimuat secara dinamis lewat
`fetch()` dari folder `components/`. Karena browser memblokir `fetch()` ke
file lokal (`file://`), situs ini **harus dijalankan lewat local server**,
bukan dibuka langsung dengan double-click.

Pilih salah satu cara berikut dari folder `Laundry-Web/`:

```bash
# Opsi 1 — Node.js
npx serve .

# Opsi 2 — Python 3
python -m http.server 8080

# Opsi 3 — VS Code
# Install ekstensi "Live Server", klik kanan index.html → "Open with Live Server"
```

Lalu buka `http://localhost:PORT/index.html` di browser.

Untuk deploy production, unggah seluruh folder ke hosting statis apa pun
(Netlify, Vercel, GitHub Pages, cPanel, dsb) — semuanya otomatis berjalan
lewat HTTP(S) sehingga `fetch()` berfungsi normal.

## Struktur Folder

```
Laundry-Web/
│
├── index.html            → Home
├── about.html             → About
├── services.html          → Services
├── pricing.html            → Pricing
├── how-it-works.html      → How It Works
├── coverage-area.html     → Coverage Area
├── faq.html                → FAQ
├── gallery.html            → Gallery
├── contact.html            → Contact
├── payment.html            → Metode Pembayaran
├── robots.txt
├── sitemap.xml
│
├── assets/
│   ├── css/
│   │   ├── variables.css    → Design tokens (warna, tipografi, spacing, radius, shadow)
│   │   ├── base.css         → Reset & utility classes
│   │   ├── navbar.css       → Navbar + hamburger drawer
│   │   ├── footer.css       → Footer
│   │   ├── hero.css         → Hero section + signature "route" motif
│   │   ├── components.css   → Button, card, form, accordion, pricing, dll.
│   │   ├── animations.css   → Keyframes tambahan
│   │   └── pages/           → Override kecil khusus per halaman (opsional)
│   ├── js/
│   │   ├── config.js        → Nama brand, nomor WhatsApp, alamat, dll — EDIT DI SINI
│   │   ├── components.js    → Loader navbar/footer/WA + mobile menu + active link
│   │   └── main.js          → Scroll reveal, accordion FAQ, form → WhatsApp
│   ├── images/               → Ganti gambar placeholder (picsum.photos) dengan foto asli
│   ├── icons/
│   │   └── favicon.svg
│   └── fonts/                 → (opsional, saat ini pakai Google Fonts CDN)
│
├── components/
│   ├── navbar.html          → Navbar (1 file, dipakai semua halaman)
│   ├── footer.html          → Footer (1 file, dipakai semua halaman)
│   └── floating-wa.html     → Tombol WhatsApp mengambang
│
└── README.md
```

## Cara Mengedit Hal-Hal Umum

| Ingin ubah...                        | Edit file...                          |
|---------------------------------------|----------------------------------------|
| Nomor WhatsApp / nama brand / alamat | `assets/js/config.js`                 |
| Menu navigasi                         | `components/navbar.html`              |
| Isi footer                            | `components/footer.html`              |
| Warna, radius, shadow, font           | `assets/css/variables.css`            |
| Teks & konten tiap halaman            | file `.html` halaman terkait          |

Karena navbar dan footer hanya ada di satu file masing-masing, mengubah menu
atau kontak cukup dilakukan sekali dan otomatis berlaku di seluruh 10 halaman.

## Fitur

- 100% vanilla HTML/CSS/JS — tanpa build step, tanpa framework.
- Mobile-first & responsive penuh (breakpoint 920px & 560px).
- Navbar reusable dengan hamburger menu (mobile) yang hanya berisi tautan ke
  halaman lain — bukan scroll ke section.
- Semua tombol CTA utama mengarah ke `wa.me` dengan pesan pre-filled berbeda
  sesuai konteks halaman (pricing, order, coverage, dll).
- Form kontak yang menyusun pesan WhatsApp otomatis dari input pengguna.
- SEO dasar: meta description unik per halaman, canonical URL, Open Graph,
  `robots.txt`, `sitemap.xml`, dan schema.org (`LaundryService`, `FAQPage`).
- Reveal-on-scroll, hover micro-interaction, dan animasi tombol WA mengambang
  — semua menghormati `prefers-reduced-motion`.

## Sebelum Go-Live

1. Ganti nomor WhatsApp, email, dan alamat di `assets/js/config.js`.
2. Ganti seluruh gambar placeholder (`picsum.photos`) di setiap halaman
   dengan foto asli di `assets/images/`.
3. Sesuaikan daftar area di `coverage-area.html` dan harga di `pricing.html`.
4. Update domain di tag `canonical`, Open Graph, `sitemap.xml`, dan
   `robots.txt` dari `kilatlaundry.id` ke domain asli.
