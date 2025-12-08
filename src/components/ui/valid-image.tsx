import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ValidImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
    fallbackSrc?: string;
    showIcon?: boolean;
}

export const ValidImage = ({
    src,
    alt,
    fallbackText,
    fallbackSrc,
    className,
    showIcon = true,
    ...props
}: ValidImageProps) => {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        // Check for placeholder patterns in the URL
        const isPlaceholder = src?.toLowerCase().includes('placeholder');

        if (isPlaceholder && alt) {
            // Automatically switch to Unsplash search for placeholders
            setImgSrc(`https://source.unsplash.com/featured/?${encodeURIComponent(alt)}`);
            setError(false);
        } else {
            setImgSrc(src);
            setError(false);
        }
    }, [src, alt]);

    const handleError = () => {
        // If the current image failed and it wasn't already a smart fallback
        if (!imgSrc?.includes('source.unsplash.com') && alt) {
            // Try smart fallback with Unsplash
            setImgSrc(`https://source.unsplash.com/featured/?${encodeURIComponent(alt)}`);
        }
        // If we already tried smart fallback (or don't have alt), try explicit fallbackSrc
        else if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
        // If everything failed
        else {
            setError(true);
        }
    };

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center bg-muted/50 text-muted-foreground ${className}`}>
                {showIcon && <ImageOff className="w-6 h-6 mb-2 opacity-40" />}
                <span className="text-xs text-center font-medium opacity-60 px-2 line-clamp-2">{fallbackText || alt || "Image unavailable"}</span>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
};
