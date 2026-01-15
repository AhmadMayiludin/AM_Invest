import { RiskRewardCalculator } from "@/components/calculators";

export const metadata = {
    title: "Kalkulator Risk/Reward - AM Invest",
    description: "Hitung position sizing dan manajemen risiko per trade saham",
};

export default function RiskRewardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    Kalkulator Risk/Reward
                </h1>
                <p className="text-muted-foreground mt-2">
                    Position sizing dan manajemen risiko per trade
                </p>
            </div>

            {/* Calculator Component */}
            <RiskRewardCalculator />
        </div>
    );
}
