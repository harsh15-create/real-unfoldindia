
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DanceDetail, getDanceForm } from '@/lib/dance-api';
import { DanceHero } from '@/components/culture/DanceHero';
import { DanceDetailSections } from '@/components/culture/DanceDetailSections';
import { CultureEvents } from '@/analytics/events';

export default function DanceFormDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<DanceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) {
            getDanceForm(slug).then(res => {
                setData(res);
                setLoading(false);
                // Track View
                if (res) CultureEvents.DANCE_VIEW(res.slug, res.title);
            });
        }
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
    if (!data) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Dance form not found</div>;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <DanceHero
                title={data.title}
                subtitle={`${data.origin_state} • ${data.performance_style}`}
                desktopImg={data.hero_image}
                altText={data.hero_image_alt}
            />

            <div className="container mx-auto px-4 py-12">
                <DanceDetailSections data={data} />
            </div>
        </div>
    );
}
