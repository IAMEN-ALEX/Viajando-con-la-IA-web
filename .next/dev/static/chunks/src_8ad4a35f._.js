(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/dashboard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButtons": "dashboard-module__XABe8G__actionButtons",
  "btnAddNote": "dashboard-module__XABe8G__btnAddNote",
  "btnCancel": "dashboard-module__XABe8G__btnCancel",
  "btnDelete": "dashboard-module__XABe8G__btnDelete",
  "btnEdit": "dashboard-module__XABe8G__btnEdit",
  "btnPrimary": "dashboard-module__XABe8G__btnPrimary",
  "btnSecondary": "dashboard-module__XABe8G__btnSecondary",
  "btnTertiary": "dashboard-module__XABe8G__btnTertiary",
  "closeBtn": "dashboard-module__XABe8G__closeBtn",
  "container": "dashboard-module__XABe8G__container",
  "dashboardBg": "dashboard-module__XABe8G__dashboardBg",
  "dateInputs": "dashboard-module__XABe8G__dateInputs",
  "floatOrb1": "dashboard-module__XABe8G__floatOrb1",
  "floatOrb2": "dashboard-module__XABe8G__floatOrb2",
  "header": "dashboard-module__XABe8G__header",
  "input": "dashboard-module__XABe8G__input",
  "inputGroup": "dashboard-module__XABe8G__inputGroup",
  "lightStreak1": "dashboard-module__XABe8G__lightStreak1",
  "lightStreak2": "dashboard-module__XABe8G__lightStreak2",
  "logoutBtn": "dashboard-module__XABe8G__logoutBtn",
  "responseBox": "dashboard-module__XABe8G__responseBox",
  "responseHeader": "dashboard-module__XABe8G__responseHeader",
  "responseText": "dashboard-module__XABe8G__responseText",
  "responseTitle": "dashboard-module__XABe8G__responseTitle",
  "section": "dashboard-module__XABe8G__section",
  "sectionTitle": "dashboard-module__XABe8G__sectionTitle",
  "shimmer": "dashboard-module__XABe8G__shimmer",
  "tripActions": "dashboard-module__XABe8G__tripActions",
  "tripCard": "dashboard-module__XABe8G__tripCard",
  "tripCardActions": "dashboard-module__XABe8G__tripCardActions",
  "tripCardHeader": "dashboard-module__XABe8G__tripCardHeader",
  "tripCardNotes": "dashboard-module__XABe8G__tripCardNotes",
  "tripDisplay": "dashboard-module__XABe8G__tripDisplay",
  "tripFormRow": "dashboard-module__XABe8G__tripFormRow",
  "tripItem": "dashboard-module__XABe8G__tripItem",
  "tripText": "dashboard-module__XABe8G__tripText",
  "usernameDisplay": "dashboard-module__XABe8G__usernameDisplay",
});
}),
"[project]/src/services/tripService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tripService",
    ()=>tripService
]);
const tripService = {
    async getTrips (userId) {
        const res = await fetch(`/api/trips?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch trips');
        const data = await res.json();
        return data.trips;
    },
    async createTrip (tripData) {
        const res = await fetch('/api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
        });
        if (!res.ok) throw new Error('Failed to create trip');
        const data = await res.json();
        return data.trip;
    },
    async deleteTrip (tripId) {
        const res = await fetch(`/api/trips/${tripId}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete trip');
    },
    async updateTrip (trip) {
        const res = await fetch(`/api/trips/${trip.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        });
        if (!res.ok) throw new Error('Failed to update trip');
        const data = await res.json();
        return data.trip;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useTrips.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTrips",
    ()=>useTrips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tripService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useTrips = ()=>{
    _s();
    const [trips, setTrips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTrips = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTrips.useCallback[fetchTrips]": async (userId)=>{
            console.log('[CLIENT_DEBUG] fetchTrips called with:', userId);
            // Try to load from cache first for instant feel
            const cached = localStorage.getItem(`cached_trips_${userId}`);
            if (cached) {
                setTrips(JSON.parse(cached));
            } else {
                setIsLoading(true);
            }
            setError(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tripService"].getTrips(userId);
                setTrips(data);
                // Update cache
                localStorage.setItem(`cached_trips_${userId}`, JSON.stringify(data));
            } catch (err) {
                setError('Error al cargar viajes');
                console.error(err);
            } finally{
                setIsLoading(false);
            }
        }
    }["useTrips.useCallback[fetchTrips]"], []);
    const addTrip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTrips.useCallback[addTrip]": async (tripData)=>{
            // Optimistic update could go here, but for now we wait for server response
            try {
                const newTrip = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tripService"].createTrip(tripData);
                setTrips({
                    "useTrips.useCallback[addTrip]": (prev)=>[
                            newTrip,
                            ...prev
                        ]
                }["useTrips.useCallback[addTrip]"]);
                return newTrip;
            } catch (err) {
                setError('Error al crear viaje');
                console.error(err);
                throw err;
            }
        }
    }["useTrips.useCallback[addTrip]"], []);
    const deleteTrip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTrips.useCallback[deleteTrip]": async (tripId)=>{
            try {
                // Optimistic update
                setTrips({
                    "useTrips.useCallback[deleteTrip]": (prev)=>prev.filter({
                            "useTrips.useCallback[deleteTrip]": (t)=>t.id !== tripId
                        }["useTrips.useCallback[deleteTrip]"])
                }["useTrips.useCallback[deleteTrip]"]);
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tripService"].deleteTrip(tripId);
            } catch (err) {
                // Rollback if needed, but for simple MVP re-fetch or alert is fine
                setError('Error al eliminar viaje');
                console.error(err);
            // Optionally fetchTrips(userId) to rollback
            }
        }
    }["useTrips.useCallback[deleteTrip]"], []);
    const updateTrip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTrips.useCallback[updateTrip]": async (updatedTrip)=>{
            try {
                setTrips({
                    "useTrips.useCallback[updateTrip]": (prev)=>prev.map({
                            "useTrips.useCallback[updateTrip]": (t)=>t.id === updatedTrip.id ? updatedTrip : t
                        }["useTrips.useCallback[updateTrip]"])
                }["useTrips.useCallback[updateTrip]"]);
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tripService"].updateTrip(updatedTrip);
            } catch (err) {
                setError('Error al actualizar viaje');
                console.error(err);
            }
        }
    }["useTrips.useCallback[updateTrip]"], []);
    return {
        trips,
        isLoading,
        error,
        fetchTrips,
        addTrip,
        deleteTrip,
        updateTrip,
        setTrips
    };
};
_s(useTrips, "ZzuvaGIdnpIwuVtXlwyIKo25DyQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/dashboard.module.css [app-client] (css module)");
// Hooks
// Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTrips.ts [app-client] (ecmascript)");
// import { useDashboardAuth } from '@/hooks/useDashboardAuth';
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const { user, logout, isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Local state for onboarding (could also be in context, but keeping local for now)
    const [showOnboarding, setShowOnboarding] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    // Effect to handle protection and onboarding check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!isLoading) {
                if (!isAuthenticated) {
                    router.replace('/');
                } else if (user) {
                    // Check if user has seen onboarding
                    // We moved this logic out of the hook, so we need to replicate or move it to context.
                    // For now, let's keep it simple: always show onboarding for demo or check storage.
                    // The previous hook said: "Always show onboarding for demo purposes as established"
                    setShowOnboarding(true);
                }
            }
        }
    }["DashboardPage.useEffect"], [
        isLoading,
        isAuthenticated,
        user,
        router
    ]);
    const handleOnboardingComplete = ()=>{
        setShowOnboarding(false);
    // if (user) localStorage.setItem(`onboarding_seen_${user.id}`, 'true'); 
    };
    // Derived values for compatibility
    const username = user?.name || '';
    const userId = user?.id || '';
    const { trips, fetchTrips, addTrip, deleteTrip, updateTrip } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrips"])();
    const [shouldLoadBg, setShouldLoadBg] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            // Delay background heavy load to prioritize interactivity
            const timer = setTimeout({
                "DashboardPage.useEffect.timer": ()=>setShouldLoadBg(true)
            }["DashboardPage.useEffect.timer"], 100);
            return ({
                "DashboardPage.useEffect": ()=>clearTimeout(timer)
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    // Fetch trips once user is identified
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (userId) {
                fetchTrips(userId);
            }
        }
    }["DashboardPage.useEffect"], [
        userId,
        fetchTrips
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardSkeleton, {}, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 71,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardBg,
        children: showOnboarding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Onboarding, {
            onComplete: handleOnboardingComplete
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 77,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                shouldLoadBg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 0,
                        pointerEvents: 'none',
                        opacity: 0,
                        animation: 'fadeInGrid 1s ease-in-out forwards',
                        contentVisibility: 'auto'
                    },
                    className: "jsx-b9ff2a175315be0e",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            id: "b9ff2a175315be0e",
                            children: "@keyframes fadeInGrid{0%{opacity:0}to{opacity:1}}"
                        }, void 0, false, void 0, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridScan, {
                            sensitivity: 0.7,
                            lineThickness: 1,
                            linesColor: "#392e4e",
                            gridScale: 0.1,
                            scanColor: "#9eecff",
                            scanOpacity: 0.7,
                            lineJitter: 0.1,
                            scanGlow: 0.5,
                            scanSoftness: 2,
                            scanDuration: 5.0,
                            scanDelay: 1.0,
                            enablePost: true,
                            bloomIntensity: 1.2,
                            chromaticAberration: 0.002,
                            noiseIntensity: 0.01,
                            enableWebcam: false,
                            showPreview: false,
                            style: {
                                width: '100%',
                                height: '100%'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 100,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 82,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.2,
                        ease: "easeOut"
                    },
                    style: {
                        position: 'relative',
                        zIndex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].lightStreak1
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 131,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].lightStreak2
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 132,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardHeader, {
                            username: username,
                            onLogout: logout
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AIQuerySection, {
                                    trips: trips
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddTripForm, {
                                    userId: userId,
                                    onTripAdded: (newTrip)=>addTrip({
                                            ...newTrip
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TripList, {
                                    trips: trips,
                                    onDeleteTrip: deleteTrip,
                                    onUpdateTrip: updateTrip
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 136,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 124,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 75,
        columnNumber: 9
    }, this);
}
_s(DashboardPage, "Wa+FGHQvxz9XPIC2jkRVZthWrqw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrips"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_8ad4a35f._.js.map