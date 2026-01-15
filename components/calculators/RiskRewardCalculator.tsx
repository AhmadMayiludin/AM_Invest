"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateRiskReward, formatRupiah, formatNumber, formatPercent, type RiskRewardResult } from "@/lib/calculations";

export function RiskRewardCalculator() {
    const [totalCapital, setTotalCapital] = useState<string>("");
    const [riskPercent, setRiskPercent] = useState<string>("2");
    const [buyPrice, setBuyPrice] = useState<string>("");
    const [stopLoss, setStopLoss] = useState<string>("");
    const [targetProfit, setTargetProfit] = useState<string>("");
    const [result, setResult] = useState<RiskRewardResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const capital = parseFloat(totalCapital) || 0;
        const risk = parseFloat(riskPercent) || 0;
        const buy = parseFloat(buyPrice) || 0;
        const sl = parseFloat(stopLoss) || 0;
        const tp = parseFloat(targetProfit) || undefined;

        if (capital > 0 && risk > 0 && buy > 0 && sl > 0 && sl < buy) {
            const calcResult = calculateRiskReward(capital, risk, buy, sl, tp);
            setResult(calcResult);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [totalCapital, riskPercent, buyPrice, stopLoss, targetProfit]);

    const handleReset = () => {
        setTotalCapital("");
        setRiskPercent("2");
        setBuyPrice("");
        setStopLoss("");
        setTargetProfit("");
        setResult(null);
        setShowResult(false);
    };

    // Calculate risk percentage of buy price
    const riskFromBuyPercent = () => {
        const buy = parseFloat(buyPrice) || 0;
        const sl = parseFloat(stopLoss) || 0;
        if (buy > 0 && sl > 0) {
            return ((buy - sl) / buy) * 100;
        }
        return 0;
    };

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Kalkulator Risk/Reward & Position Sizing
                    </CardTitle>
                    <CardDescription>
                        Hitung jumlah lot maksimal berdasarkan manajemen risiko yang tepat
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Total Capital */}
                        <div className="space-y-2">
                            <Label htmlFor="totalCapital" className="text-sm font-medium">
                                Total Modal Investasi (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="totalCapital"
                                    type="number"
                                    placeholder="Contoh: 10000000"
                                    value={totalCapital}
                                    onChange={(e) => setTotalCapital(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Risk Percent */}
                        <div className="space-y-2">
                            <Label htmlFor="riskPercent" className="text-sm font-medium">
                                Risiko Maksimum per Trade (%)
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <Input
                                    id="riskPercent"
                                    type="number"
                                    placeholder="2"
                                    value={riskPercent}
                                    onChange={(e) => setRiskPercent(e.target.value)}
                                    className="pl-10 glass-input"
                                    min="0.5"
                                    max="10"
                                    step="0.5"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Rekomendasi: 1-2% per trade</p>
                        </div>

                        {/* Buy Price */}
                        <div className="space-y-2">
                            <Label htmlFor="buyPrice" className="text-sm font-medium">
                                Harga Beli (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="buyPrice"
                                    type="number"
                                    placeholder="Contoh: 1000"
                                    value={buyPrice}
                                    onChange={(e) => setBuyPrice(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Stop Loss */}
                        <div className="space-y-2">
                            <Label htmlFor="stopLoss" className="text-sm font-medium">
                                Harga Stop Loss (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="stopLoss"
                                    type="number"
                                    placeholder="Contoh: 950"
                                    value={stopLoss}
                                    onChange={(e) => setStopLoss(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                            {riskFromBuyPercent() > 0 && (
                                <p className="text-xs text-red-400">
                                    {formatPercent(riskFromBuyPercent())} di bawah harga beli
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Optional Target Profit */}
                    <div className="space-y-2">
                        <Label htmlFor="targetProfit" className="text-sm font-medium text-muted-foreground">
                            Target Profit / Take Profit (Opsional)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                            <Input
                                id="targetProfit"
                                type="number"
                                placeholder="Contoh: 1100"
                                value={targetProfit}
                                onChange={(e) => setTargetProfit(e.target.value)}
                                className="pl-10 glass-input"
                            />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <Button variant="outline" onClick={handleReset} className="w-full md:w-auto mt-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset
                    </Button>
                </CardContent>
            </Card>

            {/* Result Card */}
            {showResult && result && (
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Hasil Position Sizing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Max Lots */}
                            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-sm text-muted-foreground mb-1">Jumlah Lot Maksimal</p>
                                <p className="text-3xl font-bold text-primary">{formatNumber(result.maxLots, 0)}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ({formatNumber(result.maxShares, 0)} lembar)
                                </p>
                            </div>

                            {/* Total Investment */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Total Investasi</p>
                                <p className="text-2xl font-bold">{formatRupiah(result.totalInvestment)}</p>
                            </div>

                            {/* Max Loss */}
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Kerugian Maksimal</p>
                                <p className="text-2xl font-bold text-red-400">-{formatRupiah(result.maxLossAmount)}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    jika hit stop loss
                                </p>
                            </div>

                            {/* Risk per Share */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                                <p className="text-sm text-muted-foreground mb-1">Risiko per Lembar</p>
                                <p className="text-lg font-semibold">{formatRupiah(result.riskPerShare)}</p>
                            </div>

                            {/* Potential Profit */}
                            {result.potentialProfit !== undefined && (
                                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <p className="text-sm text-muted-foreground mb-1">Potensi Profit</p>
                                    <p className="text-2xl font-bold text-green-400">+{formatRupiah(result.potentialProfit)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        jika hit target
                                    </p>
                                </div>
                            )}

                            {/* Risk/Reward Ratio */}
                            {result.riskRewardRatio !== undefined && (
                                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                    <p className="text-sm text-muted-foreground mb-1">Risk/Reward Ratio</p>
                                    <p className="text-2xl font-bold text-cyan-400">
                                        1 : {formatNumber(result.riskRewardRatio, 1)}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {result.riskRewardRatio >= 2 ? "✅ Good" : result.riskRewardRatio >= 1 ? "⚠️ Fair" : "❌ Poor"}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Visual Risk Bar */}
                        <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30">
                            <p className="text-sm font-medium mb-3">Risk Visualization</p>
                            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(parseFloat(riskPercent) * 10, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <span>0%</span>
                                <span>5%</span>
                                <span>10%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="glass border-0 bg-muted/30">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Aturan Position Sizing:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Risiko 1-2% per trade adalah standar umum trader profesional</li>
                                <li>Risk/Reward ratio minimal 1:2 direkomendasikan</li>
                                <li>Selalu tentukan stop loss sebelum entry</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
