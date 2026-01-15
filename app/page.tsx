import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculators = [
  {
    title: "Average Down/Up",
    description: "Hitung harga rata-rata baru saat menambah lot di posisi berbeda",
    href: "/average-down",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    color: "from-red-500/20 to-green-500/20",
    iconColor: "text-primary",
  },
  {
    title: "Rights Issue",
    description: "Kalkulasi hak rights, dana wajib setor, dan efek dilusi",
    href: "/rights-issue",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Dividen",
    description: "Hitung dividen bersih setelah pajak 10% dan dividend yield",
    href: "/dividen",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    title: "Risk/Reward",
    description: "Position sizing dan manajemen risiko per trade",
    href: "/risk-reward",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    title: "Valuasi",
    description: "Graham Number dan PBV Band untuk menilai harga wajar saham",
    href: "/valuasi",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl glass-card p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
              v1.0 Beta
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selamat datang di{" "}
            <span className="gradient-text">AM Invest</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            All-in-One Investor Tools untuk Gen Z Indonesia 🇮🇩
          </p>
          <p className="text-muted-foreground mt-2">
            Kalkulator investasi lengkap untuk membantu keputusan investasi yang lebih cerdas.
          </p>
        </div>
      </div>

      {/* Quick Stats / Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass text-center">
          <p className="text-2xl font-bold gradient-text">5</p>
          <p className="text-sm text-muted-foreground">Kalkulator</p>
        </div>
        <div className="p-4 rounded-xl glass text-center">
          <p className="text-2xl font-bold text-green-400">100%</p>
          <p className="text-sm text-muted-foreground">Gratis</p>
        </div>
        <div className="p-4 rounded-xl glass text-center">
          <p className="text-2xl font-bold text-cyan-400">0</p>
          <p className="text-sm text-muted-foreground">Iklan</p>
        </div>
        <div className="p-4 rounded-xl glass text-center">
          <p className="text-2xl font-bold text-purple-400">∞</p>
          <p className="text-sm text-muted-foreground">Penggunaan</p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Pilih Kalkulator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="h-full glass-card border-0 card-hover cursor-pointer group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardHeader className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-2 ${calc.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {calc.icon}
                  </div>
                  <CardTitle className="text-lg">{calc.title}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative pt-0">
                  <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform duration-300">
                    <span>Buka kalkulator</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="glass border-0 bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Tips Investasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Gunakan kalkulator Risk/Reward untuk menentukan position sizing yang tepat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Average down hanya jika fundamental perusahaan masih baik</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Perhatikan efek dilusi saat rights issue untuk keputusan eksekusi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Gunakan Graham Number dan PBV Band sebagai salah satu referensi valuasi</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
