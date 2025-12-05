import { useState, useEffect } from "react";
import { ArrowRightLeft, TrendingUp, RefreshCw, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CURRENCIES = [
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
    { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
    { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
    { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳" },
    { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
    { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
    { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
    { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
    { code: "NPR", name: "Nepalese Rupee", flag: "🇳🇵" },
];

export const CurrencyConverter = () => {
    const [amount, setAmount] = useState<string>("100");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Fees constants
    const SERVICE_FEE_PERCENT = 0.01; // 1%
    const GST_ON_FEE_PERCENT = 0.18; // 18% on service fee

    const fetchRate = async () => {
        setIsLoading(true);
        try {
            // Using exchangerate-api which supports more currencies (including PKR, NPR)
            const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await res.json();
            if (data.rates && data.rates[toCurrency]) {
                setExchangeRate(data.rates[toCurrency]);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error("Failed to fetch rates:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (fromCurrency === toCurrency) {
            setExchangeRate(1);
            return;
        }
        fetchRate();
    }, [fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Calculations
    const numericAmount = parseFloat(amount) || 0;
    const serviceFee = numericAmount * SERVICE_FEE_PERCENT;
    const gstOnFee = serviceFee * GST_ON_FEE_PERCENT;
    const totalDeductions = serviceFee + gstOnFee;
    const netAmount = Math.max(0, numericAmount - totalDeductions);
    const finalConvertedAmount = exchangeRate ? (netAmount * exchangeRate).toFixed(2) : "0.00";

    return (
        <div className="relative overflow-hidden w-full max-w-md mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Currency Converter
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            <p className="text-[10px] text-white/40">Live Market Rates</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                        onClick={fetchRate}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-white/60 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <div className="space-y-3">
                    {/* Quick Amounts */}
                    <div className="flex gap-2 mb-1 overflow-x-auto pb-1 scrollbar-hide">
                        {[100, 500, 1000, 5000].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val.toString())}
                                className="px-2.5 py-0.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] text-white/70 transition-colors whitespace-nowrap"
                            >
                                + {val}
                            </button>
                        ))}
                    </div>

                    {/* Input Group Container */}
                    <div className="relative flex flex-col gap-1.5">
                        {/* From Section */}
                        <div className="bg-white/[0.03] p-3 rounded-2xl border border-white/[0.05] focus-within:border-primary/30 transition-colors">
                            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1 block">You Send</label>
                            <div className="flex gap-3 items-center">
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 min-w-0 h-10 text-xl font-bold bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-white/20 text-white"
                                    placeholder="0"
                                />
                                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                    <SelectTrigger className="w-[90px] h-10 bg-white/5 border-white/10 rounded-lg text-sm text-white font-medium focus:ring-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        {CURRENCIES.map((c) => (
                                            <SelectItem key={c.code} value={c.code} className="focus:bg-white/10 focus:text-white cursor-pointer text-xs">
                                                <span className="mr-2">{c.flag}</span> {c.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Swap Button (Absolute Center) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <Button
                                onClick={handleSwap}
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-full bg-[#1c1c2e] border-white/10 text-white shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all p-1.5"
                            >
                                <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
                            </Button>
                        </div>

                        {/* To Section */}
                        <div className="bg-white/[0.03] p-3 rounded-2xl border border-white/[0.05]">
                            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1 block">Recipient Gets (Estimated)</label>
                            <div className="flex gap-3 items-center">
                                <div className="flex-1 h-10 flex items-center text-xl font-bold text-primary break-all">
                                    {isLoading ? "..." : finalConvertedAmount}
                                </div>
                                <Select value={toCurrency} onValueChange={setToCurrency}>
                                    <SelectTrigger className="w-[90px] h-10 bg-white/5 border-white/10 rounded-lg text-sm text-white font-medium focus:ring-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        {CURRENCIES.map((c) => (
                                            <SelectItem key={c.code} value={c.code} className="focus:bg-white/10 focus:text-white cursor-pointer text-xs">
                                                <span className="mr-2">{c.flag}</span> {c.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Section */}
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                        <div className="flex justify-between items-center text-xs text-white/60">
                            <span>Exchange Rate</span>
                            <span className="font-medium text-white">{isLoading ? "..." : `1 ${fromCurrency} ≈ ${exchangeRate?.toFixed(4)} ${toCurrency}`}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/60">
                            <div className="flex items-center gap-1">
                                <span>Service Fee (1%)</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Info className="h-3 w-3 text-white/30" /></TooltipTrigger>
                                        <TooltipContent><p>Standard processing fee</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-red-400">- {serviceFee.toFixed(2)} {fromCurrency}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/60">
                            <div className="flex items-center gap-1">
                                <span>GST on Fee (18%)</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Info className="h-3 w-3 text-white/30" /></TooltipTrigger>
                                        <TooltipContent><p>Government Tax on services</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-red-400">- {gstOnFee.toFixed(2)} {fromCurrency}</span>
                        </div>
                        <div className="h-px bg-white/10 my-1" />
                        <div className="flex justify-between items-center text-xs font-medium text-white/80">
                            <span>Total Amount Converted</span>
                            <span className="text-primary">{netAmount.toFixed(2)} {fromCurrency}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-[10px] text-white/30">
                        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
