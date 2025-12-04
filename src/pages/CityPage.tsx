import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Utensils, Train, Shield, Wallet, Moon, ShoppingBag, Clock, Info, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cityData = {
    delhi: {
        name: "Delhi",
        title: "The Heart of India: Where History Meets Modernity",
        image: "https://images.unsplash.com/photo-1587474260584-136574528615?q=80&w=1000&auto=format&fit=crop",
        about: "Delhi is a blend of old-world charm and modern dynamism. Travelers come here for its rich Mughal heritage, bustling lanes, world-famous food, efficient metro network, and unmatched cultural diversity. Whether you’re a history lover, foodie, backpacker, or family traveler, Delhi never disappoints.",
        bestTime: [
            { season: "October to March", desc: "Pleasant weather, perfect for sightseeing." },
            { season: "April to June", desc: "Very hot, best to avoid outdoor activities during the day." },
            { season: "July to August", desc: "Rainy season, brings relief from heat but can be humid." },
            { season: "Festive Seasons", desc: "Diwali, Holi, Republic Day offer unique cultural experiences." }
        ],
        attractions: [
            {
                name: "India Gate",
                image: "https://images.unsplash.com/photo-1592639296346-560b37188774?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30–45 mins",
                bestTime: "Evening"
            },
            {
                name: "Qutub Minar",
                image: "https://images.unsplash.com/photo-1545231499-905c36571456?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 5 PM",
                entry: "₹35 (Indian), ₹550 (foreigner)",
                duration: "1–1.5 hrs"
            },
            {
                name: "Red Fort",
                image: "https://images.unsplash.com/photo-1598556776374-2273653243f2?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 4:30 PM (Closed Mon)",
                entry: "₹35",
                duration: "~2 hrs"
            },
            {
                name: "Humayun’s Tomb",
                image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 6 PM",
                entry: "₹40",
                duration: "1–1.5 hrs"
            },
            {
                name: "Lotus Temple",
                image: "https://images.unsplash.com/photo-1594102552386-793e5a27ad10?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM (Closed Mon)",
                entry: "Free",
                duration: "45–60 mins"
            },
            {
                name: "Akshardham Temple",
                image: "https://images.unsplash.com/photo-1675664426868-208d35c24479?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 8 PM (Closed Mon)",
                entry: "Free (shows extra)",
                duration: "3–4 hrs"
            },
            {
                name: "Chandni Chowk",
                image: "https://images.unsplash.com/photo-1622194993926-19f495574936?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 9 PM",
                entry: "Free",
                duration: "2–3 hrs",
                desc: "Highlights: Street food, shopping, heritage"
            },
            {
                name: "Hauz Khas Village",
                image: "https://images.unsplash.com/photo-1572508589584-94d778209069?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 11 PM",
                entry: "Free",
                duration: "2–3 hrs",
                desc: "Highlights: Cafés, nightlife, fort ruins, lake"
            },
            {
                name: "Gurudwara Bangla Sahib",
                image: "https://images.unsplash.com/photo-1580974511812-4b71978d501b?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "45 mins"
            }
        ],
        hiddenGems: ["Sanjay Van", "Majnu ka Tilla", "Agrasen ki Baoli", "Lodhi Art District", "Sunder Nursery", "Mehrauli Archaeological Park"],
        food: [
            { area: "Chandni Chowk", spots: "Paranthe Wali Gali, Karim’s" },
            { area: "Connaught Place", spots: "Jain Chawal Wale, Cafés" },
            { area: "Lajpat Nagar", spots: "Afghan food" },
            { area: "Hudson Lane", spots: "Student cafés" }
        ],
        markets: ["Sarojini Nagar", "Janpath", "Khan Market", "Dilli Haat"],
        nightlife: ["Hauz Khas Village", "Aerocity", "Connaught Place"],
        itineraries: {
            day1: "India Gate → Qutub Minar → Mehrauli → Humayun’s Tomb → CP",
            day2: "Red Fort → Chandni Chowk → Jama Masjid → Lotus Temple → Qutub Minar → Mehrauli → Bangla Sahib → Hauz Khas",
            day3: "Add Akshardham, Lodhi Art District, Sunder Nursery, markets"
        },
        transport: {
            metro: "₹20–₹60",
            cabs: [
                { type: "Short (2–4 km)", cost: "₹80–₹150" },
                { type: "Medium (8–12 km)", cost: "₹150–₹250" },
                { type: "Airport to city", cost: "₹350–₹700" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1200/day" },
            { type: "Mid", cost: "₹2000–₹3500/day" },
            { type: "High", cost: "₹5000–₹8000/day" }
        ],
        stay: ["Connaught Place", "Karol Bagh", "Aerocity", "South Delhi"],
        safety: [
            "Use metro for long routes",
            "Avoid isolated areas late night",
            "Bargain in markets",
            "Keep small cash",
            "Weekends crowded",
            "Dress comfortably for heat"
        ]
    },
    mumbai: {
        name: "Mumbai",
        title: "The City of Dreams",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
        about: "Mumbai is a dynamic blend of cultures, lifestyles, and opportunities. Home to historical monuments, the famous Marine Drive, bustling markets, premier art districts, and the film industry, the city is both chaotic and captivating. Mumbai attracts backpackers, families, entrepreneurs, artists, and explorers from around the world.",
        bestTime: [
            { season: "November to February", desc: "Best weather, pleasant and cool." },
            { season: "March to May", desc: "Hot & humid, typical coastal summer." },
            { season: "June to September", desc: "Monsoon season with beautiful but heavy rains." },
            { season: "Festive Seasons", desc: "Ganesh Chaturthi, Diwali, Kala Ghoda Festival." }
        ],
        attractions: [
            {
                name: "Gateway of India",
                image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30–45 mins",
                desc: "A monumental arch overlooking the Arabian Sea—perfect sunrise spot."
            },
            {
                name: "Marine Drive",
                image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "A long promenade famous for sunsets, sea breeze, and night lights (Queen’s Necklace)."
            },
            {
                name: "Colaba Causeway",
                image: "https://images.unsplash.com/photo-1622610731464-9646b9a2c3f1?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM - 10 PM",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Perfect for street shopping, cafes, antiques."
            },
            {
                name: "CSMT Station",
                image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "UNESCO World Heritage railway station. Best time: Evening lighting."
            },
            {
                name: "Elephanta Caves",
                image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "₹40 (Indian)",
                duration: "Half-day trip",
                desc: "Ancient rock-cut caves and sculptures dedicated to Lord Shiva. Boat from Gateway."
            },
            {
                name: "Juhu Beach",
                image: "https://images.unsplash.com/photo-1562957368-45b954298967?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Famous for street snacks like pav bhaji & gola."
            },
            {
                name: "Bandra-Worli Sea Link",
                image: "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Toll applies",
                duration: "20–30 mins",
                desc: "Engineering marvel. Best experienced by drive."
            },
            {
                name: "Siddhivinayak Temple",
                image: "https://images.unsplash.com/photo-1628103328221-39b7d8c53085?q=80&w=800&auto=format&fit=crop",
                timings: "4:30 AM – 9:50 PM",
                entry: "Free",
                duration: "30–60 mins",
                desc: "One of Mumbai’s most visited temples."
            },
            {
                name: "Haji Ali Dargah",
                image: "https://images.unsplash.com/photo-1588960829876-02e529737522?q=80&w=800&auto=format&fit=crop",
                timings: "5:30 AM – 10 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "A serene shrine located in the middle of the sea."
            },
            {
                name: "Girgaum Chowpatty",
                image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Famous for food stalls, festive events."
            }
        ],
        hiddenGems: ["Banganga Tank", "Carter Road Promenade", "Worli Fishing Village", "Global Vipassana Pagoda", "Gilbert Hill", "Versova Beach", "Kala Ghoda Art District", "Prithvi Theatre"],
        food: [
            { area: "Juhu Beach", spots: "Pav Bhaji & street snacks" },
            { area: "Mohammad Ali Road", spots: "Kebabs, biryani, desserts" },
            { area: "Girgaum Chowpatty", spots: "Chaat & kulfi" },
            { area: "Bandra", spots: "Cafés & bakeries" },
            { area: "Lower Parel", spots: "Fine dining & nightclubs" }
        ],
        markets: ["Colaba Causeway", "Linking Road", "Crawford Market", "Chor Bazaar"],
        nightlife: ["Bandra", "Lower Parel", "Colaba", "Versova", "Marine Drive"],
        itineraries: {
            day1: "Gateway of India → Colaba → Marine Drive → Chowpatty → Bandra",
            day2: "Elephanta Caves → CSMT → Colaba → Juhu Beach → Bandra Fort → Bandra streets → Worli Sea Link",
            day3: "Haji Ali → Siddhivinayak → Kala Ghoda → Prithvi Theatre → Carter Road"
        },
        transport: {
            metro: "₹10–₹50 (Smooth, AC)",
            cabs: [
                { type: "Short (2–4 km)", cost: "₹80–₹150" },
                { type: "Medium (8–12 km)", cost: "₹150–₹250" },
                { type: "Airport to city", cost: "₹300–₹800" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹900–₹1500/day" },
            { type: "Mid", cost: "₹1800–₹3500/day" },
            { type: "High", cost: "₹5000–₹9000/day" }
        ],
        stay: ["Colaba", "Bandra", "Juhu", "Lower Parel", "Andheri"],
        safety: [
            "Mumbai is safer than most metros, but stay alert",
            "Avoid travelling alone late night in isolated lanes",
            "Keep a power bank (humidity drains phones)",
            "Use trains/metro for time efficiency",
            "Monsoon: Carry waterproof bags & footwear",
            "Beaches can get crowded—keep belongings secure"
        ]
    },
    jaipur: {
        name: "Jaipur",
        title: "The Pink City of Royal Heritage",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
        about: "Jaipur is India’s first planned city, designed with ancient Vastu Shastra principles. It is filled with grand forts, ornate palaces, cultural festivals, camel rides, handicraft bazaars, and delicious local cuisine. Travelers visit Jaipur for its unique mix of heritage, color, tradition, and warm desert spirit.",
        bestTime: [
            { season: "October to March", desc: "Pleasant, ideal for sightseeing." },
            { season: "April to June", desc: "Very hot, best to avoid outdoor activities." },
            { season: "July to September", desc: "Monsoon, moderate travel conditions." },
            { season: "Festive Seasons", desc: "Jaipur Literature Festival, Kite Festival, Teej." }
        ],
        attractions: [
            {
                name: "Amer Fort",
                image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 5:30 PM",
                entry: "₹100 (Indian)",
                duration: "2–3 hrs",
                desc: "A massive hilltop fort offering elephant rides, light shows, and stunning views."
            },
            {
                name: "City Palace",
                image: "https://images.unsplash.com/photo-1557690756-62764a7400d6?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 5 PM",
                entry: "₹200–₹300",
                duration: "1–2 hrs",
                desc: "A mix of Mughal and Rajput architecture with museums and royal residences."
            },
            {
                name: "Hawa Mahal",
                image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "₹50",
                duration: "30–45 mins",
                desc: "Iconic façade with 953 windows built for royal women to observe street festivals."
            },
            {
                name: "Jantar Mantar",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "₹50",
                duration: "1 hr",
                desc: "UNESCO astronomical observatory with precise stone instruments."
            },
            {
                name: "Nahargarh Fort",
                image: "https://images.unsplash.com/photo-1583590025986-d9f98f50332a?q=80&w=800&auto=format&fit=crop",
                timings: "Best time: Sunset",
                entry: "₹50",
                duration: "1–2 hrs",
                desc: "Offers panoramic views of Jaipur city."
            },
            {
                name: "Jaigarh Fort",
                image: "https://images.unsplash.com/photo-1622308644420-a94bb897239c?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM - 4:30 PM",
                entry: "₹70",
                duration: "1–2 hrs",
                desc: "Known for: World’s largest cannon."
            },
            {
                name: "Jal Mahal",
                image: "https://images.unsplash.com/photo-1582506843444-2e32298b6f7a?q=80&w=800&auto=format&fit=crop",
                timings: "View from roadside",
                entry: "Free",
                duration: "20–30 mins",
                desc: "A beautiful palace floating in Man Sagar Lake."
            },
            {
                name: "Albert Hall Museum",
                image: "https://images.unsplash.com/photo-1598887142487-3c854d53d2c8?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "₹40",
                duration: "1–1.5 hrs",
                desc: "Oldest museum in Rajasthan, showcasing artifacts."
            },
            {
                name: "Birla Mandir",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "Open till night",
                entry: "Free",
                duration: "30 mins",
                desc: "Stunning white marble temple."
            },
            {
                name: "Chokhi Dhani",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "5 PM – 11 PM",
                entry: "₹700–₹1200",
                duration: "2–3 hrs",
                desc: "Rajasthani cultural village experience with food, dance, and performances."
            }
        ],
        hiddenGems: ["Panna Meena ka Kund", "Jawahar Circle Garden", "Patrika Gate", "Royal Gaitor Tombs", "Masala Chowk", "Sargasuli Tower"],
        food: [
            { area: "Rawat Mishthan Bhandar", spots: "Kachoris" },
            { area: "LMB (Laxmi Mishtan Bhandar)", spots: "Sweets & thalis" },
            { area: "Chokhi Dhani", spots: "Cultural dinner" },
            { area: "Tapri Central", spots: "Café with views" },
            { area: "Masala Chowk", spots: "Street food hub" }
        ],
        markets: ["Johari Bazaar", "Bapu Bazaar", "Tripolia Bazaar", "MI Road"],
        nightlife: ["Tapri Central", "Bar Palladio", "Blackout", "Chokhi Dhani"],
        itineraries: {
            day1: "Amer Fort → Jal Mahal → City Palace → Jantar Mantar → Hawa Mahal → Local Markets",
            day2: "Amer Fort → Jaigarh → Nahargarh (sunset) → Chokhi Dhani",
            day3: "Patrika Gate → Panna Meena ka Kund → Food trails → Bapu Bazaar shopping"
        },
        transport: {
            metro: "Limited network",
            cabs: [
                { type: "Short (2–4 km)", cost: "₹70–₹120" },
                { type: "Medium (6–10 km)", cost: "₹120–₹200" },
                { type: "Airport to city", cost: "₹300–₹600" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹700–₹1200/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹4000–₹8000/day" }
        ],
        stay: ["MI Road", "Bani Park", "C-Scheme", "Amer Road", "Raja Park"],
        safety: [
            "Stay hydrated (dry desert climate)",
            "Bargain in markets",
            "Wear comfortable shoes (lots of walking)",
            "Respect local traditions & dress modestly in temples",
            "Traffic can be chaotic—use crosswalks",
            "Evenings near popular tourist areas are safe but remain alert"
        ]
    },
    agra: {
        name: "Agra",
        title: "Home of the Majestic Taj Mahal",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
        about: "Agra was once the capital of the Mughal Empire and still carries the grandeur of that era. The city showcases some of the greatest architectural masterpieces of India—Taj Mahal, Agra Fort, and Fatehpur Sikri. From marble artisans to street food vendors, Agra offers a complete cultural experience.",
        bestTime: [
            { season: "October to March", desc: "Best weather, pleasant for sightseeing." },
            { season: "April to June", desc: "Very hot, best to avoid outdoor activities." },
            { season: "July to September", desc: "Monsoon, moderate travel conditions." },
            { season: "Highlights", desc: "Sunrise at the Taj Mahal is the peak highlight for photographers." }
        ],
        attractions: [
            {
                name: "Taj Mahal",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset (Closed Fri)",
                entry: "₹50–₹250",
                duration: "2–3 hrs",
                desc: "A UNESCO World Heritage masterpiece of love, built by Emperor Shah Jahan."
            },
            {
                name: "Agra Fort",
                image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹50",
                duration: "1.5–2 hrs",
                desc: "Massive red sandstone fort with palaces, mosques, and iconic viewpoints of the Taj."
            },
            {
                name: "Mehtab Bagh",
                image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹25",
                duration: "45 mins",
                desc: "Best for: Sunset Taj view from across the river."
            },
            {
                name: "Fatehpur Sikri",
                image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹50",
                duration: "Half-day trip",
                desc: "A stunning, abandoned Mughal city built by Emperor Akbar (40 km from Agra)."
            },
            {
                name: "Itmad-ud-Daulah",
                image: "https://images.unsplash.com/photo-1594454744365-af75629f2719?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹30",
                duration: "1 hr",
                desc: "Often called a mini Taj Mahal, with intricate marble work."
            },
            {
                name: "Akbar’s Tomb",
                image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹30",
                duration: "1–1.5 hrs",
                desc: "The final resting place of Emperor Akbar at Sikandra."
            },
            {
                name: "Taj Museum",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM - 5 PM",
                entry: "Included in Taj ticket",
                duration: "20–30 mins",
                desc: "Located inside Taj complex, showcasing Mughal artifacts."
            },
            {
                name: "Jama Masjid",
                image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?q=80&w=800&auto=format&fit=crop",
                timings: "Open all day",
                entry: "Free",
                duration: "30 mins",
                desc: "Historic Mughal mosque."
            }
        ],
        hiddenGems: ["Sheroes Hangout Café", "Chini Ka Rauza", "Kinari Bazaar", "Mankameshwar Temple", "Marble workshops"],
        food: [
            { area: "Sadar Bazaar", spots: "Parathas, Chaat" },
            { area: "Pinch of Spice", spots: "Mughlai dishes" },
            { area: "Mama Chicken", spots: "Non-veg specialties" },
            { area: "Sheroes Hangout", spots: "Café run by survivors" },
            { area: "Dasaprakash", spots: "South Indian" }
        ],
        markets: ["Sadar Bazaar", "Kinari Bazaar", "Subhash Bazaar", "Taj Mahal Road"],
        nightlife: ["Sheroes Hangout Café", "Sadar Bazaar Food Street", "Light & Sound Show at Fort"],
        itineraries: {
            day1: "Taj Mahal (sunrise) → Breakfast → Agra Fort → Mehtab Bagh → Sadar Bazaar",
            day2: "Fatehpur Sikri → Local markets → Food walk",
            day3: "Sikandra → Chini Ka Rauza → Marble artisans → Street food trail"
        },
        transport: {
            metro: "Under construction",
            cabs: [
                { type: "Short (2–4 km)", cost: "₹60–₹120" },
                { type: "Medium (6–10 km)", cost: "₹120–₹200" },
                { type: "Taj to Fort", cost: "₹80–₹150" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹700–₹1200/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹3500–₹7000/day" }
        ],
        stay: ["Tajganj", "Fatehabad Road", "Civil Lines", "Agra Cantt"],
        safety: [
            "Beware of unofficial guides or persistent vendors",
            "Avoid visiting the Taj during peak midday heat",
            "Stay hydrated",
            "Keep footwear comfortable—lots of walking",
            "Respect security rules inside Taj complex",
            "Women travelers: main tourist areas are safe, but remain cautious at night"
        ]
    },
    varanasi: {
        name: "Varanasi",
        title: "The Spiritual Heart of India",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop",
        about: "Varanasi (Kashi or Banaras) is the oldest living city in the world and one of India’s most sacred destinations. Located on the banks of the holy Ganges River, Varanasi is a city of temples, ghats, rituals, spirituality, and deep cultural heritage. A visit here is an experience of India’s oldest traditions, morning prayers, boat rides, classical music, and vibrant street life.",
        bestTime: [
            { season: "October to March", desc: "Best weather, pleasant for sightseeing." },
            { season: "April to June", desc: "Extremely hot, best to avoid." },
            { season: "July to September", desc: "Monsoon, offers unique riverside beauty." },
            { season: "Festivals", desc: "Dev Deepawali, Diwali, Maha Shivratri." }
        ],
        attractions: [
            {
                name: "Dashashwamedh Ghat",
                image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–1.5 hrs",
                desc: "Famous for the spectacular evening Ganga Aarti. Best time: Sunset."
            },
            {
                name: "Kashi Vishwanath Temple",
                image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=800&auto=format&fit=crop",
                timings: "4 AM – 11 PM",
                entry: "Free",
                duration: "30–45 mins",
                desc: "One of India’s holiest Shiva temples."
            },
            {
                name: "Assi Ghat",
                image: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1 hr",
                desc: "Known for yoga sessions, morning Aarti, and peaceful atmosphere."
            },
            {
                name: "Manikarnika Ghat",
                image: "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "20–30 mins",
                desc: "Sacred cremation ghat with deep cultural significance."
            },
            {
                name: "Sarnath",
                image: "https://images.unsplash.com/photo-1588096344321-2168f1c0d6b7?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "₹20",
                duration: "Half-day trip",
                desc: "A major Buddhist pilgrimage site where Buddha gave his first sermon (10 km away)."
            },
            {
                name: "BHU Campus",
                image: "https://images.unsplash.com/photo-1565019054-067169455339?q=80&w=800&auto=format&fit=crop",
                timings: "Open all day",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Banaras Hindu University, a green campus with Bharat Kala Bhavan Museum."
            },
            {
                name: "Ramnagar Fort",
                image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM",
                entry: "₹50",
                duration: "1 hr",
                desc: "Historic fort and museum located across the Ganges."
            },
            {
                name: "Kaal Bhairav Temple",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "5 AM - 1:30 PM, 4:30 PM - 9:30 PM",
                entry: "Free",
                duration: "30 mins",
                desc: "Dedicated to the guardian deity of Varanasi."
            },
            {
                name: "Tulsi Ghat",
                image: "https://images.unsplash.com/photo-1592635190555-788c14152771?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Known for cultural performances and calmer ambience."
            },
            {
                name: "Vishwanath Gali",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM - 9 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "Narrow lanes filled with shops, food, silk, and souvenirs."
            }
        ],
        hiddenGems: ["Nepali Temple", "Man Singh Observatory", "Malviya Bridge viewpoint", "Kedar Ghat Cafés", "Assi Ghat Music"],
        food: [
            { area: "Kashi Chaat Bhandar", spots: "Tamatar Chaat" },
            { area: "Blue Lassi Shop", spots: "Lassi" },
            { area: "Deena Chaat Bhandar", spots: "Chaat varieties" },
            { area: "Vishwanath Gali", spots: "Street food stalls" },
            { area: "Open Hand Café", spots: "Café food" }
        ],
        markets: ["Vishwanath Gali", "Thatheri Bazaar", "Godowlia Market", "Chowk"],
        nightlife: ["Ganga Aarti", "Assi Ghat Music", "Evening Boat Ride", "Kedar Ghat Cafés"],
        itineraries: {
            day1: "Sunrise boat ride → Kashi Vishwanath → Vishwanath Gali → Sarnath → Evening Ganga Aarti",
            day2: "Morning boat ride → Temples → Ghats walk → Food trail",
            day3: "Sarnath → Ramnagar Fort → Assi Ghat evening"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Short (2–4 km)", cost: "₹50–₹100" },
                { type: "Medium (6–10 km)", cost: "₹120–₹200" },
                { type: "Boat Ride", cost: "₹300–₹600" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹600–₹1000/day" },
            { type: "Mid", cost: "₹1200–₹2500/day" },
            { type: "High", cost: "₹3000–₹6000/day" }
        ],
        stay: ["Assi Ghat", "Dashashwamedh Ghat", "Godowlia", "Lanka/BHU"],
        safety: [
            "Lanes can get crowded—keep belongings secure",
            "Avoid walking alone late night near isolated ghats",
            "Respect temple customs",
            "Beware of overcharging boatmen—compare prices",
            "Wear comfortable shoes for long walks"
        ]
    },
    goa: {
        name: "Goa",
        title: "India’s Beach Paradise",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
        about: "Goa, India’s most popular beach destination, is known for its golden sands, vibrant nightlife, water sports, seafood, cafés, and relaxed tropical vibe. It is a perfect getaway for families, friends, backpackers, and honeymooners. Goa’s charm lies in its stunning beaches, Portuguese heritage, churches, natural beauty, and laid-back lifestyle.",
        bestTime: [
            { season: "November to February", desc: "Peak tourist season, best weather." },
            { season: "March to May", desc: "Hot, good for budget stays." },
            { season: "June to September", desc: "Monsoon, beautiful landscapes but fewer water sports." },
            { season: "Festivals", desc: "Christmas, New Year, Sunburn Festival." }
        ],
        attractions: [
            {
                name: "Baga Beach",
                image: "https://images.unsplash.com/photo-1596627647228-568374026330?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs or full day",
                desc: "Famous for nightlife, shacks, water sports."
            },
            {
                name: "Calangute Beach",
                image: "https://images.unsplash.com/photo-1582913130063-48538569b4e3?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Ideal for families & water activities."
            },
            {
                name: "Aguada Fort",
                image: "https://images.unsplash.com/photo-1590491525752-9951c6a3c694?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 6 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "A scenic fort overlooking the Arabian Sea."
            },
            {
                name: "Palolem Beach",
                image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Calm, clean, perfect for couples (South Goa)."
            },
            {
                name: "Basilica of Bom Jesus",
                image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 6:30 PM",
                entry: "Free",
                duration: "30–45 mins",
                desc: "UNESCO Heritage church known for Portuguese architecture."
            },
            {
                name: "Dona Paula Viewpoint",
                image: "https://images.unsplash.com/photo-1620065960017-7c9367d02598?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Popular scenic spot."
            },
            {
                name: "Anjuna Beach",
                image: "https://images.unsplash.com/photo-1548247661-3d710cffec3d?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Known for flea markets & sunset cafés."
            },
            {
                name: "Vagator Beach",
                image: "https://images.unsplash.com/photo-1566324813477-1c0260709049?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Great for sunsets, photography, cafés."
            },
            {
                name: "Chapora Fort",
                image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800&auto=format&fit=crop",
                timings: "Sunrise to Sunset",
                entry: "Free",
                duration: "1 hr",
                desc: "Famous for Dil Chahta Hai viewpoint."
            },
            {
                name: "Spice Plantation",
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 4 PM",
                entry: "₹400–₹800",
                duration: "1–2 hrs",
                desc: "Guided tour of spice farms with lunch."
            }
        ],
        hiddenGems: ["Butterfly Beach", "Kakolem Beach", "Tambdi Surla Temple", "Netravali Wildlife Sanctuary", "Divar Island", "Reis Magos Fort"],
        food: [
            { area: "Fisherman’s Wharf", spots: "Goan Seafood" },
            { area: "Martin’s Corner", spots: "Traditional Goan" },
            { area: "Infantaria", spots: "Breakfast & Bakery" },
            { area: "Thalassa", spots: "Greek food with sunset view" },
            { area: "Gunpowder", spots: "Goan + South Indian" }
        ],
        markets: ["Anjuna Flea Market", "Arpora Night Market", "Mapusa Market", "Panjim Market"],
        nightlife: ["Tito’s Lane (Baga)", "Curlies (Anjuna)", "Hilltop (Vagator)", "Casinos (Panaji)"],
        itineraries: {
            day1: "Calangute → Baga → Aguada Fort → Candolim → Sunset at Vagator",
            day2: "North Goa beaches → Fort Aguada → Nightlife",
            day3: "Old Goa Churches → Dona Paula → Panaji → Casino (optional)"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Scooter Rent", cost: "₹300–₹600/day" },
                { type: "Car Rent", cost: "₹1200–₹2500/day" },
                { type: "Taxi", cost: "Expensive, fixed rates" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1500/day" },
            { type: "Mid", cost: "₹2000–₹4000/day" },
            { type: "High", cost: "₹5000–₹10000/day" }
        ],
        stay: ["Baga (Nightlife)", "Calangute (Family)", "Palolem (Peaceful)", "Panjim (Central)"],
        safety: [
            "Wear sunscreen—Goa sun is strong",
            "Avoid swimming during rough waves",
            "Keep belongings secure on crowded beaches",
            "Do not drink & drive (strict checks)",
            "Follow water sports safety instructions"
        ]
    },
    kerala: {
        name: "Kerala",
        title: "God’s Own Country",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
        about: "Kerala is India’s most serene and naturally beautiful destination, known for its backwaters, beaches, hill stations, houseboats, wildlife, Ayurvedic retreats, and rich cultural heritage. With palm-fringed lagoons, lush hills, spice plantations, and peaceful coastal towns, Kerala offers a relaxing and immersive travel experience.",
        bestTime: [
            { season: "October to March", desc: "Best weather, ideal for all activities." },
            { season: "April to June", desc: "Warm but good for hill stations like Munnar." },
            { season: "June to September", desc: "Monsoon, beautiful landscapes and ideal for Ayurveda." },
            { season: "Festivals", desc: "Onam, Thrissur Pooram, Kochi-Muziris Biennale." }
        ],
        attractions: [
            {
                name: "Fort Kochi",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Known for colonial streets, cafés, art, and Chinese fishing nets."
            },
            {
                name: "Munnar Tea Gardens",
                image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "Free (Museum charges apply)",
                duration: "Half-day",
                desc: "Famous for lush green valleys and tea plantations."
            },
            {
                name: "Alleppey Houseboats",
                image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop",
                timings: "Check-in 12 PM",
                entry: "Varies",
                duration: "Overnight",
                desc: "Backwaters, lagoons, palm views—all from a floating home."
            },
            {
                name: "Periyar Wildlife Sanctuary",
                image: "https://images.unsplash.com/photo-1588096344321-2168f1c0d6b7?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 5 PM",
                entry: "₹300",
                duration: "2–3 hrs",
                desc: "Boating, jungle walks, bamboo rafting in Thekkady."
            },
            {
                name: "Varkala Cliff",
                image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Cliffside beaches, cafés, sunsets."
            },
            {
                name: "Mattancherry Palace",
                image: "https://images.unsplash.com/photo-1620065960017-7c9367d02598?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM (Fri Closed)",
                entry: "₹5",
                duration: "45 mins",
                desc: "Portuguese palace featuring Kerala murals."
            },
            {
                name: "Eravikulam National Park",
                image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 4 PM",
                entry: "₹200",
                duration: "2–3 hrs",
                desc: "Home to the endangered Nilgiri Tahr."
            },
            {
                name: "Athirappilly Waterfalls",
                image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 6 PM",
                entry: "₹50",
                duration: "2 hrs",
                desc: "Known as Kerala’s Niagara, majestic waterfalls."
            },
            {
                name: "Edakkal Caves",
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 4 PM",
                entry: "₹40",
                duration: "2 hrs",
                desc: "Ancient rock carvings in Wayanad."
            },
            {
                name: "Kovalam Lighthouse Beach",
                image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Swimming, cafés, scenic walks."
            }
        ],
        hiddenGems: ["Marari Beach", "Poovar Island", "Chembra Peak", "Kuttanad Backwaters", "Chathurangapara Viewpoint"],
        food: [
            { area: "Fort Kochi", spots: "Seafood & Cafés" },
            { area: "Alleppey", spots: "Backwater Toddy Shops" },
            { area: "Munnar", spots: "Tea & Snacks" },
            { area: "Kozhikode", spots: "Malabar Biryani & Halwa" },
            { area: "Trivandrum", spots: "Traditional Sadya" }
        ],
        markets: ["Jew Town (Kochi)", "Mattancherry Spice Market", "Munnar Tea Shops", "Broadway (Ernakulam)"],
        nightlife: ["Varkala Cliff Cafés", "Fort Kochi Cultural Shows", "Kathakali Performances"],
        itineraries: {
            day1: "Fort Kochi → Chinese Fishing Nets → Mattancherry → Jew Town → Marine Drive",
            day2: "Munnar tea gardens → Top Station → Eravikulam National Park",
            day3: "Alleppey houseboat cruise → Backwaters → Beach relax"
        },
        transport: {
            metro: "Kochi Metro available",
            cabs: [
                { type: "Auto-rickshaw", cost: "Meter/Negotiable" },
                { type: "Taxi (Intercity)", cost: "₹800–₹1200 (Airport)" },
                { type: "Bike Rent", cost: "₹300–₹600/day" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹1000–₹1500/day" },
            { type: "Mid", cost: "₹1800–₹3500/day" },
            { type: "High", cost: "₹4500–₹8000/day" }
        ],
        stay: ["Fort Kochi (Culture)", "Alleppey (Houseboats)", "Munnar (Hills)", "Varkala (Cliffs)"],
        safety: [
            "Hill roads can be slippery during monsoon",
            "Houseboat bookings should be verified",
            "Beach areas safe but avoid late-night isolation",
            "Use insect repellent in backwater zones",
            "Hydrate during humid months"
        ]
    },
    udaipur: {
        name: "Udaipur",
        title: "The City of Lakes",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=1000&auto=format&fit=crop",
        about: "Udaipur, one of India’s most romantic destinations, is famous for its lakes, palaces, sunsets, and rich Rajasthani heritage. Known as the “City of Lakes,” Udaipur attracts travelers with its serene atmosphere, royal architecture, vibrant markets, and scenic viewpoints.",
        bestTime: [
            { season: "October to March", desc: "Best season, pleasant weather." },
            { season: "April to June", desc: "Hot, best to avoid outdoor activities during the day." },
            { season: "July to September", desc: "Monsoon greenery adds to the charm." },
            { season: "Festivals", desc: "Mewar Festival, Shilpgram Festival." }
        ],
        attractions: [
            {
                name: "City Palace",
                image: "https://images.unsplash.com/photo-1557690756-62764a7400d6?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 5:30 PM",
                entry: "₹300 (Indians)",
                duration: "2 hrs",
                desc: "A massive palace complex with museums, courtyards, and lake views."
            },
            {
                name: "Lake Pichola",
                image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free (Boat ride charges apply)",
                duration: "1–2 hrs",
                desc: "Famous for sunset boat rides and island palaces."
            },
            {
                name: "Jag Mandir",
                image: "https://images.unsplash.com/photo-1582506843444-2e32298b6f7a?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 6 PM",
                entry: "Free (Boat transfer chargeable)",
                duration: "1 hr",
                desc: "Island palace on Lake Pichola."
            },
            {
                name: "Gangaur Ghat",
                image: "https://images.unsplash.com/photo-1598887142487-3c854d53d2c8?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Photography spot, morning & evening vibe."
            },
            {
                name: "Jagdish Temple",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "4:15 AM – 1 PM, 5:15 PM – 8 PM",
                entry: "Free",
                duration: "30 mins",
                desc: "Historic Hindu temple with intricate carvings."
            },
            {
                name: "Fateh Sagar Lake",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Boating, cafés, sunset views."
            },
            {
                name: "Sajjangarh (Monsoon Palace)",
                image: "https://images.unsplash.com/photo-1583590025986-d9f98f50332a?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 6 PM",
                entry: "₹110",
                duration: "1–2 hrs",
                desc: "Hilltop viewpoint, best for sunset."
            },
            {
                name: "Saheliyon Ki Bari",
                image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 7 PM",
                entry: "₹10",
                duration: "1 hr",
                desc: "Beautiful royal garden with fountains."
            },
            {
                name: "Shilpgram",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "11 AM – 7 PM",
                entry: "₹30",
                duration: "2 hrs",
                desc: "Cultural village showcasing crafts & performances."
            },
            {
                name: "Vintage Car Museum",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 9 PM",
                entry: "₹400",
                duration: "45 mins",
                desc: "Unique automobile collection of the Maharanas."
            }
        ],
        hiddenGems: ["Badi Lake", "Bahubali Hills", "Ambrai Ghat", "Tiger Lake", "Crystal Gallery"],
        food: [
            { area: "Ambrai Restaurant", spots: "Lake view dining" },
            { area: "Upre", spots: "Rooftop views" },
            { area: "Jagat Niwas", spots: "Rooftop dining" },
            { area: "Khamma Ghani", spots: "Fine dining" },
            { area: "Grasswood Cafe", spots: "Café food" }
        ],
        markets: ["Hathi Pol", "Bada Bazaar", "Shilpgram Bazaar", "Chetak Circle"],
        nightlife: ["Ambrai Ghat", "Rooftop Restaurants", "Fateh Sagar Lake Cafés"],
        itineraries: {
            day1: "City Palace → Jagdish Temple → Lake Pichola boat ride → Ambrai Ghat",
            day2: "Sajjangarh Palace → Fateh Sagar Lake → Saheliyon Ki Bari → Shopping",
            day3: "Badi Lake → Bahubali Hills → Shilpgram → Vintage Car Museum"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Auto-rickshaw", cost: "Negotiable" },
                { type: "Ola/Uber", cost: "₹60–₹200" },
                { type: "Bike Rental", cost: "₹300–₹500/day" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1300/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹4000–₹8000/day" }
        ],
        stay: ["Lake Pichola", "Lal Ghat", "Fateh Sagar Lake", "Udaipur City Centre"],
        safety: [
            "Narrow old city roads—walk carefully",
            "Sunset viewpoints get crowded",
            "Beware of overpriced tour operators",
            "Drink plenty of water (dry climate)",
            "Stick to known areas at night"
        ]
    },
    bangalore: {
        name: "Bengaluru",
        title: "The Garden City & Tech Capital",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
        about: "Bengaluru (Bangalore), the Silicon Valley of India, is a lively blend of technology, culture, nightlife, nature, and food. Known for its pleasant weather, lakes, gardens, cafés, pubs, and youthful vibe, Bengaluru is one of India’s most modern yet culturally rooted cities.",
        bestTime: [
            { season: "October to February", desc: "Best weather, cool and pleasant." },
            { season: "March to May", desc: "Warm but manageable compared to other cities." },
            { season: "June to September", desc: "Monsoon showers bring greenery." },
            { season: "Events", desc: "Bangalore Literature Festival, Karaga Festival." }
        ],
        attractions: [
            {
                name: "Lalbagh Botanical Garden",
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 7 PM",
                entry: "₹30",
                duration: "1–2 hrs",
                desc: "Famous for the Glass House, rare plants, and walking trails."
            },
            {
                name: "Cubbon Park",
                image: "https://images.unsplash.com/photo-1595842823678-01925627255d?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 6 PM (Closed Mon)",
                entry: "Free",
                duration: "1–2 hrs",
                desc: "Green heart of the city, ideal for morning walks and cycling."
            },
            {
                name: "Bangalore Palace",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM",
                entry: "₹240 (Indian)",
                duration: "1–1.5 hrs",
                desc: "Tudor-style palace with royal interiors."
            },
            {
                name: "Vidhana Soudha",
                image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800&auto=format&fit=crop",
                timings: "View from outside",
                entry: "Restricted",
                duration: "30 mins",
                desc: "Iconic government building, best for evening photography."
            },
            {
                name: "UB City",
                image: "https://images.unsplash.com/photo-1582913130063-48538569b4e3?q=80&w=800&auto=format&fit=crop",
                timings: "10:30 AM – 11 PM",
                entry: "Free",
                duration: "Flexible",
                desc: "Luxury mall with fine dining and nightlife."
            },
            {
                name: "ISKCON Temple",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "4:30 AM – 8 PM",
                entry: "Free",
                duration: "45 mins",
                desc: "Magnificent temple dedicated to Lord Krishna."
            },
            {
                name: "Bannerghatta Biological Park",
                image: "https://images.unsplash.com/photo-1588096344321-2168f1c0d6b7?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 5 PM (Tue Closed)",
                entry: "₹100–₹300",
                duration: "Half-day",
                desc: "Wildlife safari, zoo, and butterfly park."
            },
            {
                name: "HAL Aerospace Museum",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM",
                entry: "₹50",
                duration: "1–1.5 hrs",
                desc: "India’s first aerospace museum with aircraft exhibits."
            },
            {
                name: "Nandi Hills",
                image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
                timings: "6 AM – 6 PM",
                entry: "₹20",
                duration: "Half-day trip",
                desc: "Hill fortress 60 km from city, best for sunrise."
            },
            {
                name: "MG Road & Brigade Road",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 11 PM",
                entry: "Free",
                duration: "Flexible",
                desc: "Hub for shopping, cafés, and pubs."
            }
        ],
        hiddenGems: ["Church Street", "Sankey Tank", "Turahalli Forest", "Commercial Street", "Art Galleries (Indiranagar)", "Brahmin’s Coffee Bar"],
        food: [
            { area: "Vidyarthi Bhavan", spots: "Masala Dosa" },
            { area: "MTR (Mavalli Tiffin Rooms)", spots: "Rava Idli & Coffee" },
            { area: "CTR (Shivajinagar)", spots: "Benne Dosa" },
            { area: "Truffles", spots: "Burgers" },
            { area: "Toit", spots: "Craft Beer & Food" }
        ],
        markets: ["Commercial Street", "Brigade Road", "Chickpet", "Malleshwaram"],
        nightlife: ["Indiranagar Breweries", "Koramangala Pubs", "MG Road", "Church Street"],
        itineraries: {
            day1: "Lalbagh → Bangalore Palace → MG Road → UB City → Church Street",
            day2: "Lalbagh → Vidhana Soudha → Commercial Street → Indiranagar",
            day3: "Bannerghatta Safari → ISKCON Temple → Brigade Road"
        },
        transport: {
            metro: "Efficient network (Namma Metro)",
            cabs: [
                { type: "Auto-rickshaw", cost: "Meter/Negotiable" },
                { type: "Ola/Uber", cost: "₹80–₹250" },
                { type: "Airport Taxi", cost: "₹700–₹1200" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1400/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹4000–₹9000/day" }
        ],
        stay: ["MG Road", "Indiranagar", "Koramangala", "Whitefield", "Jayanagar"],
        safety: [
            "Bengaluru is safe but traffic-heavy—plan travel time",
            "Avoid remote areas late at night",
            "Weather changes quickly—carry a light jacket",
            "Watch for surge pricing on taxis",
            "Weekends get crowded at pubs—book early"
        ]
    },
    chennai: {
        name: "Chennai",
        title: "The Gateway to South India",
        image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=1000&auto=format&fit=crop",
        about: "Chennai, the capital of Tamil Nadu, is a beautiful blend of beaches, temples, culture, classical music, film industry, and modern city life. Known for its coastal charm, rich traditions, delicious South Indian food, and warm local hospitality, Chennai is one of India’s most diverse and culturally rooted metros.",
        bestTime: [
            { season: "November to February", desc: "Best weather, pleasant and cool." },
            { season: "March to June", desc: "Hot and humid, best to avoid." },
            { season: "July to October", desc: "Monsoon rains bring relief." },
            { season: "Festivals", desc: "Pongal, Chennai Music Season (Dec–Jan)." }
        ],
        attractions: [
            {
                name: "Marina Beach",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "1–1.5 hrs",
                desc: "World’s second-longest urban beach, best for sunrise and sunset."
            },
            {
                name: "Kapaleeshwarar Temple",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 12:30 PM, 4 PM – 8 PM",
                entry: "Free",
                duration: "45 mins",
                desc: "Ancient Dravidian temple dedicated to Lord Shiva in Mylapore."
            },
            {
                name: "Santhome Cathedral",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
                timings: "6 AM – 9 PM",
                entry: "Free",
                duration: "30 mins",
                desc: "Historic seaside church built by the Portuguese."
            },
            {
                name: "Fort St. George",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5 PM (Fri Closed)",
                entry: "₹15 (Museum)",
                duration: "1 hr",
                desc: "First English fortress in India, housing a museum."
            },
            {
                name: "Government Museum (Egmore)",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 5 PM (Fri Closed)",
                entry: "₹15",
                duration: "1–2 hrs",
                desc: "Known for its bronze gallery and archaeological exhibits."
            },
            {
                name: "Valluvar Kottam",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "8:30 AM – 5:30 PM",
                entry: "₹3",
                duration: "30 mins",
                desc: "Memorial dedicated to the classical Tamil poet Thiruvalluvar."
            },
            {
                name: "Guindy National Park",
                image: "https://images.unsplash.com/photo-1588096344321-2168f1c0d6b7?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5:30 PM (Tue Closed)",
                entry: "₹20",
                duration: "1–1.5 hrs",
                desc: "A protected forest area within the city limits."
            },
            {
                name: "Besant Nagar (Elliot’s Beach)",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Calm beach with cafés, ideal for evening walks."
            },
            {
                name: "Chennai Lighthouse",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 1 PM, 3 PM – 6 PM (Mon Closed)",
                entry: "₹10",
                duration: "30 mins",
                desc: "Offers panoramic views of Marina Beach and the city."
            },
            {
                name: "DakshinaChitra",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 6 PM (Tue Closed)",
                entry: "₹100",
                duration: "2 hrs",
                desc: "Living history museum showcasing South Indian heritage."
            }
        ],
        hiddenGems: ["Broken Bridge", "Theosophical Society", "Cholamandal Artists Village", "Thalankuppam Pier", "Mylapore Tank Area", "Vintage Film Theatres"],
        food: [
            { area: "Saravana Bhavan", spots: "South Indian Veg" },
            { area: "Murugan Idli Shop", spots: "Idli & Jigarthanda" },
            { area: "Ratna Café", spots: "Sambar Idli" },
            { area: "Buhari", spots: "Chicken 65" },
            { area: "Sundari Akka Kadai", spots: "Seafood" }
        ],
        markets: ["T. Nagar", "Pondy Bazaar", "Sowcarpet", "Phoenix Marketcity"],
        nightlife: ["Nungambakkam", "T. Nagar Rooftops", "ECR Clubs", "Velachery Pubs"],
        itineraries: {
            day1: "Kapaleeshwarar Temple → Santhome Cathedral → Marina Beach → Lighthouse → Food trail",
            day2: "Marina Beach → Government Museum → Mylapore → Besant Nagar",
            day3: "DakshinaChitra → ECR drive → Beach cafés"
        },
        transport: {
            metro: "Modern & Fast",
            cabs: [
                { type: "Auto-rickshaw", cost: "Meter/Negotiable" },
                { type: "Ola/Uber", cost: "₹80–₹220" },
                { type: "Bus", cost: "Very Affordable" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹700–₹1300/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹4000–₹8000/day" }
        ],
        stay: ["Mylapore", "T. Nagar", "Nungambakkam", "ECR", "Guindy"],
        safety: [
            "Chennai is safe but avoid isolated beaches at night",
            "Hydrate well—humidity is high",
            "Respect temple dress codes",
            "Traffic-heavy areas—use pedestrian crossings",
        ]
    },
    kolkata: {
        name: "Kolkata",
        title: "The City of Joy",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
        about: "Kolkata, the cultural capital of India, is known for its colonial architecture, art, literature, festivals, football passion, trams, street food, and warm Bengali hospitality. It is a city of creativity and intellect, offering a blend of heritage charm, modern cafes, vibrant street life, and deep-rooted traditions.",
        bestTime: [
            { season: "October to March", desc: "Best weather, pleasant and cool." },
            { season: "April to June", desc: "Hot and humid." },
            { season: "July to September", desc: "Monsoon season." },
            { season: "Festivals", desc: "Durga Puja, Kali Puja, Christmas at Park Street." }
        ],
        attractions: [
            {
                name: "Victoria Memorial",
                image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM",
                entry: "₹30",
                duration: "1–2 hrs",
                desc: "Iconic marble monument surrounded by lush gardens."
            },
            {
                name: "Howrah Bridge",
                image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Symbol of Kolkata, connecting Howrah and Kolkata city."
            },
            {
                name: "Dakshineswar Kali Temple",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "5 AM – 10:30 PM",
                entry: "Free",
                duration: "1–1.5 hrs",
                desc: "Sacred riverside temple dedicated to goddess Kali."
            },
            {
                name: "Belur Math",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "Open daily",
                entry: "Free",
                duration: "1 hr",
                desc: "Peaceful spiritual center founded by Swami Vivekananda."
            },
            {
                name: "Park Street",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Famous for restaurants, nightlife, and Christmas celebrations."
            },
            {
                name: "Indian Museum",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM",
                entry: "₹50",
                duration: "1–2 hrs",
                desc: "Oldest and largest museum in India."
            },
            {
                name: "St. Paul’s Cathedral",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 6 PM",
                entry: "Free",
                duration: "20–30 mins",
                desc: "Neo-gothic architecture."
            },
            {
                name: "College Street",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 8 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "Asia’s largest book market. Don’t miss Coffee House."
            },
            {
                name: "Eco Park (New Town)",
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=800&auto=format&fit=crop",
                timings: "12 PM – 7:30 PM",
                entry: "₹30",
                duration: "2–3 hrs",
                desc: "Activities, gardens, boating."
            },
            {
                name: "Science City",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 8 PM",
                entry: "₹60",
                duration: "1–2 hrs",
                desc: "Popular with families."
            }
        ],
        hiddenGems: ["Kumartuli", "Prinsep Ghat", "Tiretta Bazaar", "Bow Barracks", "Rabindra Sarobar Lake", "Gariahat", "Sovabazar Rajbari"],
        food: [
            { area: "Arsalan", spots: "Biryani" },
            { area: "6 Ballygunge Place", spots: "Bengali Thali" },
            { area: "Peter Cat", spots: "Chelo Kebab" },
            { area: "Mocambo", spots: "Continental" },
            { area: "Flurys", spots: "Bakery & Tea" }
        ],
        markets: ["New Market", "Gariahat", "Hatibagan", "Quest Mall"],
        nightlife: ["Park Street", "Sector 5 (Salt Lake)", "New Town Clubs", "Rooftop Lounges"],
        itineraries: {
            day1: "Victoria Memorial → St. Paul’s Cathedral → Park Street → Howrah Bridge → Prinsep Ghat sunset",
            day2: "Indian Museum → Esplanade → College Street → Coffee House",
            day3: "Dakshineswar Temple → Belur Math → River cruise → Eco Park"
        },
        transport: {
            metro: "Fastest option",
            cabs: [
                { type: "Yellow Taxi", cost: "Meter/Negotiated" },
                { type: "Ola/Uber", cost: "₹80–₹200" },
                { type: "Tram", cost: "Heritage Ride" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹700–₹1200/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹4000–₹8000/day" }
        ],
        stay: ["Park Street", "Esplanade", "New Town", "Salt Lake", "Howrah"],
        safety: [
            "Kolkata is safe but avoid empty lanes late night",
            "Beware of pickpockets in crowded markets",
            "Hydrate during humid weather",
            "Negotiate taxi fares if meter is not used",
            "During festivals, expect large crowds"
        ]
    },
    hyderabad: {
        name: "Hyderabad",
        title: "The City of Pearls & Nawabi Heritage",
        image: "https://images.unsplash.com/photo-1574108236743-40e53e6e3c5c?q=80&w=1000&auto=format&fit=crop",
        about: "Hyderabad is a royal blend of Nizami culture, tech innovation, historic monuments, and world-famous biryani. Known for Charminar, grand palaces, lakes, bazaars, and modern IT hubs, Hyderabad offers a mix of tradition and modernity.",
        bestTime: [
            { season: "October to February", desc: "Ideal weather, pleasant for sightseeing." },
            { season: "March to June", desc: "Hot summer, best to avoid." },
            { season: "July to September", desc: "Monsoon season." },
            { season: "Festivals", desc: "Ramzan, Bonalu, Diwali." }
        ],
        attractions: [
            {
                name: "Charminar",
                image: "https://images.unsplash.com/photo-1574108236743-40e53e6e3c5c?q=80&w=800&auto=format&fit=crop",
                timings: "9:30 AM – 5:30 PM",
                entry: "₹25",
                duration: "30–45 mins",
                desc: "Historic Nizami monument and symbol of Hyderabad."
            },
            {
                name: "Golconda Fort",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5:30 PM",
                entry: "₹25",
                duration: "2–3 hrs",
                desc: "Historic fortress known for its acoustics and light & sound show."
            },
            {
                name: "Hussain Sagar Lake",
                image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d64?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 10 PM",
                entry: "Free (Boating charges apply)",
                duration: "1 hr",
                desc: "Heart-shaped lake with a large Buddha statue."
            },
            {
                name: "Ramoji Film City",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "9 AM – 5:30 PM",
                entry: "₹1150+",
                duration: "Full day",
                desc: "World’s largest integrated film city complex."
            },
            {
                name: "Chowmahalla Palace",
                image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM (Fri Closed)",
                entry: "₹80",
                duration: "1 hr",
                desc: "Magnificent palace of the Nizams."
            },
            {
                name: "Salar Jung Museum",
                image: "https://images.unsplash.com/photo-1565017992-026857643b49?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 5 PM (Fri Closed)",
                entry: "₹20",
                duration: "1–2 hrs",
                desc: "One of the largest museums with a unique collection of art and antiques."
            },
            {
                name: "Laad Bazaar",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "11 AM – 11 PM",
                entry: "Free",
                duration: "Flexible",
                desc: "Famous for bangles, pearls, and traditional handicrafts."
            },
            {
                name: "Birla Mandir",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 12 PM, 3 PM – 9 PM",
                entry: "Free",
                duration: "45 mins",
                desc: "White marble temple offering panoramic views of the city."
            },
            {
                name: "Necklace Road",
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Scenic stretch along Hussain Sagar Lake with cafés and parks."
            },
            {
                name: "Shilparamam",
                image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=800&auto=format&fit=crop",
                timings: "10:30 AM – 8 PM",
                entry: "₹40",
                duration: "2 hrs",
                desc: "Arts, crafts, and cultural village."
            }
        ],
        hiddenGems: ["Taramati Baradari", "Paigah Tombs", "Khajaguda Hills", "Secret Lake (Durgam Cheruvu)", "Opera House Cafés"],
        food: [
            { area: "Paradise", spots: "Hyderabadi Biryani" },
            { area: "Bawarchi", spots: "Biryani" },
            { area: "Shah Ghouse", spots: "Haleem & Biryani" },
            { area: "Nimrah Café", spots: "Irani Chai & Osmania Biscuits" },
            { area: "Chutneys", spots: "South Indian" }
        ],
        markets: ["Laad Bazaar", "Charminar Market", "Begum Bazaar", "GVK One Mall"],
        nightlife: ["Banjara Hills", "Jubilee Hills", "Hitec City", "Gachibowli"],
        itineraries: {
            day1: "Charminar → Chowmahalla Palace → Laad Bazaar → Hussain Sagar Lake",
            day2: "Golconda Fort → Qutb Shahi Tombs → Ramoji Film City (if time permits)",
            day3: "Shilparamam → Banjara Hills cafés → Shopping"
        },
        transport: {
            metro: "Expanding fast",
            cabs: [
                { type: "Auto-rickshaw", cost: "Negotiable" },
                { type: "Ola/Uber", cost: "₹80–₹150" },
                { type: "Airport Taxi", cost: "₹500–₹900" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1400/day" },
            { type: "Mid", cost: "₹1500–₹3000/day" },
            { type: "High", cost: "₹3500–₹8000/day" }
        ],
        stay: ["Banjara Hills", "Hitec City", "Gachibowli", "Abids"],
        safety: [
            "Old city gets crowded—secure belongings",
            "Traffic is heavy—plan buffer time",
            "Women: stick to known areas at night",
            "Hydrate well during summer months"
        ]
    },
    rishikesh: {
        name: "Rishikesh",
        title: "Yoga Capital of the World",
        image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=1000&auto=format&fit=crop",
        about: "Rishikesh is a spiritual and adventure destination located beside the Ganges River and the foothills of the Himalayas. Known for yoga, temples, river rafting, serene ashrams, and stunning sunsets, it attracts backpackers, wellness travelers, and adventure lovers.",
        bestTime: [
            { season: "October to March", desc: "Best for travel, pleasant weather." },
            { season: "April to June", desc: "Warm, good for rafting." },
            { season: "July to September", desc: "Monsoon (rafting closed)." },
            { season: "Events", desc: "International Yoga Festival (March)." }
        ],
        attractions: [
            {
                name: "Laxman Jhula",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Iconic suspension bridge across the Ganges."
            },
            {
                name: "Ram Jhula",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Another suspension bridge connecting ashram areas."
            },
            {
                name: "Triveni Ghat",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7 (Aarti at sunset)",
                entry: "Free",
                duration: "1 hr",
                desc: "Sacred ghat famous for the evening Ganga Aarti."
            },
            {
                name: "Beatles Ashram",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 4 PM",
                entry: "₹150 (Indian)",
                duration: "1–2 hrs",
                desc: "Abandoned ashram with street art and meditation zones."
            },
            {
                name: "Neelkanth Mahadev Temple",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "5 AM – 8 PM",
                entry: "Free",
                duration: "2–3 hrs",
                desc: "Sacred Shiva temple located in a forest valley."
            },
            {
                name: "Parmarth Niketan",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open daily",
                entry: "Free",
                duration: "1 hr",
                desc: "Largest ashram in Rishikesh, known for yoga and spiritual programs."
            },
            {
                name: "Shiva Statue at Parmarth",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Iconic statue on the banks of the Ganges."
            },
            {
                name: "Neer Garh Waterfall",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 6 PM",
                entry: "₹30",
                duration: "2 hrs",
                desc: "Scenic waterfall accessible via a short trek."
            }
        ],
        hiddenGems: ["Goa Beach (Riverbank)", "Secret Waterfalls (Tapovan)", "Kathputli Artists", "Cliff-jumping Spots"],
        food: [
            { area: "Beatles Café", spots: "Vegan & Continental" },
            { area: "Ganga View Café", spots: "River View Dining" },
            { area: "Pure Soul Café", spots: "Organic Food" },
            { area: "Little Buddha Café", spots: "Pizza & Momos" },
            { area: "Local Stalls", spots: "Aloo Puri & Kachori" }
        ],
        markets: ["Laxman Jhula Market", "Ram Jhula Market", "Main Market"],
        nightlife: ["Ganga Aarti", "Café Hopping", "Night Walks"],
        itineraries: {
            day1: "Laxman Jhula → Beatles Ashram → Ganga Aarti at Triveni Ghat",
            day2: "River Rafting → Tapovan Cafés → Neer Garh Waterfall",
            day3: "Camping → Neelkanth Mahadev Temple → Yoga Session"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Auto-rickshaw", cost: "Common" },
                { type: "Rental Scooter", cost: "₹300–₹500/day" },
                { type: "Taxi", cost: "For Temple Trips" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹600–₹1000/day" },
            { type: "Mid", cost: "₹1200–₹2500/day" },
            { type: "High", cost: "₹3000–₹6000/day" }
        ],
        stay: ["Tapovan", "Laxman Jhula", "Ram Jhula", "Near Ganga Ghats"],
        safety: [
            "Do not swim in strong river currents",
            "Rafting during authorized seasons only",
            "Avoid isolated areas at night",
            "Respect ashram rules"
        ]
    },
    manali: {
        name: "Manali",
        title: "The Himalayan Adventure Hub",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
        about: "Manali is a stunning hill station located in Himachal Pradesh. Known for mountains, rivers, snowfall, adventure sports, and beautiful valleys, Manali is perfect for families, honeymooners, and backpackers.",
        bestTime: [
            { season: "October to February", desc: "Snow season, winter sports." },
            { season: "March to June", desc: "Peak travel season, pleasant weather." },
            { season: "July to September", desc: "Monsoon season (landslide risk)." }
        ],
        attractions: [
            {
                name: "Solang Valley",
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free (Activities chargeable)",
                duration: "Half-day",
                desc: "Hub for paragliding, ATV rides, and snow activities."
            },
            {
                name: "Rohtang Pass",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "Day trip (Permit required)",
                entry: "Permit fee applies",
                duration: "Full day",
                desc: "Famous for snow, glaciers, and breathtaking mountain views."
            },
            {
                name: "Old Manali",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "Flexible",
                desc: "Known for its cafés, nightlife, and peaceful stays."
            },
            {
                name: "Hadimba Temple",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 6 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "Ancient wooden temple surrounded by a cedar forest."
            },
            {
                name: "Mall Road",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "10 AM – 10 PM",
                entry: "Free",
                duration: "Flexible",
                desc: "The main street for shopping, food, and local market."
            },
            {
                name: "Atal Tunnel",
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "2–3 hrs",
                desc: "Engineering marvel connecting Manali to Lahaul valley."
            },
            {
                name: "Jogini Waterfall",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Daytime",
                entry: "Free",
                duration: "2–3 hrs",
                desc: "Scenic waterfall accessible via a short trek."
            },
            {
                name: "Vashisht Hot Springs",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 9 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "Natural hot water pools with medicinal properties."
            }
        ],
        hiddenGems: ["Sethan Igloo Village (Winter)", "Hampta Pass View Spots", "Jana Waterfall", "Manali Gompa"],
        food: [
            { area: "Café 1947", spots: "Italian & Music" },
            { area: "Drifter’s Café", spots: "Breakfast & Views" },
            { area: "Johnson’s Café", spots: "Trout Fish" },
            { area: "Old Manali", spots: "Cafés & Bakeries" },
            { area: "Local Stalls", spots: "Siddu & Momos" }
        ],
        markets: ["Mall Road", "Old Manali Market", "Tibetan Market"],
        nightlife: ["Old Manali Cafés", "Mall Road Strolls", "Live Music Venues"],
        itineraries: {
            day1: "Solang Valley → Mall Road shopping & dinner",
            day2: "Rohtang Pass (if open) → Old Manali cafés",
            day3: "Atal Tunnel → Sissu → Jogini Waterfall trek"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Taxi", cost: "Main Transport" },
                { type: "Bike Rental", cost: "₹800–₹1200/day" },
                { type: "Walking", cost: "Best in Old Manali" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹800–₹1500/day" },
            { type: "Mid", cost: "₹1800–₹3500/day" },
            { type: "High", cost: "₹4000–₹8000/day" }
        ],
        stay: ["Old Manali", "Mall Road", "Vashisht", "Aleo"],
        safety: [
            "Winter roads can be slippery",
            "Altitude sickness near Rohtang",
            "Avoid trekking alone",
            "Book licensed snow activity operators"
        ]
    },
    "leh-ladakh": {
        name: "Leh-Ladakh",
        title: "India’s Ultimate Mountain Destination",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop",
        about: "Leh–Ladakh is India’s most dramatic high-altitude region, famous for its barren mountains, blue lakes, monasteries, road trips, and adventure. Known as the “Land of High Passes,” it offers unmatched landscapes and thrilling travel routes.",
        bestTime: [
            { season: "May to September", desc: "Best season, all routes open." },
            { season: "October to April", desc: "Harsh winter, many routes closed." },
            { season: "Festivals", desc: "Hemis Festival, Losar." }
        ],
        attractions: [
            {
                name: "Pangong Lake",
                image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Permit required",
                duration: "Full day or overnight",
                desc: "Iconic blue lake famous for its changing colors."
            },
            {
                name: "Nubra Valley",
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Permit required",
                duration: "2 days",
                desc: "Known for sand dunes, double-humped camels, and cold desert."
            },
            {
                name: "Khardung La Pass",
                image: "https://images.unsplash.com/photo-1605627079368-f93d5418836c?q=80&w=800&auto=format&fit=crop",
                timings: "Daytime",
                entry: "Permit required",
                duration: "1 hr",
                desc: "One of the world’s highest motorable passes."
            },
            {
                name: "Shanti Stupa",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "5 AM – 9 PM",
                entry: "Free",
                duration: "1 hr",
                desc: "White-domed stupa offering panoramic views of Leh."
            },
            {
                name: "Leh Palace",
                image: "https://images.unsplash.com/photo-1582510003544-5243789972d1?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 4 PM",
                entry: "₹15",
                duration: "1 hr",
                desc: "Historic 9-storey palace overlooking the town."
            },
            {
                name: "Magnetic Hill",
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Free",
                duration: "30 mins",
                desc: "Gravity-defying hill where vehicles appear to roll uphill."
            },
            {
                name: "Sangam",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "Daytime",
                entry: "Free",
                duration: "30 mins",
                desc: "Confluence of the Indus and Zanskar rivers."
            },
            {
                name: "Hemis Monastery",
                image: "https://images.unsplash.com/photo-1596021688661-338155931f84?q=80&w=800&auto=format&fit=crop",
                timings: "8 AM – 1 PM, 2 PM – 6 PM",
                entry: "₹50",
                duration: "1–2 hrs",
                desc: "The largest and richest monastery in Ladakh."
            },
            {
                name: "Tso Moriri Lake",
                image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop",
                timings: "Open 24x7",
                entry: "Permit required",
                duration: "Full day",
                desc: "Remote high-altitude lake known for its serenity."
            },
            {
                name: "Diskit Monastery",
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
                timings: "7 AM – 1 PM, 2 PM – 7 PM",
                entry: "₹30",
                duration: "1 hr",
                desc: "Oldest monastery in Nubra Valley with a massive Buddha statue."
            }
        ],
        hiddenGems: ["Turtuk Village (Baltic Culture)", "Hanle (Dark Sky Reserve)", "Zanskar Valley", "Chuchot Village Biking Trails"],
        food: [
            { area: "Leh Market", spots: "Thukpa & Momos" },
            { area: "Changspa", spots: "Cafés & Bakeries" },
            { area: "Alchi Kitchen", spots: "Traditional Ladakhi Food" },
            { area: "Tibetan Kitchen", spots: "Shabhaley & Tingmo" },
            { area: "Local Homes", spots: "Butter Tea & Skyu" }
        ],
        markets: ["Leh Main Market", "Moti Market", "Tibetan Market"],
        nightlife: ["Stargazing", "Bonfires", "Leh Market Cafés"],
        itineraries: {
            day1: "Leh Palace → Shanti Stupa → Sangam (Acclimatization)",
            day2: "Nubra Valley via Khardung La → Hunder Sand Dunes",
            day3: "Pangong Lake → Return to Leh"
        },
        transport: {
            metro: "Not available",
            cabs: [
                { type: "Taxi", cost: "Expensive but reliable" },
                { type: "Bike Rental", cost: "₹1200–₹2000/day" },
                { type: "Shared Taxi", cost: "Budget Option" }
            ]
        },
        budget: [
            { type: "Low", cost: "₹1200–₹2000/day" },
            { type: "Mid", cost: "₹2500–₹4500/day" },
            { type: "High", cost: "₹5000–₹10,000/day" }
        ],
        stay: ["Leh Market", "Changspa", "Nubra (Hunder & Diskit)", "Pangong (Camps)"],
        safety: [
            "Acclimatize for 24 hours before sightseeing",
            "Stay hydrated",
            "Avoid heavy meals first day",
            "Carry AMS medication",
            "Winter roads can be dangerous",
            "Oxygen levels are low—don’t overexert"
        ]
    }
};

const CityPage = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const city = cityId ? cityData[cityId.toLowerCase() as keyof typeof cityData] : null;

    if (!city) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center pt-24">
                    <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
                    <Button asChild>
                        <Link to="/guide">Back to Guides</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <div className="relative h-[70vh] w-full overflow-hidden">
                    <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                        >
                            {city.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-3xl text-gray-200 max-w-3xl font-light leading-relaxed"
                        >
                            {city.title}
                        </motion.p>
                    </div>
                </div>

                <div className="container px-4 md:px-8 py-12 max-w-7xl mx-auto">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
                        <Link to="/guide" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Guides
                        </Link>
                    </Button>

                    {/* About & Best Time */}
                    <div className="grid lg:grid-cols-3 gap-12 mb-24">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-6">About {city.name}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {city.about}
                            </p>

                            <h3 className="text-2xl font-bold mb-4">Best Time to Visit</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {city.bestTime.map((time, index) => (
                                    <div key={index} className="bg-muted/30 p-4 rounded-xl border border-border/50">
                                        <p className="font-semibold text-primary mb-1">{time.season}</p>
                                        <p className="text-sm text-muted-foreground">{time.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-primary" /> Budget (Per Day)
                                </h3>
                                <div className="space-y-3">
                                    {city.budget.map((b, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{b.type}</span>
                                            <span className="font-medium">{b.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-500" /> Safety Tips
                                </h3>
                                <ul className="space-y-2">
                                    {city.safety.map((tip, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Top Attractions */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-terracotta/10 p-3 rounded-xl text-terracotta">
                                <MapPin className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-bold">Top Attractions</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {city.attractions.map((spot, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group rounded-2xl overflow-hidden border border-border/50 bg-card hover:shadow-xl transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={spot.image}
                                            alt={spot.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-none">
                                                {spot.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{spot.name}</h3>
                                        <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-grow">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" /> {spot.timings}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Wallet className="h-4 w-4" /> {spot.entry}
                                            </div>
                                            {spot.desc && (
                                                <div className="flex items-start gap-2 mt-2">
                                                    <Info className="h-4 w-4 mt-0.5" /> {spot.desc}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Talk to Kira CTA */}
                    <section className="mb-24 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-white/10 p-8 md:p-12 text-center">
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                            <div className="bg-background/50 backdrop-blur-md p-4 rounded-full mb-6 shadow-lg border border-white/20">
                                <Bot className="h-10 w-10 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Confused? Talk to Kira</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Overwhelmed by choices? Let our AI travel companion help you plan the perfect trip tailored to your preferences, budget, and pace.
                            </p>
                            <Button size="lg" className="rounded-full px-8 text-lg h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20" asChild>
                                <Link to="/trip">
                                    Chat with Kira <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Itineraries */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500">
                                <Calendar className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-bold">Itineraries</h2>
                        </div>

                        <Tabs defaultValue="day1" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                <TabsTrigger value="day1">1 Day</TabsTrigger>
                                <TabsTrigger value="day2">2 Days</TabsTrigger>
                                <TabsTrigger value="day3">3 Days</TabsTrigger>
                            </TabsList>
                            <TabsContent value="day1" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">The Essentials</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day1}</p>
                            </TabsContent>
                            <TabsContent value="day2" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Culture & Heritage Deep Dive</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day2}</p>
                            </TabsContent>
                            <TabsContent value="day3" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Complete Experience</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day3}</p>
                            </TabsContent>
                        </Tabs>
                    </section>

                    {/* Food, Markets & Nightlife Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {/* Food */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-600">
                                    <Utensils className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Food & Local Eats</h3>
                            </div>
                            <div className="space-y-4">
                                {city.food.map((item, i) => (
                                    <div key={i} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                                        <p className="font-semibold">{item.area}</p>
                                        <p className="text-sm text-muted-foreground">{item.spots}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Markets */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-pink-500/10 p-2 rounded-lg text-pink-600">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Shopping Markets</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.markets.map((market, i) => (
                                    <Badge key={i} variant="outline" className="text-base py-1 px-3">
                                        {market}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Nightlife */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-600">
                                    <Moon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Nightlife</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.nightlife.map((spot, i) => (
                                    <Badge key={i} variant="secondary" className="text-base py-1 px-3">
                                        {spot}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Hidden Gems */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-600">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Hidden Gems</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.hiddenGems.map((gem, i) => (
                                    <Badge key={i} variant="outline" className="text-base py-1 px-3 border-indigo-200 text-indigo-700 bg-indigo-50/50">
                                        {gem}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Transport & Stay */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-8">Practical Information</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Train className="h-5 w-5 text-primary" /> Transport
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold mb-1">Metro</p>
                                        <p className="text-sm text-muted-foreground">Fare: {city.transport.metro}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Cabs (Ola/Uber)</p>
                                        <div className="space-y-2">
                                            {city.transport.cabs.map((cab, i) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">{cab.type}</span>
                                                    <span className="font-medium">{cab.cost}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" /> Best Areas to Stay
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {city.stay.map((area, i) => (
                                        <div key={i} className="bg-background px-4 py-2 rounded-lg border border-border shadow-sm">
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CityPage;
