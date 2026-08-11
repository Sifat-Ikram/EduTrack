export type StudentStatus = "active" | "inactive";

export interface CreateStudentInput {
    name: string;
    email: string;
    phone: string;
    class: string;
    status: StudentStatus;
}

export type UpdateStudentInput = Partial<CreateStudentInput>;

// Query params accepted by GET /students
export interface StudentQueryParams {
    search?: string;
    status?: StudentStatus;
    class?: string;
    page?: string;
    limit?: string;
}