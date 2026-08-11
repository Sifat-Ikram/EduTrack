import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app
// to avoid exhausting the database connection pool
const prisma = new PrismaClient();

export default prisma;