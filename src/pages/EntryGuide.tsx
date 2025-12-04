import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertTriangle, Info, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface SectionData {
    title: string;
    subtitle: string;
    description?: string;
    whatIsRAP?: string;
    [key: string]: any;
}

const EntryGuide = () => {
    const { sectionId } = useParams<{ sectionId: string }>();
    const [data, setData] = useState<SectionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!sectionId) return;

            // Scroll to top
            window.scrollTo(0, 0);

            setLoading(true);
            try {
                const response = await fetch('/visa.json');
                if (!response.ok) throw new Error("Failed to fetch data");

                const jsonData = await response.json();
                const sectionData = jsonData.visaInfo[sectionId];

                if (!sectionData) {
                    throw new Error("Section not found");
                }

                setData(sectionData);
            } catch (err) {
                console.error(err);
                setError("Failed to load guide data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sectionId]);

    const formatKey = (key: string) => {
        // Convert camelCase to Title Case with spaces
        const result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    };

    const renderTextWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium break-all"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const renderContent = (key: string, value: any) => {
        if (key === 'title' || key === 'subtitle' || key === 'description' || key === 'whatIsRAP') return null;

        if (Array.isArray(value)) {
            return (
                <motion.div variants={itemVariants} key={key} className="h-full">
                    <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
                        {key.toLowerCase().includes('warn') || key.toLowerCase().includes('prohibit') ? (
                            <div className="bg-red-500/10 p-2 rounded-lg">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                        ) : key.toLowerCase().includes('note') ? (
                            <div className="bg-blue-500/10 p-2 rounded-lg">
                                <Info className="h-6 w-6 text-blue-500" />
                            </div>
                        ) : (
                            <div className="bg-green-500/10 p-2 rounded-lg">
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </div>
                        )}
                        {formatKey(key)}
                    </h3>
                    <ul className="space-y-4">
                        {value.map((item, index) => (
                            <li key={index} className="flex items-start gap-4 text-muted-foreground leading-relaxed text-lg group">
                                <span className="mt-2.5 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-purple-500 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                                <span className="group-hover:text-foreground transition-colors duration-300">{renderTextWithLinks(item)}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            );
        }

        if (typeof value === 'string') {
            return (
                <motion.div variants={itemVariants} key={key} className="h-full">
                    <h3 className="text-2xl font-bold mb-4 text-primary">{formatKey(key)}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{renderTextWithLinks(value)}</p>
                </motion.div>
            );
        }

        return null;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center pt-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </main>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center pt-16 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
                    <p className="text-muted-foreground mb-6">{error || "The requested guide section does not exist."}</p>
                    <Button asChild>
                        <Link to="/guide">Back to Guides</Link>
                    </Button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30">
            <Header />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <main className="flex-1 pt-16 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 via-background/50 to-background -z-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                <div className="absolute top-40 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[80px] -z-10 animate-pulse delay-1000" />

                {/* Article Header */}
                <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary group" asChild>
                        <Link to="/guide" className="flex items-center gap-2 text-muted-foreground transition-colors">
                            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                                <ArrowLeft className="h-4 w-4 text-primary" />
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform">Back to Guides</span>
                        </Link>
                    </Button>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary text-sm font-semibold border border-primary/20 shadow-sm backdrop-blur-sm">
                                Official Travel Guide
                            </span>
                            <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                                <Globe className="h-3.5 w-3.5" /> Travel India
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 max-w-3xl">
                            {data.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Article Content */}
                <div className="container max-w-6xl mx-auto px-4 pb-24">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="prose prose-invert max-w-none"
                    >
                        {data.description && (
                            <motion.div variants={itemVariants} className="mb-12 text-lg leading-relaxed text-gray-300 font-medium">
                                {data.description}
                            </motion.div>
                        )}

                        {data.whatIsRAP && (
                            <motion.div variants={itemVariants} className="mb-12 text-lg leading-relaxed text-gray-300 font-medium">
                                {data.whatIsRAP}
                            </motion.div>
                        )}

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                            {Object.entries(data).map(([key, value]) => renderContent(key, value))}
                        </div>

                        {/* Disclaimer Box */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 backdrop-blur-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                            <h4 className="flex items-center gap-3 font-bold text-yellow-500 mb-3 text-lg relative z-10">
                                <AlertTriangle className="h-6 w-6" /> Important Disclaimer
                            </h4>
                            <p className="text-base text-yellow-500/80 leading-relaxed relative z-10">
                                Visa rules and regulations can change without prior notice. Always verify information with official government sources before planning your trip.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default EntryGuide;
