# InvestGenius - All-in-One Investor Tools

Website interaktif untuk investor ritel di Indonesia, khususnya Gen Z, dengan kalkulator esensial, desain modern, dan performa tinggi.

![InvestGenius](https://img.shields.io/badge/InvestGenius-v1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🚀 Fitur

- **Kalkulator Average Down/Up** - Hitung harga rata-rata baru saat menambah posisi
- **Kalkulator Rights Issue** - Kalkulasi hak rights, dana wajib setor, dan efek dilusi
- **Kalkulator Dividen** - Hitung dividen bersih setelah pajak 10%
- **Kalkulator Risk/Reward** - Position sizing dan manajemen risiko per trade
- **Kalkulator Valuasi** - Graham Number dan PBV Band untuk valuasi saham

## 💎 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Deployment**: Vercel-ready

## 🎨 Design

- Dark mode default dengan aksen neon
- Glassmorphism effects
- Responsive design (Desktop, Tablet, Mobile)
- Smooth animations dan transitions

## 📦 Instalasi

```bash
# Clone repository
git clone <repo-url>
cd project_invest

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🛠️ Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Struktur Proyek

```
project_invest/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard
│   ├── average-down/        # Kalkulator Average Down
│   ├── rights-issue/        # Kalkulator Rights Issue
│   ├── dividen/             # Kalkulator Dividen
│   ├── risk-reward/         # Kalkulator Risk/Reward
│   └── valuasi/             # Kalkulator Valuasi
├── components/
│   ├── layout/              # Layout components
│   ├── calculators/         # Calculator components
│   └── ui/                  # Shadcn/UI components
├── lib/
│   ├── utils.ts             # Utility functions
│   └── calculations.ts      # Calculator logic
└── public/                  # Static assets
```

## 🧮 Rumus Kalkulasi

### Average Down/Up
```
Rata-rata Baru = (Modal Lama + Modal Baru) / Total Lembar Saham
```

### Rights Issue
```
Hak Rights = (Lot Lama / Rasio Lama) × Rasio Baru
Dana Wajib = Hak Rights × Exercise Price
```

### Dividen
```
Dividen Bersih = (Lot × 100 × DPS) × 90%
Dividend Yield = (DPS / Harga Saham) × 100%
```

### Graham Number
```
Graham Number = √(22.5 × EPS × BVPS)
```

### PBV Band
```
Harga Wajar = BVPS × PBV Level
```

## ☕ Support

Jika proyek ini bermanfaat, dukung pengembangan dengan traktir kopi! ☕

## 📄 License

MIT License - Bebas digunakan untuk keperluan pribadi dan komersial.

---

Made with ❤️ for Indonesian Gen Z Investors 🇮🇩
