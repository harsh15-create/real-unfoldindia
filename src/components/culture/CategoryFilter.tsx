
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Category {
    id: string;
    title: string;
}

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
                variant={activeCategory === 'all' ? "default" : "outline"}
                onClick={() => onSelectCategory('all')}
                className={`rounded-full px-6 transition-all duration-300 ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'text-primary border-primary/20 hover:border-primary'}`}
            >
                All
            </Button>
            {categories.map((cat) => (
                <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`rounded-full px-6 transition-all duration-300 ${activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'text-primary border-primary/20 hover:border-primary'}`}
                >
                    {cat.title}
                </Button>
            ))}
        </div>
    );
};

export default CategoryFilter;
