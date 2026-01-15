"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateDividend, formatRupiah, formatNumber, formatPercent, type DividendResult } from "@/lib/calculations";

export function DividenCalculator() {
    const [lots, setLots] = useState<string>("");
    const [dps, setDps] = useState<string>("");
    const [currentPrice, setCurrentPrice] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("1");
    const [result, setResult] = useState<DividendResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const lotCount = parseFloat(lots) || 0;
        const dpsValue = parseFloat(dps) || 0;
        const price = parseFloat(currentPrice) || 0;
        const freq = parseFloat(frequency) || 1;

        if (lotCount > 0 && dpsValue > 0 && price > 0) {
            const calcResult = calculateDividend(lotCount, dpsValue, price, freq);
            setResult(calcResult);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [lots, dps, currentPrice, frequency]);

    const handleReset = () => {
        setLots("");
        setDps("");
        setCurrentPrice("");
        setFrequency("1");
        setResult(null);
        setShowResult(false);
    };

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Kalkulator Dividen
                    </CardTitle>
                    <CardDescription>
                        Hitung total dividen bersih setelah dipotong pajak 10%
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Lots */}
                        <div className="space-y-2">
                            <Label htmlFor="lots" className="text-sm font-medium">
                                Jumlah Lot
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <Input
                                    id="lots"
                                    type="number"
                                    placeholder="Contoh: 100"
                                    value={lots}
                                    onChange={(e) => setLots(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* DPS */}
                        <div className="space-y-2">
                            <Label htmlFor="dps" className="text-sm font-medium">
                                DPS - Dividen per Saham (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="dps"
                                    type="number"
                                    placeholder="Contoh: 50"
                                    value={dps}
                                    onChange={(e) => setDps(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Current Price */}
                        <div className="space-y-2">
                            <Label htmlFor="currentPrice" className="text-sm font-medium">
                                Harga Saham Saat Ini (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="currentPrice"
                                    type="number"
                                    placeholder="Contoh: 1000"
                                    value={currentPrice}
                                    onChange={(e) => setCurrentPrice(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Frequency */}
                        <div className="space-y-2">
                            <Label htmlFor="frequency" className="text-sm font-medium">
                                Frekuensi Dividen per Tahun
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <Input
                                    id="frequency"
                                    type="number"
                                    placeholder="1"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">1 = tahunan, 2 = semester, 4 = kuartalan</p>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Hasil Perhitungan Dividen
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Total Shares */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Total Lembar Saham</p>
                                <p className="text-2xl font-bold">{formatNumber(result.totalShares, 0)}</p>
                            </div>

                            {/* Gross Dividend */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Dividen Kotor</p>
                                <p className="text-2xl font-bold">{formatRupiah(result.grossDividend)}</p>
                            </div>

                            {/* Tax */}
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Pajak 10%</p>
                                <p className="text-2xl font-bold text-red-400">-{formatRupiah(result.taxAmount)}</p>
                            </div>

                            {/* Net Dividend */}
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 md:col-span-2 lg:col-span-1">
                                <p className="text-sm text-muted-foreground mb-1">Dividen Bersih</p>
                                <p className="text-3xl font-bold text-green-400">{formatRupiah(result.netDividend)}</p>
                                <p className="text-xs text-muted-foreground mt-1">setelah dipotong pajak</p>
                            </div>

                            {/* Dividend Yield */}
                            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-sm text-muted-foreground mb-1">Dividend Yield</p>
                                <p className="text-2xl font-bold text-primary">{formatPercent(result.dividendYield)}</p>
                                <p className="text-xs text-muted-foreground mt-1">per pembayaran</p>
                            </div>

                            {/* Annualized Yield */}
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Yield Tahunan</p>
                                <p className="text-2xl font-bold text-cyan-400">{formatPercent(result.annualizedYield)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="glass border-0 bg-muted/30">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Tentang Pajak Dividen:</p>
                            <p>Dividen saham dikenakan PPh Final sebesar 10% bagi Wajib Pajak dalam negeri yang memiliki saham &lt;25%.</p>
                            <p className="mt-2 font-mono text-xs bg-muted/50 p-2 rounded">
                                Dividen Bersih = (Lot × 100 × DPS) - 10%
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
