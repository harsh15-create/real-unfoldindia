
import { Loader2 } from "lucide-react";

export const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center bg-black/90">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
);
