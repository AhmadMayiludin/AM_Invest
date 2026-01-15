"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateRightsIssue, formatRupiah, formatNumber, formatPercent, type RightsIssueResult } from "@/lib/calculations";

export function RightsIssueCalculator() {
    const [oldLots, setOldLots] = useState<string>("");
    const [oldAverage, setOldAverage] = useState<string>("");
    const [ratioOld, setRatioOld] = useState<string>("");
    const [ratioNew, setRatioNew] = useState<string>("");
    const [exercisePrice, setExercisePrice] = useState<string>("");
    const [result, setResult] = useState<RightsIssueResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const lots = parseFloat(oldLots) || 0;
        const avg = parseFloat(oldAverage) || 0;
        const rOld = parseFloat(ratioOld) || 0;
        const rNew = parseFloat(ratioNew) || 0;
        const price = parseFloat(exercisePrice) || 0;

        if (lots > 0 && avg > 0 && rOld > 0 && rNew > 0 && price > 0) {
            const calcResult = calculateRightsIssue(lots, avg, rOld, rNew, price);
            setResult(calcResult);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [oldLots, oldAverage, ratioOld, ratioNew, exercisePrice]);

    const handleReset = () => {
        setOldLots("");
        setOldAverage("");
        setRatioOld("");
        setRatioNew("");
        setExercisePrice("");
        setResult(null);
        setShowResult(false);
    };

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Kalkulator Rights Issue
                    </CardTitle>
                    <CardDescription>
                        Hitung hak rights, dana wajib setor, dan estimasi harga rata-rata baru setelah rights issue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Old Lots */}
                        <div className="space-y-2">
                            <Label htmlFor="oldLots" className="text-sm font-medium">
                                Jumlah Lot Sekarang
                            </Label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <Input
                                    id="oldLots"
                                    type="number"
                                    placeholder="Contoh: 100"
                                    value={oldLots}
                                    onChange={(e) => setOldLots(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>

                        {/* Old Average */}
                        <div className="space-y-2">
                            <Label htmlFor="oldAverage" className="text-sm font-medium">
                                Harga Rata-rata Sekarang (Rp)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                                <Input
                                    id="oldAverage"
                                    type="number"
                                    placeholder="Contoh: 1500"
                                    value={oldAverage}
                                    onChange={(e) => setOldAverage(e.target.value)}
                                    className="pl-10 glass-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ratio Input */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Rasio Rights Issue (Lama : Baru)</Label>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Input
                                    type="number"
                                    placeholder="5"
                                    value={ratioOld}
                                    onChange={(e) => setRatioOld(e.target.value)}
                                    className="glass-input text-center"
                                />
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Lama</span>
                            </div>
                            <span className="text-2xl font-light text-muted-foreground">:</span>
                            <div className="flex-1 relative">
                                <Input
                                    type="number"
                                    placeholder="1"
                                    value={ratioNew}
                                    onChange={(e) => setRatioNew(e.target.value)}
                                    className="glass-input text-center"
                                />
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Baru</span>
                            </div>
                        </div>
                    </div>

                    {/* Exercise Price */}
                    <div className="space-y-2 mt-6">
                        <Label htmlFor="exercisePrice" className="text-sm font-medium">
                            Harga Pelaksanaan / Exercise Price (Rp)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                            <Input
                                id="exercisePrice"
                                type="number"
                                placeholder="Contoh: 1000"
                                value={exercisePrice}
                                onChange={(e) => setExercisePrice(e.target.value)}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Hasil Perhitungan Rights Issue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Rights Entitlement */}
                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Hak Rights (HMETD)</p>
                                <p className="text-2xl font-bold text-purple-400">
                                    {formatNumber(result.rightsLots, 0)} Lot
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ({formatNumber(result.rightsShares, 0)} lembar)
                                </p>
                            </div>

                            {/* Final Shares */}
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Total Saham Akhir</p>
                                <p className="text-2xl font-bold">{formatNumber(result.finalLots, 0)} Lot</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ({formatNumber(result.finalShares, 0)} lembar)
                                </p>
                            </div>

                            {/* Dana Wajib Setor */}
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Dana Wajib Disetor</p>
                                <p className="text-2xl font-bold text-amber-400">{formatRupiah(result.danaWajib)}</p>
                            </div>

                            {/* New Average */}
                            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-sm text-muted-foreground mb-1">Harga Rata-rata Baru</p>
                                <p className="text-2xl font-bold text-primary">{formatRupiah(result.newAverage)}</p>
                                <p className="text-xs text-muted-foreground mt-1">per lembar saham</p>
                            </div>

                            {/* TERP */}
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                <p className="text-sm text-muted-foreground mb-1">TERP (Theoretical Ex-Rights Price)</p>
                                <p className="text-2xl font-bold text-cyan-400">{formatRupiah(result.theoreticalExRightsPrice)}</p>
                            </div>

                            {/* Dilution */}
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-muted-foreground mb-1">Efek Dilusi</p>
                                <p className="text-2xl font-bold text-red-400">{formatPercent(result.dilutionPercent)}</p>
                                <p className="text-xs text-muted-foreground mt-1">penambahan saham</p>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30">
                            <h4 className="font-medium mb-2">Ringkasan:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Modal Awal: {formatRupiah(result.oldModal)}</li>
                                <li>• Modal Tambahan (Rights): {formatRupiah(result.danaWajib)}</li>
                                <li>• Total Modal Akhir: {formatRupiah(result.totalModal)}</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="glass border-0 bg-muted/30">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Tentang Rights Issue:</p>
                            <p>Rights Issue adalah penawaran saham baru kepada pemegang saham lama dengan harga tertentu (exercise price) sesuai rasio kepemilikan.</p>
                            <p className="mt-2 text-xs">
                                * TERP = Harga teoritis saham setelah cum-date rights issue
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
