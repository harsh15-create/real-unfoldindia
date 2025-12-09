
import React, { useState, useEffect, useRef } from 'react';
import { Highlight } from '@/lib/types';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, Share2, Expand } from 'lucide-react';
import { region_highlights_open, region_highlight_click, region_highlight_share } from '@/analytics/events';
import { motion, AnimatePresence } from 'framer-motion';

interface RegionHighlightsProps {
    highlights: Highlight[];
    regionSlug: string;
}

const RegionHighlights: React.FC<RegionHighlightsProps> = ({ highlights, regionSlug }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const observerRef = useRef<HTMLDivElement>(null);
    const hasTrackedOpen = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTrackedOpen.current) {
                    region_highlights_open({ region_slug: regionSlug });
                    hasTrackedOpen.current = true;
                }
            },
            { threshold: 0.2 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [regionSlug]);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        region_highlight_click({ region_slug: regionSlug, highlight_id: highlights[index].id });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % highlights.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
    };

    const handleShare = () => {
        const currentHighlight = highlights[currentIndex];
        region_highlight_share({ region_slug: regionSlug, highlight_id: currentHighlight.id, channel: 'web_share' });
        // Mock share
        if (navigator.share) {
            navigator.share({
                title: currentHighlight.caption || 'Region Highlight',
                text: currentHighlight.image_alt,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Share logic mock: Copied to clipboard!");
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, highlights]); // Added highlights dependency for safety

    const displayedHighlights = highlights.slice(0, 6);
    const remainingCount = highlights.length - 6;

    return (
        <section ref={observerRef} className="py-10 bg-[#0B0B15] relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visual Highlights</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">A glimpse into the soul of the region.</p>
                </div>

                {/* 3D Infinity Loop Carousel with Swipe Support */}
                <motion.div
                    className="relative h-[400px] w-full flex items-center justify-center perspective-[1000px] mb-8 touch-pan-y"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }} // Elastic drag
                    dragElastic={0.1} // Reduced elastic resistance slightly
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipeConference = 8000; // Lower threshold to make swipe easier
                        const swipePower = Math.abs(offset.x) * velocity.x;

                        if (swipePower < -swipeConference) {
                            handleNext();
                        } else if (swipePower > swipeConference) {
                            handlePrev();
                        }
                    }}
                >
                    {highlights.map((highlight, index) => {
                        // Calculate relative position for infinity loop effect
                        // We want 5 visible items usually, but let's handle n items.
                        const len = highlights.length;
                        // Distance from current index
                        let position = (index - currentIndex);

                        // Handle wrap-around for infinity feel in logic (though Framer Motion layoutId is tricky here, 
                        // we'll stick to a computed position based approach for the 'wheel')
                        // actually, simple modulo difference is better for a fixed array.

                        // For a simplified "Coverflow" feel without complex webgl:
                        // Ensure position is within -len/2 to +len/2 range for shortest path
                        if (position > len / 2) position -= len;
                        if (position < -len / 2) position += len;

                        // Calculate visibility properties
                        const isActive = position === 0;
                        const xOffset = position * 260; // Increased spacing for better visibility
                        const scale = isActive ? 1.2 : 0.8;
                        const zIndex = isActive ? 100 : 50 - Math.abs(position); // Higher z-index for active
                        const rotateY = position * -25; // Stronger rotation for depth

                        // Smooth opacity fade for distant items
                        // Visible: -2, -1, 0, 1, 2
                        // Fade out others to prevent "flyover" visual glitches
                        const isVisible = Math.abs(position) <= 2;
                        const opacity = isVisible ? 1 : 0;
                        const pointerEvents = isActive ? 'auto' : 'none'; // Only active item is interactive? Or maybe side items too for clicking?
                        // Let side items be clickable for navigation

                        return (
                            <motion.div
                                key={highlight.id}
                                className="absolute top-1/2 left-1/2 w-[280px] md:w-[420px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-black/50 backdrop-blur-sm border border-white/10"
                                initial={false}
                                animate={{
                                    x: `calc(-50% + ${xOffset}px)`,
                                    y: "-50%",
                                    scale: scale,
                                    zIndex: zIndex,
                                    rotateY: rotateY,
                                    opacity: opacity,
                                    filter: isActive ? 'brightness(1) contrast(1.1)' : 'brightness(0.5) blur(1px)',
                                }}
                                transition={{ type: "spring", stiffness: 150, damping: 25, mass: 1 }}
                                style={{
                                    pointerEvents: isVisible ? 'auto' : 'none'
                                }}
                                onClick={() => {
                                    if (isActive) handleThumbnailClick(index);
                                    else if (position === 1) handleNext();
                                    else if (position === -1) handlePrev();
                                }}
                            >
                                <img
                                    src={highlight.image}
                                    alt={highlight.image_alt}
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center">
                                        <p className="text-white font-serif italic text-lg leading-snug drop-shadow-md">"{highlight.caption}"</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Navigation Controls for Carousel - Floating & Glassmorphic */}
                <div className="flex justify-center items-center gap-8 mb-12 relative z-20">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrev}
                        className="rounded-full bg-white/5 hover:bg-white/20 text-white w-14 h-14 border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-lg group"
                        aria-label="Previous image"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Button>

                    <div className="text-white/50 text-xs font-medium tracking-widest uppercase">
                        Swipe or Drag
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="rounded-full bg-white/5 hover:bg-white/20 text-white w-14 h-14 border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-lg group"
                        aria-label="Next image"
                    >
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Side Gradient Overlays to fade out edges */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B15] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B15] to-transparent z-10 pointer-events-none" />


                {/* Lightbox Dialog */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-[95vw] md:max-w-[90vw] lg:max-w-6xl h-[90vh] p-0 bg-black/95 border-none text-white overflow-hidden flex flex-col items-center justify-center focus:outline-none" onKeyDown={(e) => e.stopPropagation()}>

                        {/* Close Button manually handled for custom placement if needed, but DialogClose is standard */}
                        <DialogClose className="absolute right-4 top-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                            <X className="w-6 h-6 text-white" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        {/* Navigation Buttons */}
                        <Button variant="ghost" size="icon" className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 text-white hover:bg-white/10 rounded-full h-12 w-12" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                            <ArrowLeft className="w-8 h-8" />
                        </Button>
                        <Button variant="ghost" size="icon" className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 text-white hover:bg-white/10 rounded-full h-12 w-12" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                            <ArrowRight className="w-8 h-8" />
                        </Button>

                        {/* Main Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={highlights[currentIndex].image}
                                    alt={highlights[currentIndex].image_alt}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Caption Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 flex justify-between items-center z-50">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{highlights[currentIndex].caption}</h3>
                                <p className="text-sm text-gray-400">
                                    {highlights[currentIndex].credit && `Photo by ${highlights[currentIndex].credit}`}
                                    {highlights[currentIndex].date_taken && ` • ${highlights[currentIndex].date_taken}`}
                                </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 border-white/20 hover:bg-white/10 text-white">
                                <Share2 className="w-4 h-4" />
                                <span className="hidden md:inline">Share</span>
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>

                {/* View all button removed as requested */}
            </div>
        </section>
    );
};

export default RegionHighlights;
