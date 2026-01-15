import { DividenCalculator } from "@/components/calculators";

export const metadata = {
    title: "Kalkulator Dividen - InvestGenius",
    description: "Hitung total dividen bersih setelah pajak 10% dan dividend yield",
};

export default function DividenPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    Kalkulator Dividen
                </h1>
                <p className="text-muted-foreground mt-2">
                    Hitung total dividen bersih setelah dipotong pajak 10%
                </p>
            </div>

            {/* Calculator Component */}
            <DividenCalculator />
        </div>
    );
}
