import { AverageDownCalculator } from "@/components/calculators";

export const metadata = {
    title: "Kalkulator Average Down/Up - InvestGenius",
    description: "Hitung harga rata-rata baru saat melakukan average down atau average up saham",
};

export default function AverageDownPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    Kalkulator Average Down/Up
                </h1>
                <p className="text-muted-foreground mt-2">
                    Hitung harga rata-rata baru saat menambah lot di posisi harga berbeda
                </p>
            </div>

            {/* Calculator Component */}
            <AverageDownCalculator />
        </div>
    );
}
