"use client";

import { FiSearch, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSearch,
  setStatusFilter,
  setClassFilter,
  clearFilters,
} from "@/redux/slices/studentSlice";
import Button from "../ui/Button";

// Controls search + class/status filters, all backed by Redux
export default function SearchFilterBar() {
  const dispatch = useAppDispatch();

  const {
    search,
    status,
    class: studentClass,
  } = useAppSelector((state) => state.students.filters);

  const hasFilters = Boolean(search || status || studentClass);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-[256px]">
            <FiSearch
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 hover:border-slate-400"
            />
          </div>

          {/* Class Filter */}
          <input
            type="text"
            placeholder="Filter by class"
            value={studentClass}
            onChange={(e) => dispatch(setClassFilter(e.target.value))}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 hover:border-slate-400 sm:w-[160px]"
          />

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            className="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none hover:border-slate-400 sm:w-[130px]"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={() => dispatch(clearFilters())}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
          >
            <FiX size={15} />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
