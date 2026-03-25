import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

//Get Connection String from env file
const connectionString = process.env.DATABASE_URL;

//Create a new Prisma postgress Connection & use Prisma Client to connect the postgress
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
