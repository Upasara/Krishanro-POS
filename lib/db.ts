import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// This line checks if the current environment is not production. If the environment is not
// production (i.e., it's development or testing), it assigns db to globalThis.prisma.
// This ensures that the PrismaClient instance is reused across module reloads,
// which can happen during development with tools like nodemon or webpack.

//summery:
// The code ensures that a single instance of PrismaClient is used
// across the entire application, which is particularly useful
// in a development environment where the application might reload frequently.
