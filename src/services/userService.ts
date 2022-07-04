import { Request, Response } from "express";
import User from "../models/user";
import UserRole from "../models/userRole";
import Role from "../models/role";
import * as userValidator from "../validators/userValidator";
import { success, errors } from "../helpers/responseHelper";
import { pagination } from "../helpers/paginationHelper";
import { getError } from "../helpers/errorHelper";
import { STATUS as USER_STATUS } from "../constant/user";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
  try {
    if (!(await userValidator.create(req, res))) {
      return getError(res);
    }
    let { password, firstName, lastName, ob } = req.body ?? "";

    let email = req.body.email.toLowerCase() ?? "";
    let status = 1;
    let createBy = ob ? ob.id : "";

    let pUser: any = {
      user_email: email,
      user_status: status,
      user_create_by: createBy,
      user_update_by: createBy,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      pUser["user_password"] = hash;
    }
    if (firstName) {
      pUser["user_first_name"] = firstName;
    }
    if (lastName) {
      pUser["user_last_name"] = lastName;
    }
    let user = await User.create(pUser);

    if (user) {
      let role = await Role.findOne({ role_name: "user" });
      let role_id = role ? role._id : "";
      let pUserRole = {
        role_id: role_id,
        user_id: user._id,
        role: role_id,
      };
      let userRole = await UserRole.create(pUserRole);
      if (userRole) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { user_role: userRole._id },
          { new: true }
        );
        return success(
          res,
          "user_create_success",
          "user.create.success",
          "Request successfully",
          null
        );
      }
    }
    return errors(res, "create_faild", "create.faild", "Request faild", null);
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

export async function getList(req: Request, res: Response) {
  try {
    let { page = "", limit = "", status = "", email = "" } = req.body;

    page =
      isNaN(page) || page.toString().trim() === "" || page === undefined
        ? "1"
        : page;
    limit =
      isNaN(limit) || limit.toString().trim() === "" || limit === undefined
        ? "5"
        : limit;

    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    let skip = (page - 1) * limit;
    let params: any = { user_deleted: 0 };
    if (email) {
      params["user_email"] = { $regex: ".*" + email + ".*" };
    }

    const users = await User.find(params)
      .limit(limit * 1)
      .skip(skip)
      .select("-user_password")
      .populate({
        path: "user_role",
        populate: {
          path: "role",
        },
      });

    const count = await User.countDocuments(params);

    return pagination(
      res,
      users,
      "ListUsers",
      "get_user_success",
      "get.success",
      "Get a list of successful users",
      count,
      page,
      limit
    );
  } catch (err) {
    console.error(err);
  }
}

export async function login(req: Request, res: Response) {
  if (!(await userValidator.login(req, res))) {
    return getError(res);
  }
  const email = req.body.email.toLowerCase() ?? "";
  const password = req.body.password ?? "";
  User.findOne({ user_email: email })
    .populate({
      path: "user_role",
      populate: {
        path: "role",
      },
    })
    .then(async (user) => {
      if (
        user &&
        user.user_deleted === 0 &&
        user.user_status === USER_STATUS["ACTIVE"]
      ) {
        const passUser = user.user_password ?? "";
        let role = user.user_role ? user.user_role.id.toString() : null;
        if (await bcrypt.compare(password, passUser)) {
          const payload = {
            id: user._id,
            role: role,
            email: user.user_email ?? null,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
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
    })
    .catch((err) => {
      return errors(res, "request_failed", 500, "request.failed", err);
    });
}

export async function softDelete(req: Request, res: Response) {
  try {
    if (!(await userValidator.softDelete(req, res))) {
      return getError(res);
    }
    let { userId } = req.body;
    const now = new Date();
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { user_deleted: 1, user_delete_at: now.toISOString() },
      { new: true }
    );
    if (user) {
      return success(
        res,
        "delete_user_success",
        "delete.user.success",
        "Delete user success",
        null
      );
    }
    return errors(
      res,
      "delete_user_faild",
      400,
      "delete.user.faild",
      "Delete user faild"
    );
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

export async function getProfile(req: Request, res: Response) {
  try {
    let { ob } = req.body;
    let id = ob ? ob.id : "";

    const user = await User.findById(id)
      .select("-user_password")
      .populate({
        path: "user_role",
        populate: {
          path: "role",
        },
      });
    return success(
      res,
      "get_user_success",
      "get.success",
      "Request successful",
      user
    );
  } catch (err) {
    console.error(err);
  }
}
