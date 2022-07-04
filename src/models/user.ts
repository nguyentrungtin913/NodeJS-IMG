import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();

export async function listUsers(page: number = 0, limit: number = 5, status: number = -1, email: string = "") {
    const params: any = {
        user_deleted: 0,
    };
    if (status !== -1) {
        params["user_status"] = status;
    }
    if (!_.isEmpty(email)) {
        params["user_email"] = {
            contains: email,
        };
    }

    const users = await prisma.$transaction([
        prisma.user.count({
            where: params,
        }),
        prisma.user.findMany({
            skip: page,
            take: limit,
            where: params,
            select: {
                user_id: true,
                user_email: true,
                user_first_name: true,
                user_last_name: true,
                user_status: true,
                user_create_at: true,
                user_update_at: true,
                user_create_by: true,
                user_update_by: true,
                user_role: {
                    include: {
                        role: true,
                    },
                },
            },
            orderBy: {
                user_id: "asc",
            },
        }),
    ]);

    console.log(users)
    return users;
}

export async function create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    status: number,
    createAt: any,
    updateAt: any,
    createBy: string,
    updateBy: string

) {
    const d = new Date();
    const user = await prisma.user.create({
        data: {
            user_email: email,
            user_password: password,
            user_first_name: firstName,
            user_last_name: lastName,
            user_status: status,
            user_create_at: createAt,
            user_update_at: updateAt,
            user_create_by: createBy,
            user_update_by: updateBy,
            user_deleted: 0
        }
    });
    console.log(user)
    return user;
}

export async function findByEmail(email: string) {
    const users = await prisma.user.findMany({
        where: {
            user_email: email,
            user_deleted: 0,
        },
        include: {
            user_role: {
                include: {
                    role: true,
                },
            },
        },
    });
    let user = users[0] ?? null;
    return user;
}
