import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Role from "../models/role";
import { success, errors } from "../helpers/responseHelper";
import { getList } from "../helpers/dataHelper";

export async function createRole(req: Request, res: Response) {
  try {
    const role = new Role({
      _id: new mongoose.Types.ObjectId(),
      role_name: "admin",
    });
    if (role.save()) {
      return success(
        res,
        "create_success",
        "create.success",
        "Request successfully",
        role
      );
    }
  } catch (uncaughtException) {
    return errors(
      res,
      "request_failed",
      500,
      "request.failed",
      uncaughtException
    );
  }
}

export async function get(req: Request, res: Response) {
  Role.find()
    .select(
      "_id role_name role_create_date role_update_date role_create_by role_update_by"
    )
    .then((roles) => {
      return getList(
        res,
        roles,
        "list_roles",
        "get_role_success",
        "get.role.success",
        "Get list role successful"
      );
    })
    .catch((err) => {
      return errors(res, "request_failed", 500, "request.failed", err);
    });
}
