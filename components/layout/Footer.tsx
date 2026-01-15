"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear}{" "}
                            <span className="font-semibold gradient-text">AM Invest</span>
                            . All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-1">
                            by <span className="font-medium text-foreground/80">Ahmad Mayiludin</span>
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">
                            Tools investasi untuk Gen Z Indonesia 🇮🇩
                        </p>
                    </div>

                    {/* Links & Traktir Kopi Button */}
                    <div className="flex items-center gap-4">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="group relative overflow-hidden border-primary/30 hover:border-primary/60 transition-all duration-300"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <svg
                                        className="w-4 h-4 mr-2 text-amber-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                        />
                                    </svg>
                                    <span className="relative">Traktir Kopi ☕</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md glass-card">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl gradient-text">
                                        Traktir Kopi ☕
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                        Bantu kembangkan AM Invest biar makin mantap! 🚀
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col items-center gap-6 py-4">
                                    {/* QRIS Image */}
                                    <div className="relative p-2 bg-white rounded-2xl shadow-lg">
                                        <img
                                            src="/qris.png"
                                            alt="QRIS AM Pedia Edukasi"
                                            width={240}
                                            height={320}
                                            className="rounded-xl"
                                        />
                                    </div>

                                    {/* Owner Info */}
                                    <div className="text-center space-y-3">
                                        <p className="text-lg font-semibold text-foreground">
                                            Ahmad Mayiludin
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Scan QRIS di atas untuk donasi
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex justify-center gap-4 pt-2">
                                            <a
                                                href="https://www.instagram.com/ahmadmayiludin?igsh=bW1rdW03YWYzd2Fr"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                                <span className="text-sm font-medium">Instagram</span>
                                            </a>
                                            <a
                                                href="http://t.me/amadnih"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:opacity-90 transition-opacity"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                                </svg>
                                                <span className="text-sm font-medium">Telegram</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </footer>
    );
}
