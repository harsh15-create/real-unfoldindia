
import React, { useEffect, useState, useMemo } from 'react';
import { getAdventuresMaster, getAdventureActivity, AdventureMaster, AdventureActivity } from '@/lib/adventures-api';
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { ActivityCard } from '@/components/adventures/ActivityCard';
import { ActivityModal } from '@/components/adventures/ActivityModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Compass, X } from 'lucide-react';
import { AdventureEvents } from '@/analytics/events';

export default function AdventuresPage() {
    const [masterData, setMasterData] = useState<AdventureMaster | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [modalSlug, setModalSlug] = useState<string | null>(null);
    const [modalActivity, setModalActivity] = useState<AdventureActivity | null>(null);
    const [loadingModal, setLoadingModal] = useState(false);

    useEffect(() => {
        async function init() {
            try {
                const data = await getAdventuresMaster();
                setMasterData(data);
                AdventureEvents.EXPERIENCE_OPEN('adventures');
            } catch (e) {
                console.error("Failed to load adventures master", e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    // Fetch modal data when slug changes
    useEffect(() => {
        if (modalSlug) {
            setLoadingModal(true);
            getAdventureActivity(modalSlug).then(data => {
                setModalActivity(data);
                setLoadingModal(false);
                if (data) AdventureEvents.ACTIVITY_QUICK_VIEW('adventures', modalSlug);
            });
        } else {
            setModalActivity(null);
        }
    }, [modalSlug]);

    const filteredActivities = useMemo(() => {
        if (!masterData) return [];

        return masterData.activities_list.filter(act => {
            const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                act.short_description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' ||
                act.category?.toLowerCase() === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [masterData, searchQuery, selectedCategory]);

    const categories = ['Air', 'Water', 'Land', 'Snow', 'Overnight'];

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Adventures...</div>;
    }

    if (!masterData) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white">Failed to load content.</div>;
    }

    // Use values from JSON that align with the requested layout
    // JSON: intro_title -> "Unleash Your Wild Side..."
    // JSON: intro_description -> "India is not just..."
    // JSON: sections[0].subtitle -> "Defy Gravity..."

    return (
        <div className="min-h-screen bg-[#0B0B15] text-foreground selection:bg-orange-500/30">
            <RoyalHero
                title={masterData.title} // "Adventures"
                subtitle={masterData.sections?.[0]?.subtitle || masterData.intro_title} // "Defy Gravity..."
                image={masterData.hero_image}
            />

            <div className="container mx-auto px-4 py-12 relative z-30">

                {/* Intro Block - Matches Spiritual Journeys "The Spiritual Tapestry" section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Compass className="w-12 h-12 mx-auto text-orange-500 mb-6" /> {/* Orange icon */}
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">{masterData.intro_title.split(':')[0]}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                        {masterData.intro_description.split('\n')[0]}
                    </p>
                </div>

                {/* Search & Filter - Matches Spiritual Journeys "Sacred Destinations" layout */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Choose Your Thrill
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search adventures..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-orange-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Category Filter - Optional, can keep below search if useful, or remove to strict match */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('all')}
                        size="sm"
                        className={`rounded-full px-6 transition-colors border-white/10 ${selectedCategory === 'all' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'}`}
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            onClick={() => setSelectedCategory(cat)}
                            size="sm"
                            className={`rounded-full px-6 transition-colors border-white/10 ${selectedCategory === cat ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Results Info */}
                <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
                    <span>{filteredActivities.length} adventures found</span>
                    {(searchQuery || selectedCategory !== 'all') && (
                        <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="h-auto p-0 hover:bg-transparent text-orange-500 hover:text-orange-400">
                            Clear Filters <X className="ml-1 h-3 w-3" />
                        </Button>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Adjusted to 3 cols on MD to match SpiritualJourneys density if needed, or keeping 4 for layout efficiency */}
                    {filteredActivities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onQuickView={(slug) => setModalSlug(slug)}
                        />
                    ))}
                </div>

                {filteredActivities.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl text-white/60 mb-4">No adventures found matching your criteria.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-orange-500">Reset Filters</Button>
                    </div>
                )}
            </div>

            <ActivityModal
                isOpen={!!modalSlug}
                onClose={() => setModalSlug(null)}
                activity={modalActivity}
                isLoading={loadingModal}
            />
        </div>
    );
}
