"use client";

import { FiUsers } from "react-icons/fi";

export default function EmptyState({ message = "No students found." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
            <FiUsers size={40} />
            <p className="text-sm">{message}</p>
        </div>
    );
}