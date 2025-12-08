
import React from 'react';
import { Calendar, Info, Shield, Wallet, Shirt, HelpCircle } from 'lucide-react';
import { FestivalDetail } from '@/lib/culture-api';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface DetailSectionsProps {
    festival: FestivalDetail;
}

export function KeyRituals({ rituals }: { rituals: string[] }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
                <span className="text-purple-500 text-3xl">✦</span> Key Rituals
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                {rituals.map((ritual, idx) => (
                    <div key={idx} className="flex gap-3 items-start bg-black/20 p-4 rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors">
                        <div className="bg-purple-500/10 p-2 rounded-full mt-0.5">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        </div>
                        <span className="text-gray-200 font-light">{ritual}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PracticalInfoBlock({ info }: { info: FestivalDetail['practical_info'] }) {
    return (
        <div className="bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
                <Info className="text-purple-400" /> Traveler Toolkit
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-sm uppercase tracking-wider">
                        <Shirt className="h-4 w-4" /> Dress Code
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{info.dress_tips}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-300 font-bold text-sm uppercase tracking-wider">
                        <Shield className="h-4 w-4" /> Safety Tips
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{info.safety_tips}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-300 font-bold text-sm uppercase tracking-wider">
                        <Wallet className="h-4 w-4" /> Budget (Daily)
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{info.avg_daily_costs}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-300 font-bold text-sm uppercase tracking-wider">
                        <HelpCircle className="h-4 w-4" /> Accessibility
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{info.accessibility_notes}</p>
                </div>
            </div>
        </div>
    );
}

export function DatesCard({ calendar }: { calendar: FestivalDetail['calendar'] }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-24">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-4 tracking-wider">Festival Calendar</h3>

            <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-8 w-8 text-purple-400" />
                <div>
                    <div className="text-white font-bold text-lg">{calendar.typical_month}</div>
                    <div className="text-xs text-gray-400">{calendar.lunar_reference}</div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Duration</span>
                    <span className="text-white font-medium">{calendar.festival_length}</span>
                </div>

                <div className="space-y-2">
                    <span className="text-xs text-purple-400 font-bold uppercase">Upcoming Dates</span>
                    {Object.entries(calendar.next_dates).map(([year, date]) => (
                        <div key={year} className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">{year}</span>
                            <span className="text-white">{date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function FAQSection({ faqs }: { faqs: FestivalDetail['faqs'] }) {
    return (
        <div className="mb-12">
            <h3 className="text-2xl font-serif text-white mb-6">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-xl px-4 data-[state=open]:bg-white/5 data-[state=open]:border-purple-500/30 transition-all">
                        <AccordionTrigger className="text-white hover:text-purple-300 hover:no-underline py-4 text-left">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 pb-4 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
