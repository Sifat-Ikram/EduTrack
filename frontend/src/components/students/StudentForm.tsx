"use client";

import { useState, FormEvent } from "react";
import { StudentFormData, StudentStatus } from "@/types/student";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface StudentFormProps {
    initialData?: StudentFormData;
    onSubmit: (data: StudentFormData) => void;
    isSubmitting: boolean;
    submitLabel?: string;
}

// Shared by both Add and Edit pages — the fields and validation rules are identical
export default function StudentForm({
    initialData,
    onSubmit,
    isSubmitting,
    submitLabel = "Save Student",
}: StudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>(
        initialData ?? { name: "", email: "", phone: "", class: "", status: "active" }
    );
    const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
        if (!formData.class.trim()) newErrors.class = "Class is required.";
        if (!formData.status) newErrors.status = "Status is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof StudentFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear the error for a field as soon as the user starts fixing it
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
            <Input
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                placeholder="e.g. Rahim Uddin"
            />

            <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                placeholder="e.g. rahim@example.com"
            />

            <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
                placeholder="e.g. 01700000000"
            />

            <Input
                label="Class"
                value={formData.class}
                onChange={(e) => handleChange("class", e.target.value)}
                error={errors.class}
                placeholder="e.g. Class 8"
            />

            <Select
                label="Status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value as StudentStatus)}
                error={errors.status}
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </Select>

            <div className="mt-2 flex justify-end">
                <Button type="submit" isLoading={isSubmitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}