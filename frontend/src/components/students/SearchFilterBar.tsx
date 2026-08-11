"use client";

import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch, setStatusFilter, setClassFilter, clearFilters } from "@/redux/slices/studentSlice";
import Button from "../ui/Button";

// Controls search + status/class filters, all backed by Redux
export default function SearchFilterBar() {
    const dispatch = useAppDispatch();
    const { search, status, class: studentClass } = useAppSelector((state) => state.students.filters);

    return (
        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 md:w-64"
                    />
                </div>

                {/* Status filter */}
                <select
                    value={status}
                    onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                {/* Class filter */}
                <input
                    type="text"
                    placeholder="Filter by class"
                    value={studentClass}
                    onChange={(e) => dispatch(setClassFilter(e.target.value))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 md:w-40"
                />
            </div>

            {(search || status || studentClass) && (
                <Button variant="ghost" onClick={() => dispatch(clearFilters())}>
                    Clear Filters
                </Button>
            )}
        </div>
    );
}