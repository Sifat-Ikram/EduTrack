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
      {/* =========================
                Desktop / Tablet Table
            ========================== */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            {/* Table Header */}
            <thead className="border-b border-slate-200 bg-slate-50/80">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.025,
                  }}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {student.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          ID #{student.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-slate-600">{student.email}</td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-slate-600">{student.phone}</td>

                  {/* Class */}
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {student.class}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={student.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/students/${student.id}/edit`)
                        }
                        className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label={`Edit ${student.name}`}
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(student)}
                        className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${student.name}`}
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
      </div>

      {/* =========================
                Mobile Cards
            ========================== */}
      <div className="flex flex-col gap-3 md:hidden">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {student.name}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {student.email}
                  </p>
                </div>
              </div>

              <StatusBadge status={student.status} />
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-slate-700">{student.phone}</p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Class
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {student.class}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => router.push(`/students/${student.id}/edit`)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FiEdit2 size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(student)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <FiTrash2 size={15} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation */}
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
