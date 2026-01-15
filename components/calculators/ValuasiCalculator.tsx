"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    calculateGrahamNumber,
    calculatePBVBand,
    formatRupiah,
    formatNumber,
    formatPercent,
    type GrahamNumberResult,
    type PBVBandResult
} from "@/lib/calculations";

export function ValuasiCalculator() {
    // Graham Number state
    const [eps, setEps] = useState<string>("");
    const [bvps, setBvps] = useState<string>("");
    const [grahamResult, setGrahamResult] = useState<GrahamNumberResult | null>(null);

    // PBV Band state
    const [pbvBvps, setPbvBvps] = useState<string>("");
    const [currentPrice, setCurrentPrice] = useState<string>("");
    const [pbvLevels, setPbvLevels] = useState<string>("0.5, 1, 1.5, 2, 2.5");
    const [pbvResult, setPbvResult] = useState<PBVBandResult | null>(null);

    // Graham Number calculation
    useEffect(() => {
        const epsValue = parseFloat(eps) || 0;
        const bvpsValue = parseFloat(bvps) || 0;

        if (epsValue !== 0 && bvpsValue !== 0) {
            const result = calculateGrahamNumber(epsValue, bvpsValue);
            setGrahamResult(result);
        } else {
            setGrahamResult(null);
        }
    }, [eps, bvps]);

    // PBV Band calculation
    useEffect(() => {
        const bvpsValue = parseFloat(pbvBvps) || 0;
        const price = parseFloat(currentPrice) || undefined;
        const levels = pbvLevels
            .split(",")
            .map(s => parseFloat(s.trim()))
            .filter(n => !isNaN(n) && n > 0);

        if (bvpsValue > 0 && levels.length > 0) {
            const result = calculatePBVBand(bvpsValue, levels, price);
            setPbvResult(result);
        } else {
            setPbvResult(null);
        }
    }, [pbvBvps, currentPrice, pbvLevels]);

    const handleResetGraham = () => {
        setEps("");
        setBvps("");
        setGrahamResult(null);
    };

    const handleResetPBV = () => {
        setPbvBvps("");
        setCurrentPrice("");
        setPbvLevels("0.5, 1, 1.5, 2, 2.5");
        setPbvResult(null);
    };

    return (
        <div className="space-y-6">
            <Tabs defaultValue="graham" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass">
                    <TabsTrigger value="graham" className="data-[state=active]:bg-primary/20">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Graham Number
                    </TabsTrigger>
                    <TabsTrigger value="pbv" className="data-[state=active]:bg-primary/20">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        PBV Band
                    </TabsTrigger>
                </TabsList>

                {/* Graham Number Tab */}
                <TabsContent value="graham" className="space-y-6 mt-6">
                    <Card className="glass-card border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Graham Number
                            </CardTitle>
                            <CardDescription>
                                Metode valuasi sederhana dari Benjamin Graham, guru Warren Buffett
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* EPS */}
                                <div className="space-y-2">
                                    <Label htmlFor="eps" className="text-sm font-medium">
                                        EPS (Earnings Per Share)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                        <Input
                                            id="eps"
                                            type="number"
                                            placeholder="Contoh: 100"
                                            value={eps}
                                            onChange={(e) => setEps(e.target.value)}
                                            className="pl-10 glass-input"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Laba bersih per lembar saham</p>
                                </div>

                                {/* BVPS */}
                                <div className="space-y-2">
                                    <Label htmlFor="bvps" className="text-sm font-medium">
                                        BVPS (Book Value Per Share)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                        <Input
                                            id="bvps"
                                            type="number"
                                            placeholder="Contoh: 500"
                                            value={bvps}
                                            onChange={(e) => setBvps(e.target.value)}
                                            className="pl-10 glass-input"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Nilai buku per lembar saham</p>
                                </div>
                            </div>

                            <Button variant="outline" onClick={handleResetGraham} className="w-full md:w-auto">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Graham Result */}
                    {grahamResult && (
                        <Card className="glass-card border-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                            <CardHeader>
                                <CardTitle>Hasil Graham Number</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {grahamResult.isValid ? (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-muted-foreground mb-2">Harga Wajar (Fair Value)</p>
                                        <p className="text-4xl font-bold text-primary mb-2">
                                            {formatRupiah(grahamResult.grahamNumber)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Berdasarkan rumus Graham: √(22.5 × EPS × BVPS)
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-red-400">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p>Graham Number hanya valid jika EPS dan BVPS keduanya positif</p>
                                        {!grahamResult.epsValid && <p className="text-sm mt-1">• EPS harus positif</p>}
                                        {!grahamResult.bvpsValid && <p className="text-sm mt-1">• BVPS harus positif</p>}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Graham Info */}
                    <Card className="glass border-0 bg-muted/30">
                        <CardContent className="pt-6">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-sm text-muted-foreground">
                                    <p className="font-medium text-foreground mb-1">Rumus Graham Number:</p>
                                    <p className="font-mono text-xs bg-muted/50 p-2 rounded mt-2">
                                        Graham Number = √(22.5 × EPS × BVPS)
                                    </p>
                                    <p className="mt-2">
                                        Harga di bawah Graham Number dianggap undervalued, di atasnya overvalued.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PBV Band Tab */}
                <TabsContent value="pbv" className="space-y-6 mt-6">
                    <Card className="glass-card border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                PBV Band
                            </CardTitle>
                            <CardDescription>
                                Estimasi harga wajar berdasarkan berbagai level PBV (Price to Book Value)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* BVPS */}
                                <div className="space-y-2">
                                    <Label htmlFor="pbvBvps" className="text-sm font-medium">
                                        BVPS (Book Value Per Share)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                        <Input
                                            id="pbvBvps"
                                            type="number"
                                            placeholder="Contoh: 1000"
                                            value={pbvBvps}
                                            onChange={(e) => setPbvBvps(e.target.value)}
                                            className="pl-10 glass-input"
                                        />
                                    </div>
                                </div>

                                {/* Current Price (Optional) */}
                                <div className="space-y-2">
                                    <Label htmlFor="currentPrice" className="text-sm font-medium text-muted-foreground">
                                        Harga Saat Ini (Opsional)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                        <Input
                                            id="currentPrice"
                                            type="number"
                                            placeholder="Contoh: 1500"
                                            value={currentPrice}
                                            onChange={(e) => setCurrentPrice(e.target.value)}
                                            className="pl-10 glass-input"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Untuk melihat discount/premium</p>
                                </div>
                            </div>

                            {/* PBV Levels */}
                            <div className="space-y-2">
                                <Label htmlFor="pbvLevels" className="text-sm font-medium">
                                    Level PBV (pisahkan dengan koma)
                                </Label>
                                <Input
                                    id="pbvLevels"
                                    type="text"
                                    placeholder="0.5, 1, 1.5, 2, 2.5"
                                    value={pbvLevels}
                                    onChange={(e) => setPbvLevels(e.target.value)}
                                    className="glass-input"
                                />
                            </div>

                            <Button variant="outline" onClick={handleResetPBV} className="w-full md:w-auto">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset
                            </Button>
                        </CardContent>
                    </Card>

                    {/* PBV Result */}
                    {pbvResult && (
                        <Card className="glass-card border-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
                            <CardHeader>
                                <CardTitle>Hasil PBV Band</CardTitle>
                                <CardDescription>BVPS: {formatRupiah(pbvResult.bvps)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pbvResult.bands.map((band, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-xl border transition-all duration-300 ${band.discount !== undefined && band.discount > 0
                                                    ? "bg-green-500/10 border-green-500/20"
                                                    : band.discount !== undefined && band.discount < 0
                                                        ? "bg-red-500/10 border-red-500/20"
                                                        : "bg-muted/50 border-border/50"
                                                }`}
                                        >
                                            <p className="text-sm text-muted-foreground mb-1">PBV {formatNumber(band.pbvLevel, 1)}x</p>
                                            <p className="text-xl font-bold">{formatRupiah(band.fairValue)}</p>
                                            {band.discount !== undefined && (
                                                <p className={`text-xs mt-1 ${band.discount > 0 ? "text-green-400" : "text-red-400"}`}>
                                                    {band.discount > 0 ? `${formatPercent(band.discount)} discount` : `${formatPercent(Math.abs(band.discount))} premium`}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* PBV Info */}
                    <Card className="glass border-0 bg-muted/30">
                        <CardContent className="pt-6">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-sm text-muted-foreground">
                                    <p className="font-medium text-foreground mb-1">Tentang PBV:</p>
                                    <p className="font-mono text-xs bg-muted/50 p-2 rounded mt-2">
                                        Harga Wajar = BVPS × PBV Level
                                    </p>
                                    <ul className="mt-2 list-disc list-inside space-y-1">
                                        <li>PBV &lt; 1: Harga di bawah nilai buku</li>
                                        <li>PBV = 1: Harga sama dengan nilai buku</li>
                                        <li>PBV &gt; 1: Harga di atas nilai buku (ada premium)</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
