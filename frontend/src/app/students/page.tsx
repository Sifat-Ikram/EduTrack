"use client";

import { useEffect } from "react";
import Link from "next/link";
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
    const { items, loading, error, filters } = useAppSelector((state) => state.students);

    // Re-fetch whenever a filter changes (simple debounce for the search field)
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchStudents());
        }, 400);

        return () => clearTimeout(timeout);
    }, [dispatch, filters.search, filters.status, filters.class]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Students</h1>
                    <p className="text-sm text-gray-500">Manage all enrolled students</p>
                </div>
                <Link href="/students/add">
                    <Button>
                        <FiPlus /> Add Student
                    </Button>
                </Link>
            </div>

            <SearchFilterBar />

            {loading && <Spinner label="Loading students..." />}

            {!loading && error && (
                <ErrorState
                    message="Unable to load students. Please try again."
                    onRetry={() => dispatch(fetchStudents())}
                />
            )}

            {!loading && !error && items.length === 0 && <EmptyState />}

            {!loading && !error && items.length > 0 && <StudentTable students={items} />}
        </div>
    );
}