import { RightsIssueCalculator } from "@/components/calculators";

export const metadata = {
    title: "Kalkulator Rights Issue - AM Invest",
    description: "Hitung hak rights, dana wajib setor, dan efek dilusi dari rights issue saham",
};

export default function RightsIssuePage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    Kalkulator Rights Issue
                </h1>
                <p className="text-muted-foreground mt-2">
                    Kalkulasi hak rights, dana wajib setor, dan efek dilusi dari rights issue
                </p>
            </div>

            {/* Calculator Component */}
            <RightsIssueCalculator />
        </div>
    );
}
