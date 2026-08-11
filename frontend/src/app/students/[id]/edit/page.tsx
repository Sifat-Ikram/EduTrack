"use client";

import { useEffect, useState } from "react";
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

    const { currentStudent, currentStudentLoading, currentStudentError } = useAppSelector(
        (state) => state.students
    );

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchStudentById(studentId));
    }, [dispatch, studentId]);

    const handleSubmit = async (data: StudentFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        const result = await dispatch(updateStudent({ id: studentId, payload: data }));

        setIsSubmitting(false);

        if (updateStudent.fulfilled.match(result)) {
            router.push("/students");
        } else {
            setSubmitError(result.payload as string);
        }
    };

    if (currentStudentLoading) return <Spinner label="Loading student..." />;
    if (currentStudentError)
        return (
            <ErrorState
                message={currentStudentError}
                onRetry={() => dispatch(fetchStudentById(studentId))}
            />
        );
    if (!currentStudent) return null;

    return (
        <div className="mx-auto flex max-w-lg flex-col gap-5">
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Edit Student</h1>
                <p className="text-sm text-gray-500">Update {currentStudent.name}&apos;s information</p>
            </div>

            {submitError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
            )}

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
    );
}