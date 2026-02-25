/**
 * useNavigation — Level 1 Live Navigation hook.
 *
 * Manages browser geolocation, maneuver tracking,
 * current-step determination, and off-route detection.
 *
 * No voice, no rerouting, no map coupling — pure state.
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────

export interface GpsPosition {
    lat: number;
    lng: number;
    heading: number | null;
    speed: number | null; // m/s
    accuracy: number;
}

export interface Maneuver {
    type: string;
    modifier: string;
    location: [number, number]; // [lat, lng] for Leaflet
    distance: number;          // metres to cover this step
    name: string;
    instruction: string;       // human-readable
}

export interface NavigationState {
    active: boolean;
    position: GpsPosition | null;
    maneuvers: Maneuver[];
    currentStepIndex: number;
    distanceToNextManeuver: number | null; // metres
    currentInstruction: string;
    isOffRoute: boolean;
    gpsError: string | null;
    autoCenterEnabled: boolean;
}

// ─── Helpers ─────────────────────────────────────────────

/** Haversine distance (metres) between two lat/lng points. */
function haversineMetres(
    lat1: number, lng1: number,
    lat2: number, lng2: number,
): number {
    const R = 6_371_000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Format a maneuver into a human-readable instruction. */
function formatInstruction(type: string, modifier: string, name: string, distM: number): string {
    const dist = distM >= 1000
        ? `${(distM / 1000).toFixed(1)} km`
        : `${Math.round(distM)} m`;

    const modText = modifier ? modifier.replace(/-/g, " ") : "";

    switch (type) {
        case "turn":
            return `Turn ${modText} onto ${name || "unnamed road"} in ${dist}`;
        case "new name":
            return `Continue onto ${name || "unnamed road"} for ${dist}`;
        case "depart":
            return `Head ${modText} on ${name || "unnamed road"}`;
        case "arrive":
            return `Arrive at destination in ${dist}`;
        case "merge":
            return `Merge ${modText} onto ${name || "road"} in ${dist}`;
        case "fork":
            return `Take the ${modText} fork in ${dist}`;
        case "roundabout":
        case "rotary":
            return `Enter roundabout, then exit ${modText} in ${dist}`;
        case "end of road":
            return `At end of road, turn ${modText} in ${dist}`;
        default:
            return `Continue ${modText ? modText + " " : ""}for ${dist}`;
    }
}

/** Minimum distance from user to ANY point in the route polyline. */
function distanceToPolyline(
    userLat: number, userLng: number,
    polyline: [number, number][], // [lat, lng][]
): number {
    let minDist = Infinity;
    for (const [lat, lng] of polyline) {
        const d = haversineMetres(userLat, userLng, lat, lng);
        if (d < minDist) minDist = d;
    }
    return minDist;
}

// ─── Constants ───────────────────────────────────────────

const STEP_THRESHOLD_M = 30;   // advance to next maneuver within 30 m
const OFF_ROUTE_THRESHOLD_M = 50;

// ─── Hook ────────────────────────────────────────────────

interface UseNavigationArgs {
    /** Route steps from OSRM: route.legs[0].steps (raw API). */
    routeSteps: any[] | null;
    /** Route polyline as [lat, lng][] for off-route check. */
    routePolyline: [number, number][] | null;
}

export function useNavigation({ routeSteps, routePolyline }: UseNavigationArgs): NavigationState & {
    startNavigation: () => void;
    stopNavigation: () => void;
    toggleAutoCenter: () => void;
} {
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState<GpsPosition | null>(null);
    const [maneuvers, setManeuvers] = useState<Maneuver[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [distanceToNextManeuver, setDistanceToNextManeuver] = useState<number | null>(null);
    const [currentInstruction, setCurrentInstruction] = useState("");
    const [isOffRoute, setIsOffRoute] = useState(false);
    const [gpsError, setGpsError] = useState<string | null>(null);
    const [autoCenterEnabled, setAutoCenterEnabled] = useState(true);

    const watchIdRef = useRef<number | null>(null);

    // ── Extract maneuvers from OSRM steps ──
    const extractManeuvers = useCallback(() => {
        if (!routeSteps || routeSteps.length === 0) return [];
        return routeSteps.map((step: any) => {
            const m = step.maneuver || {};
            const loc = m.location || [0, 0]; // OSRM gives [lng, lat]
            return {
                type: m.type || "continue",
                modifier: m.modifier || "",
                location: [loc[1], loc[0]] as [number, number], // → [lat, lng]
                distance: step.distance || 0,
                name: step.name || "",
                instruction: formatInstruction(
                    m.type || "continue",
                    m.modifier || "",
                    step.name || "",
                    step.distance || 0,
                ),
            } satisfies Maneuver;
        });
    }, [routeSteps]);

    // ── Start navigation ──
    const startNavigation = useCallback(() => {
        if (!navigator.geolocation) {
            setGpsError("Geolocation is not supported by your browser.");
            return;
        }
        if (!routeSteps || routeSteps.length === 0) {
            setGpsError("No route steps available. Plan a route first.");
            return;
        }

        const extracted = extractManeuvers();
        setManeuvers(extracted);
        setCurrentStepIndex(0);
        setIsOffRoute(false);
        setGpsError(null);
        setAutoCenterEnabled(true);

        if (extracted.length > 0) {
            setCurrentInstruction(extracted[0].instruction);
        }

        setActive(true);

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    heading: pos.coords.heading,
                    speed: pos.coords.speed,
                    accuracy: pos.coords.accuracy,
                });
                setGpsError(null);
            },
            (err) => {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setGpsError("Location permission denied. Please allow location access.");
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setGpsError("Location unavailable. Check GPS settings.");
                        break;
                    case err.TIMEOUT:
                        setGpsError("Location request timed out.");
                        break;
                    default:
                        setGpsError("Unknown location error.");
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            },
        );
    }, [routeSteps, extractManeuvers]);

    // ── Stop navigation ──
    const stopNavigation = useCallback(() => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        setActive(false);
        setPosition(null);
        setManeuvers([]);
        setCurrentStepIndex(0);
        setDistanceToNextManeuver(null);
        setCurrentInstruction("");
        setIsOffRoute(false);
        setGpsError(null);
        setAutoCenterEnabled(true);
    }, []);

    // ── Toggle auto-center ──
    const toggleAutoCenter = useCallback(() => {
        setAutoCenterEnabled((prev) => !prev);
    }, []);

    // ── Process GPS updates: step advancement + off-route ──
    useEffect(() => {
        if (!active || !position || maneuvers.length === 0) return;

        // Current step
        let stepIdx = currentStepIndex;
        if (stepIdx < maneuvers.length) {
            const nextManeuver = maneuvers[stepIdx];
            const dist = haversineMetres(
                position.lat, position.lng,
                nextManeuver.location[0], nextManeuver.location[1],
            );
            setDistanceToNextManeuver(Math.round(dist));

            // Advance if within threshold
            if (dist < STEP_THRESHOLD_M && stepIdx < maneuvers.length - 1) {
                stepIdx += 1;
                setCurrentStepIndex(stepIdx);
                setCurrentInstruction(maneuvers[stepIdx].instruction);

                // Recalculate distance for the new step
                const newDist = haversineMetres(
                    position.lat, position.lng,
                    maneuvers[stepIdx].location[0], maneuvers[stepIdx].location[1],
                );
                setDistanceToNextManeuver(Math.round(newDist));
            } else {
                // Update instruction with live distance
                const m = maneuvers[stepIdx];
                setCurrentInstruction(
                    formatInstruction(m.type, m.modifier, m.name, dist),
                );
            }
        }

        // Off-route detection
        if (routePolyline && routePolyline.length > 0) {
            const polyDist = distanceToPolyline(position.lat, position.lng, routePolyline);
            setIsOffRoute(polyDist > OFF_ROUTE_THRESHOLD_M);
        }
    }, [active, position, maneuvers, currentStepIndex, routePolyline]);

    // ── Cleanup on unmount ──
    useEffect(() => {
        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    return {
        active,
        position,
        maneuvers,
        currentStepIndex,
        distanceToNextManeuver,
        currentInstruction,
        isOffRoute,
        gpsError,
        autoCenterEnabled,
        startNavigation,
        stopNavigation,
        toggleAutoCenter,
    };
}
