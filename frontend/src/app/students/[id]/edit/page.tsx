"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStudentById, updateStudent } from "@/redux/slices/studentSlice";

import StudentForm from "@/components/students/StudentForm";
import Spinner from "@/components/ui/Spinner";
import ErrorState from "@/components/ui/ErrorState";

import { StudentFormData } from "@/types/student";

export default function EditStudentPage() {
  const params = useParams();
  const studentId = Number(params.id);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentStudent, currentStudentLoading, currentStudentError } =
    useAppSelector((state) => state.students);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchStudentById(studentId));
  }, [dispatch, studentId]);

  const handleSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await dispatch(
      updateStudent({
        id: studentId,
        payload: data,
      }),
    );

    setIsSubmitting(false);

    if (updateStudent.fulfilled.match(result)) {
      router.push("/students");
    } else {
      setSubmitError(result.payload as string);
    }
  };

  // Loading
  if (currentStudentLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-slate-200 bg-white p-10 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
      >
        <Spinner label="Loading student..." />
      </motion.div>
    );
  }

  // Error
  if (currentStudentError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
      >
        <ErrorState
          message={currentStudentError}
          onRetry={() => dispatch(fetchStudentById(studentId))}
        />
      </motion.div>
    );
  }

  if (!currentStudent) return null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="mb-6"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
              Edit Student
            </h1>

            <p className="mt-1 truncate text-sm text-slate-500">
              Update {currentStudent.name}&apos;s information
            </p>
          </div>

          {/* Back */}
          <motion.button
            type="button"
            onClick={() => router.push("/")}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-1 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:text-slate-800"
          >
              <FiArrowLeft size={16} strokeWidth={2} />
              <span>Back</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Submit Error */}
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
        {/* Card Header */}
        <div className="mb-6 border-b border-slate-100 pb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Student Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Update the student&apos;s information below.
          </p>
        </div>

        {/* Student Form */}
        <div
          className="
                        [&_button]:cursor-pointer
                        [&_select]:cursor-pointer
                    "
        >
          <StudentForm
            initialData={{
              name: currentStudent.name,
              email: currentStudent.email,
              phone: currentStudent.phone,
              class: currentStudent.class,
              status: currentStudent.status,
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
          />
        </div>
      </motion.div>
    </div>
  );
}
