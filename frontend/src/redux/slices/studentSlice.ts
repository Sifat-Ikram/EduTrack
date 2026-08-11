import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Student, StudentFormData } from "@/types/student";

// ---------- State Shape ----------
interface StudentState {
    items: Student[];
    loading: boolean;
    error: string | null;
    // Separate state for the "single student" fetch used by the edit page,
    // kept apart from the list loading/error so they don't interfere with each other
    currentStudent: Student | null;
    currentStudentLoading: boolean;
    currentStudentError: string | null;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    // Filters live in Redux because they affect the API request itself,
    // and multiple components (search bar, table, pagination) need to read/react to them
    filters: {
        search: string;
        status: string;
        class: string;
    };
}

const initialState: StudentState = {
    items: [],
    loading: false,
    error: null,
    currentStudent: null,
    currentStudentLoading: false,
    currentStudentError: null,
    meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
    filters: { search: "", status: "", class: "" },
};

// ---------- Async Thunks ----------

// Fetch students based on current filters
export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { students: StudentState };
            const { search, status, class: studentClass } = state.students.filters;

            const response = await api.get("/students", {
                params: {
                    ...(search ? { search } : {}),
                    ...(status ? { status } : {}),
                    ...(studentClass ? { class: studentClass } : {}),
                },
            });

            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Unable to load students. Please try again."
            );
        }
    }
);

// Fetch a single student by id — used by the Edit Student page
export const fetchStudentById = createAsyncThunk(
    "students/fetchStudentById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/students/${id}`);
            return response.data.data as Student;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Student not found");
        }
    }
);

export const createStudent = createAsyncThunk(
    "students/createStudent",
    async (payload: StudentFormData, { rejectWithValue }) => {
        try {
            const response = await api.post("/students", payload);
            return response.data.data as Student;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to create student");
        }
    }
);

export const updateStudent = createAsyncThunk(
    "students/updateStudent",
    async ({ id, payload }: { id: number; payload: StudentFormData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/students/${id}`, payload);
            return response.data.data as Student;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to update student");
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(`/students/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete student");
        }
    }
);

// ---------- Slice ----------
const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
        },
        setStatusFilter: (state, action: PayloadAction<string>) => {
            state.filters.status = action.payload;
        },
        setClassFilter: (state, action: PayloadAction<string>) => {
            state.filters.class = action.payload;
        },
        clearFilters: (state) => {
            state.filters = { search: "", status: "", class: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch list
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch single student (Edit page)
            .addCase(fetchStudentById.pending, (state) => {
                state.currentStudentLoading = true;
                state.currentStudentError = null;
            })
            .addCase(fetchStudentById.fulfilled, (state, action) => {
                state.currentStudentLoading = false;
                state.currentStudent = action.payload;
            })
            .addCase(fetchStudentById.rejected, (state, action) => {
                state.currentStudentLoading = false;
                state.currentStudentError = action.payload as string;
            })
            // Create
            .addCase(createStudent.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            // Update
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.items.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            // Delete
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.items = state.items.filter((s) => s.id !== action.payload);
            });
    },
});

export const { setSearch, setStatusFilter, setClassFilter, clearFilters } = studentSlice.actions;
export default studentSlice.reducer;