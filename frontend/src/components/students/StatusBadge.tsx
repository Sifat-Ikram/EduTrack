import { StudentStatus } from "@/types/student";

export default function StatusBadge({ status }: { status: StudentStatus }) {
    const isActive = status === "active";

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
        >
            {isActive ? "Active" : "Inactive"}
        </span>
    );
}