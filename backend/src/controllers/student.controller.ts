import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import ApiError from "../utils/ApiError";
import { createStudentSchema, updateStudentSchema } from "../validators/student.validator";
import { Prisma } from "@prisma/client";

// GET /students  -> supports search, filter by status/class, and pagination
export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, status, class: studentClass, page = "1", limit = "10" } = req.query;

        const pageNumber = Math.max(Number(page) || 1, 1);
        const pageSize = Math.max(Number(limit) || 10, 1);

        // Build a dynamic "where" clause based on which filters were provided
        const where: Prisma.StudentWhereInput = {
            ...(status ? { status: status as "active" | "inactive" } : {}),
            ...(studentClass ? { class: studentClass as string } : {}),
            ...(search
                ? {
                    OR: [
                        { name: { contains: search as string, mode: "insensitive" } },
                        { email: { contains: search as string, mode: "insensitive" } },
                    ],
                }
                : {}),
        };

        const [students, total] = await Promise.all([
            prisma.student.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            }),
            prisma.student.count({ where }),
        ]);

        res.status(200).json({
            success: true,
            data: students,
            meta: {
                total,
                page: pageNumber,
                limit: pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (error) {
        next(error);
    }
};

// GET /students/:id
export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new ApiError(400, "Invalid student id");

        const student = await prisma.student.findUnique({ where: { id } });
        if (!student) throw new ApiError(404, "Student not found");

        res.status(200).json({ success: true, data: student });
    } catch (error) {
        next(error);
    }
};

// POST /students
export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = createStudentSchema.safeParse(req.body);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || "Invalid input";
            throw new ApiError(400, firstError);
        }

        const student = await prisma.student.create({ data: parsed.data });
        res.status(201).json({ success: true, data: student });
    } catch (error: any) {
        // Prisma unique constraint violation (duplicate email)
        if (error.code === "P2002") {
            return next(new ApiError(400, "A student with this email already exists"));
        }
        next(error);
    }
};

// PATCH /students/:id
export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new ApiError(400, "Invalid student id");

        const parsed = updateStudentSchema.safeParse(req.body);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || "Invalid input";
            throw new ApiError(400, firstError);
        }

        const existing = await prisma.student.findUnique({ where: { id } });
        if (!existing) throw new ApiError(404, "Student not found");

        const updated = await prisma.student.update({
            where: { id },
            data: parsed.data,
        });

        res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
        if (error.code === "P2002") {
            return next(new ApiError(400, "A student with this email already exists"));
        }
        next(error);
    }
};

// DELETE /students/:id
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new ApiError(400, "Invalid student id");

        const existing = await prisma.student.findUnique({ where: { id } });
        if (!existing) throw new ApiError(404, "Student not found");

        await prisma.student.delete({ where: { id } });
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
};