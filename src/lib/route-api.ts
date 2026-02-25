import { getApiUrl } from "@/config";

// ─── Types matching backend schemas ───

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface GeoJSONLineString {
    type: "LineString";
    coordinates: [number, number][]; // [lng, lat][]
}

export interface RouteStepManeuver {
    type: string;
    modifier: string;
    location: [number, number]; // [lng, lat]
}

export interface RouteStep {
    distance: number;
    duration: number;
    name: string;
    ref: string;
    maneuver: RouteStepManeuver;
}

export interface RouteInfo {
    id: string;
    name: string;
    distance_km: number;
    duration_minutes: number;
    safety_score: number;
    road_summary: string;
    traffic_level: "Low" | "Moderate" | "High";
    road_quality: "Excellent" | "Good" | "Average";
    geometry: GeoJSONLineString;
    steps: RouteStep[];
}

export interface RouteResponse {
    routes: RouteInfo[];
    origin_coords: Coordinate;
    destination_coords: Coordinate;
    status: string;
    error?: string;
}

export interface RouteError {
    detail: string;
}

// ─── Fetch routes from backend ───

export async function fetchRoutes(
    origin: string,
    destination: string,
): Promise<RouteResponse> {
    const url = getApiUrl("api/route");

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination }),
    });

    if (!response.ok) {
        const errorData: RouteError = await response.json().catch(() => ({
            detail: `Server error (${response.status})`,
        }));
        throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    const data: RouteResponse = await response.json();

    if (data.status !== "success" || !data.routes?.length) {
        throw new Error(data.error || "No routes found between these locations.");
    }

    return data;
}
