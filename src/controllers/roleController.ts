import { Request, Response, NextFunction } from 'express';
import { getList } from '../helpers/dataHelper';
import * as roleModel from "../models/role";
import { errors } from "../helpers/responseHelper";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let roles = await roleModel.listRole();
        return getList(res, roles, "list_roles", "get_role_success", "get.role.success", "Get list role successful");
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

export default { get };
