"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { createStudent } from "@/redux/slices/studentSlice";
import StudentForm from "@/components/students/StudentForm";
import { StudentFormData } from "@/types/student";

export default function AddStudentPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await dispatch(createStudent(data));

    setIsSubmitting(false);

    if (createStudent.fulfilled.match(result)) {
      router.push("/students");
    } else {
      setSubmitError(result.payload as string);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Title & Description */}
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
              Add Student
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the details to enroll a new student
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => router.push("/")}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-1 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:text-slate-800"
          >
            <FiArrowLeft size={16} />
            <span>Back</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          role="alert"
          className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-700"
        >
          {submitError}
        </motion.div>
      )}

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.05,
          ease: "easeOut",
        }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-7"
      >
        <StudentForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Student"
        />
      </motion.div>
    </div>
  );
}
