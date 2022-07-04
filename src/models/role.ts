import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();

export async function listRole() {
    let roles = await prisma.role.findMany({});
    roles = roles ?? null;
    return roles;
}
