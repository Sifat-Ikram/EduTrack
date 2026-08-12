"use client";

import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    children: ReactNode;
}

export default function Select({ label, error, children, className = "", ...props }: SelectProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <select
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:outline-none focus:ring-0 ${error ? "border-red-500" : "border-gray-300"
                    } ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
    );
}