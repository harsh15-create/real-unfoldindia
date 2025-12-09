import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DanceDetail, getDanceForm } from '@/lib/dance-api';
import { DanceHero } from '@/components/culture/DanceHero';
import { DanceDetailSections } from '@/components/culture/DanceDetailSections';
import { CultureEvents } from '@/analytics/events';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function DanceFormDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
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
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group mt-6"
                    onClick={() => navigate('/chat', { state: { message: `Tell me more about ${data.title} dance form.` } })}
                >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Learn more about {data.title}
                </Button>
            </DanceHero>

            <div className="container mx-auto px-4 py-12">
                <DanceDetailSections data={data} />
            </div>
        </div>
    );
}
