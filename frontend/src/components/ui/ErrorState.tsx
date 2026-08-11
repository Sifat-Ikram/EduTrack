"use client";

import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

// Shown whenever the API fails, so the user never sees a blank screen
export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-500">
            <FiAlertTriangle size={36} />
            <p className="text-sm text-center max-w-sm">{message}</p>
            {onRetry && (
                <Button variant="secondary" onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
}