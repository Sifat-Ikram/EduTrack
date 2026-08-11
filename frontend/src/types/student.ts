export type StudentStatus = "active" | "inactive";

export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    class: string;
    status: StudentStatus;
    createdAt: string;
    updatedAt: string;
}

// Fields sent when creating/editing a student
export interface StudentFormData {
    name: string;
    email: string;
    phone: string;
    class: string;
    status: StudentStatus;
}

// Shape returned by GET /students
export interface StudentListResponse {
    success: boolean;
    data: Student[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ApiErrorResponse {
    success: false;
    message: string;
}