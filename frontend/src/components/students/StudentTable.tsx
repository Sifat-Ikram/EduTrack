"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Student } from "@/types/student";
import { useAppDispatch } from "@/redux/hooks";
import { deleteStudent } from "@/redux/slices/studentSlice";
import StatusBadge from "./StatusBadge";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function StudentTable({ students }: { students: Student[] }) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        await dispatch(deleteStudent(deleteTarget.id));
        setIsDeleting(false);
        setDeleteTarget(null);
    };

    return (
        <>
            {/* Table for medium+ screens */}
            <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Class</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <motion.tr
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="border-t border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                                <td className="px-4 py-3 text-gray-600">{student.email}</td>
                                <td className="px-4 py-3 text-gray-600">{student.phone}</td>
                                <td className="px-4 py-3 text-gray-600">{student.class}</td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={student.status} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => router.push(`/students/${student.id}/edit`)}
                                            className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                                            aria-label="Edit student"
                                        >
                                            <FiEdit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(student)}
                                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                            aria-label="Delete student"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for small screens */}
            <div className="flex flex-col gap-3 md:hidden">
                {students.map((student) => (
                    <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-white p-4 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                            <StatusBadge status={student.status} />
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Phone: {student.phone}</p>
                            <p>Class: {student.class}</p>
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                            <button
                                onClick={() => router.push(`/students/${student.id}/edit`)}
                                className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                            >
                                <FiEdit2 size={16} />
                            </button>
                            <button
                                onClick={() => setDeleteTarget(student)}
                                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ConfirmDialog
                isOpen={!!deleteTarget}
                title="Delete Student"
                description={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
}