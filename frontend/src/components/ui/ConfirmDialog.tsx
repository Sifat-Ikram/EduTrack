"use client";

import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

// Reused for delete confirmation ("Are you sure you want to delete this student?")
export default function ConfirmDialog({
    isOpen,
    title,
    description,
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{description}</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="secondary" onClick={onCancel} disabled={isLoading} className="cursor-pointer">
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={onConfirm} isLoading={isLoading} className="cursor-pointer">
                                Delete
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}