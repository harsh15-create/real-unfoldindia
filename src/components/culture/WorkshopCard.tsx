
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Hammer, IndianRupee } from "lucide-react";
import { CraftWorkshop } from "@/lib/art-api";

interface WorkshopCardProps {
    workshop: CraftWorkshop;
    title: string;
    onInquire: () => void;
}

const WorkshopCard = ({ workshop, title, onInquire }: WorkshopCardProps) => {
    return (
        <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                            Workshop
                        </h4>
                        <p className="text-sm text-gray-400">Learn the art of {title}</p>
                    </div>
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Hammer className="h-5 w-5 text-primary" />
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>Duration: {workshop.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                        <IndianRupee className="h-4 w-4 mr-2 text-primary" />
                        <span>Approx. ₹{workshop.typical_price}</span>
                    </div>
                </div>

                <Button onClick={onInquire} className="w-full bg-primary hover:bg-primary/90 text-white">
                    Inquire Availability
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    {workshop.booking_info_placeholder}
                </p>
            </CardContent>
        </Card>
    );
};

export default WorkshopCard;
