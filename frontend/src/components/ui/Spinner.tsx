"use client";

// Simple loading spinner used across list, form, and delete actions
export default function Spinner({ label = "Loading..." }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-500">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <p className="text-sm">{label}</p>
        </div>
    );
}