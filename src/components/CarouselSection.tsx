import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselSectionProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    className?: string;
    gridClassName?: string;
}

export function CarouselSection<T>({ items, renderItem, className, gridClassName }: CarouselSectionProps<T>) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    return (
        <div className={cn("relative", className)}>
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={cn(
                    "flex overflow-x-auto pb-6 -mx-4 snap-x snap-mandatory scrollbar-hide",
                    "sm:grid sm:gap-6 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0",
                    gridClassName || "sm:grid-cols-2 lg:grid-cols-4"
                )}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="w-[calc(100%-2rem)] mx-4 flex-shrink-0 snap-center sm:w-auto sm:mx-0 sm:flex-shrink-1"
                    >
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4 sm:hidden">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-2 w-2 rounded-full transition-all duration-300",
                            index === activeIndex ? "bg-primary w-6" : "bg-white/20"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
