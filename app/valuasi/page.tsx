import { ValuasiCalculator } from "@/components/calculators";

export const metadata = {
    title: "Kalkulator Valuasi - InvestGenius",
    description: "Hitung harga wajar saham dengan Graham Number dan PBV Band",
};

export default function ValuasiPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    Kalkulator Valuasi
                </h1>
                <p className="text-muted-foreground mt-2">
                    Graham Number dan PBV Band untuk menilai harga wajar saham
                </p>
            </div>

            {/* Calculator Component */}
            <ValuasiCalculator />
        </div>
    );
}
