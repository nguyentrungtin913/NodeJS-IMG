import { Request, Response, NextFunction } from 'express';
import * as userModel from "../models/user";
import * as userValidator from "../validators/userValidator";
import { success, errors } from "../helpers/responseHelper";
import { pagination } from "../helpers/paginationHelper";
import { getError } from "../helpers/errorHelper";
import bcrypt from "bcrypt";
import { STATUS as USER_STATUS } from "../constant/user";
import * as jwt from "jsonwebtoken";


const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(await userValidator.login(req, res))) {
            return getError(res);
        }
        const email = ((req.body.email).toLowerCase()) ?? "";
        const password = req.body.password ?? "";
        // const salt = await bcrypt.genSalt(10);
        // let hash = await bcrypt.hash(password, salt);
        // console.log(hash)
        const user = await userModel.findByEmail(email);
        if (
            user &&
            user.user_deleted === 0 &&
            user.user_status === USER_STATUS["ACTIVE"]
        ) {
            const passUser = user.user_password ?? "";
            let role = null;
            if (user.user_role.length > 0) {
                if (user.user_role[0].role) {
                    role = user.user_role[0].role.role_name;
                }
            }
            if (await bcrypt.compare(password, passUser)) {
                const now = new Date();
                const start = now.getTime();
                const end = start + 1000 * 60 * 60 * 24;
                const payload = {
                    id: user.user_id,
                    role: role,
                    email: user.user_email ?? null,
                    exp: Math.floor(Date.now() / 1000) + 60 * 30,
                };
                const secret = process.env.SECRET ?? "IMAGE-PROCESSOR";
                const token = jwt.sign(payload, secret);
                const data = {
                    accessToken: token,
                };

                return success(
                    res,
                    "login_success",
                    "login.success",
                    "Login successfully",
                    data
                );
            }
            return errors(
                res,
                "login_failed",
                400,
                "login.username_password.invalid",
                "The email address or password you entered is invalid !"
            );
        }
        return errors(
            res,
            "login_failed",
            400,
            "login.username_password.invalid",
            "The email address or password you entered is invalid !"
        );
    } catch (uncaughtException) {
        console.log(uncaughtException)
        return errors(
            res,
            "request_failed",
            500,
            "request.failed",
            uncaughtException
        );
    }
};

const getList = async (req: Request, res: Response, next: NextFunction) => {
    let { page = "", limit = "", status = "", email = "", ob } = req.body;

    page =
        isNaN(page) || page.toString().trim() === "" || page === undefined
            ? "1"
            : page;
    limit =
        isNaN(limit) || limit.toString().trim() === "" || limit === undefined
            ? "5"
            : limit;
    status =
        isNaN(status) || status.toString().trim() === "" || status === undefined
            ? "-1"
            : status;

    page = parseInt(page.toString());
    limit = parseInt(limit.toString());
    status = parseInt(status.toString());

    let id = ob ? ob.id : "";

    let skip = (page - 1) * limit;
    try {
        let users = await userModel.listUsers(
            skip,
            limit,
            status,
            email
        );
        if (users) {
            let totalPage = users[0] !== null ? users[0] : 0;
            return pagination(
                res,
                users[1],
                "ListUsers",
                "get_user_success",
                "get.success",
                "Get a list of successful users",
                totalPage,
                page,
                limit
            );
        }
        console.log(users)
        return success(res, 'get_setting_success', 'get.success', 'Request successfully', users);
    } catch (uncaughtException) {
        console.log(uncaughtException)
        return errors(
            res,
            "request_failed",
            500,
            "request.failed",
            uncaughtException
        );
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(await userValidator.create(req, res))) {
            return getError(res);
        }
        const date = new Date();

        let {
            password,
            firstName,
            lastName,
            ob
        } = req.body ?? "";

        let email = ((req.body.email).toLowerCase()) ?? "";
        let status = 1;
        let updateAt = date;
        let createAt = date;
        let createBy = ob ? ob.id : "";
        let updateBy = ob ? ob.id : "";
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let user = await userModel.create(email, hash, firstName, lastName, status, createAt, updateAt, createBy, updateBy);

        return success(res, 'create_success', 'create.success', 'Request successfully', null);
    } catch (uncaughtException) {
        console.log(uncaughtException)
        return errors(
            res,
            "request_failed",
            500,
            "request.failed",
            uncaughtException
        );
    }
};

export default { login, getList, create };
