import { useState, useEffect } from "react";
import { ArrowRightLeft, TrendingUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock exchange rates (Base: INR)
const EXCHANGE_RATES: Record<string, number> = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AUD: 0.018,
    CAD: 0.016,
    JPY: 1.78,
    AED: 0.044,
};

const CURRENCIES = [
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
];

export const CurrencyConverter = () => {
    const [amount, setAmount] = useState<string>("100"); // String to handle empty input
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState<string>("0");
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const calculateConversion = () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            setConvertedAmount("0");
            return;
        }

        // Convert FROM -> Base (INR) -> TO
        const inrAmount = numericAmount / EXCHANGE_RATES[fromCurrency];
        const finalAmount = inrAmount * EXCHANGE_RATES[toCurrency];

        setConvertedAmount(finalAmount.toLocaleString("en-US", { maximumFractionDigits: 2 }));
    };

    useEffect(() => {
        calculateConversion();
    }, [amount, fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="relative overflow-hidden w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Currency Converter
                        </h3>
                        <p className="text-xs text-white/40 mt-1">Live exchange rates</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                        onClick={() => setLastUpdated(new Date())}
                    >
                        <RefreshCw className="w-3.5 h-3.5 text-white/60" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* From Section */}
                    <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05] focus-within:border-primary/30 transition-colors">
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">Amount</label>
                        <div className="flex gap-4 items-center">
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 min-w-0 text-2xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-white/20 text-white"
                                placeholder="0"
                            />
                            <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger className="w-[110px] bg-white/5 border-white/10 rounded-xl h-10 text-white font-medium focus:ring-primary/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.code} value={c.code} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                            <span className="mr-2">{c.flag}</span> {c.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-2 relative z-10">
                        <Button
                            onClick={handleSwap}
                            size="icon"
                            className="h-10 w-10 rounded-full bg-[#0a0a0a] border border-white/10 shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all hover:rotate-180 duration-500"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* To Section */}
                    <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05]">
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">Converted Amount</label>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1 text-2xl font-bold text-primary break-all">
                                {convertedAmount}
                            </div>
                            <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger className="w-[110px] bg-white/5 border-white/10 rounded-xl h-10 text-white font-medium focus:ring-primary/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.code} value={c.code} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                            <span className="mr-2">{c.flag}</span> {c.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-[10px] text-white/30">
                    <span>1 {fromCurrency} ≈ {(EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]).toFixed(4)} {toCurrency}</span>
                    <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};
