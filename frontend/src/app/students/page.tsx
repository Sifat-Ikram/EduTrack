"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStudents } from "@/redux/slices/studentSlice";

import SearchFilterBar from "@/components/students/SearchFilterBar";
import StudentTable from "@/components/students/StudentTable";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";

export default function StudentsPage() {
  const dispatch = useAppDispatch();

  const { items, loading, error, filters } = useAppSelector(
    (state) => state.students,
  );

  // Re-fetch whenever a filter changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchStudents());
    }, 400);

    return () => clearTimeout(timeout);
  }, [dispatch, filters.search, filters.status, filters.class]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Title */}
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
            Students
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all enrolled students
          </p>
        </div>

        {/* Add Student */}
        <Link href="/students/add" className="w-fit cursor-pointer">
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button className="cursor-pointer">
              <FiPlus size={17} strokeWidth={2.2} />
              <span>Add Student</span>
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: 0.05,
          ease: "easeOut",
        }}
      >
        <SearchFilterBar />
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-10 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
        >
          <Spinner label="Loading students..." />
        </motion.div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-red-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
        >
          <ErrorState
            message="Unable to load students. Please try again."
            onRetry={() => dispatch(fetchStudents())}
          />
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
        >
          <EmptyState />
        </motion.div>
      )}

      {/* Student Table */}
      {!loading && !error && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
        >
          <StudentTable students={items} />
        </motion.div>
      )}
    </div>
  );
}
