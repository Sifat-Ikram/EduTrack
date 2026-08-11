"use client";

import { useState } from "react";
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
        <div className="mx-auto flex max-w-lg flex-col gap-5">
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Add Student</h1>
                <p className="text-sm text-gray-500">Fill in the details to enroll a new student</p>
            </div>

            {submitError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
            )}

            <StudentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Add Student" />
        </div>
    );
}