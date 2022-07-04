import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";
import { setError } from "../helpers/errorHelper";
import User from "../models/user";
import * as baseValidator from "../validators/baseValidator";
import mongoose from "mongoose";

async function validate_email_password(req: Request, res: Response) {
  const email = req.body.email ?? "";
  const password = req.body.password ?? "";
  const create = {
    email,
    password,
  };
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    });
    await schema.validate(create, { abortEarly: false });
    return true;
  } catch (error) {
    const err = JSON.parse(JSON.stringify(error));
    let description = "";
    let msgKey = "";
    let code = "";
    if (err.errors) {
      switch (err.errors[0]) {
        case "Must be a valid email":
          description = "Must be a valid email";
          msgKey = "email.invalid";
          code = "email_invalid";
          break;
        case "Email is required":
          description = "Email is required";
          msgKey = "email.required";
          code = "email_required";
          break;
        case "Password is required":
          description = "password is required";
          msgKey = "password.required";
          code = "password_required";
          break;
        default:
          description = "error";
          msgKey = "error";
          code = "error";
          break;
      }
    }
    setError(res, 400, code, msgKey, description);
    return false;
  }
}
async function findByEmail(res: Response, email: String) {
  try {
    let user = await User.find({ user_email: email });

    if (user.length > 0) {
      setError(res, 400, "email_exist", "email.exist", "Email already exists");
      return false;
    }
    return true;
  } catch (uncaughtException: any) {
    setError(res, 500, "request_failed", "request.failed", uncaughtException);
    return false;
  }
}

export async function create(req: Request, res: Response) {
  let email = req.body.email ? req.body.email.toLowerCase() : "";

  if (
    !(await baseValidator.requireParamater(res, email, "Email")) ||
    !(await findByEmail(res, email))
  ) {
    return false;
  }
  return true;
}

export async function login(req: Request, res: Response) {
  if (!(await validate_email_password(req, res))) {
    return false;
  }
  return true;
}

async function findById(res: Response, id: any) {
  try {
    let user = await User.find({ _id: id, user_deleted: 0 });
    if (user.length < 1) {
      setError(res, 400, "user_not_exist", "user_not.exist", "User not exists");
      return false;
    }
    return true;
  } catch (uncaughtException: any) {
    setError(res, 500, "request_failed", "request.failed", uncaughtException);
    return false;
  }
}
async function checkUserId(res: Response, id: any) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      setError(res, 400, "user_not_exist", "user_not.exist", "User not exists");
      return false;
    }
    return true;
  } catch (uncaughtException: any) {
    setError(res, 500, "request_failed", "request.failed", uncaughtException);
    return false;
  }
}
export async function softDelete(req: Request, res: Response) {
  let { userId } = req.body ?? "";
  if (
    !(await baseValidator.requireParamater(res, userId, "UserId")) ||
    !(await checkUserId(res, userId)) ||
    !(await findById(res, userId))
  ) {
    return false;
  }
  return true;
}
