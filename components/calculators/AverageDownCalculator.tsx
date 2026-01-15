"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverageDown, formatRupiah, formatNumber, formatPercent, type AverageDownResult } from "@/lib/calculations";

export function AverageDownCalculator() {
    const [mode, setMode] = useState<"down" | "up">("down");
    const [currentAverage, setCurrentAverage] = useState<string>("");
    const [currentLots, setCurrentLots] = useState<string>("");
    const [newPrice, setNewPrice] = useState<string>("");
    const [newLots, setNewLots] = useState<string>("");
    const [targetPrice, setTargetPrice] = useState<string>("");
    const [result, setResult] = useState<AverageDownResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Auto-calculate on input change
    useEffect(() => {
        const avg = parseFloat(currentAverage) || 0;
        const lots = parseFloat(currentLots) || 0;
        const price = parseFloat(newPrice) || 0;
        const nLots = parseFloat(newLots) || 0;
        const target = parseFloat(targetPrice) || undefined;

        if (avg > 0 && lots > 0 && price > 0 && nLots > 0) {
            const calcResult = calculateAverageDown(avg, lots, price, nLots, target);
            setResult(calcResult);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [currentAverage, currentLots, newPrice, newLots, targetPrice]);

    const handleReset = () => {
        setCurrentAverage("");
        setCurrentLots("");
        setNewPrice("");
        setNewLots("");
        setTargetPrice("");
        setResult(null);
        setShowResult(false);
    };

    return (
        <div className="space-y-6">
            {/* Mode Toggle */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as "down" | "up")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass">
                    <TabsTrigger value="down" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        Average Down
                    </TabsTrigger>
                    <TabsTrigger value="up" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        Average Up
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Input Card */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${mode === "down" ? "bg-red-500" : "bg-green-500"}`} />
                        {mode === "down" ? "Beli di Harga Lebih Rendah" : "Beli di Harga Lebih Tinggi"}
                    </CardTitle>
                    <CardDescription>
                        {mode === "down"
                            ? "Menurunkan harga rata-rata dengan membeli lot tambahan di harga lebih murah"
                            : "Menambah posisi dengan membeli lot tambahan di harga lebih tinggi"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Average */}
                        <div className="space-y-2">
                            <Label htmlFor="currentAverage" className="text-sm font-medium">
                                Harga Rata-rata Sekarang (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="currentAverage"
                                    type="number"
                                    placeholder="Contoh: 1000"
                                    value={currentAverage}
                                    onChange={(e) => setCurrentAverage(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Current Lots */}
                        <div className="space-y-2">
                            <Label htmlFor="currentLots" className="text-sm font-medium">
                                Jumlah Lot Sekarang
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <Input
                                    id="currentLots"
                                    type="number"
                                    placeholder="Contoh: 10"
                                    value={currentLots}
                                    onChange={(e) => setCurrentLots(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* New Price */}
                        <div className="space-y-2">
                            <Label htmlFor="newPrice" className="text-sm font-medium">
                                Harga Beli Baru (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="newPrice"
                                    type="number"
                                    placeholder={mode === "down" ? "Contoh: 800" : "Contoh: 1200"}
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* New Lots */}
                        <div className="space-y-2">
                            <Label htmlFor="newLots" className="text-sm font-medium">
                                Jumlah Lot Baru
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <Input
                                    id="newLots"
                                    type="number"
                                    placeholder="Contoh: 5"
                                    value={newLots}
                                    onChange={(e) => setNewLots(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Optional Target Price */}
                    <div className="space-y-2">
                        <Label htmlFor="targetPrice" className="text-sm font-medium text-muted-foreground">
                            Target Harga Jual (Opsional)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                            <Input
                                id="targetPrice"
                                type="number"
                                placeholder="Contoh: 1500"
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                className="pl-10 glass-input"
                            />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <Button variant="outline" onClick={handleReset} className="w-full md:w-auto">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Hasil Perhitungan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* New Average */}
                            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-sm text-muted-foreground mb-1">Harga Rata-rata Baru</p>
                                <p className="text-2xl font-bold text-primary">
                                    {formatRupiah(result.newAverage)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    per lembar saham
                                </p>
                            </div>

                            {/* Total Lots */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Total Lot</p>
                                <p className="text-2xl font-bold">{formatNumber(result.totalLots, 0)}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ({formatNumber(result.totalShares, 0)} lembar)
                                </p>
                            </div>

                            {/* Total Modal */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Total Modal</p>
                                <p className="text-2xl font-bold">{formatRupiah(result.totalModal)}</p>
                            </div>

                            {/* Current Modal */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                                <p className="text-sm text-muted-foreground mb-1">Modal Sebelumnya</p>
                                <p className="text-lg font-semibold">{formatRupiah(result.currentModal)}</p>
                            </div>

                            {/* New Modal */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                                <p className="text-sm text-muted-foreground mb-1">Modal Tambahan</p>
                                <p className="text-lg font-semibold">{formatRupiah(result.newModal)}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +{formatPercent(result.modalChangePercent)}
                                </p>
                            </div>

                            {/* Potential Profit/Loss */}
                            {targetPrice && (
                                <div className={`p-4 rounded-xl border ${result.potentialProfitLoss >= 0
                                        ? "bg-green-500/10 border-green-500/30"
                                        : "bg-red-500/10 border-red-500/30"
                                    }`}>
                                    <p className="text-sm text-muted-foreground mb-1">Potensi Profit/Loss</p>
                                    <p className={`text-2xl font-bold ${result.potentialProfitLoss >= 0 ? "text-green-400" : "text-red-400"
                                        }`}>
                                        {result.potentialProfitLoss >= 0 ? "+" : ""}{formatRupiah(result.potentialProfitLoss)}
                                    </p>
                                    <p className={`text-xs mt-1 ${result.potentialProfitLoss >= 0 ? "text-green-400/70" : "text-red-400/70"
                                        }`}>
                                        {result.potentialProfitLoss >= 0 ? "+" : ""}{formatPercent(result.potentialProfitLossPercent)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="glass border-0 bg-muted/30">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Rumus Average Down/Up:</p>
                            <p className="font-mono text-xs bg-muted/50 p-2 rounded mt-2">
                                Rata-rata Baru = (Modal Lama + Modal Baru) ÷ Total Lembar Saham
                            </p>
                            <p className="mt-2 text-xs">
                                * 1 Lot = 100 lembar saham
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
