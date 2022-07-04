import { Request, Response } from "express";
import { success, errors } from "../helpers/responseHelper";
import User from "../models/user";
import request from "request-promise";
import * as jwt from "jsonwebtoken";
import _ from "lodash";

export async function login(req: Request, res: Response) {
  try {
    let { accessToken = "" } = req.body;
    if (_.isEmpty(accessToken)) {
      return errors(
        res,
        "token_required",
        400,
        "token.required",
        "Token is required"
      );
    }
    let email = "";
    await request(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        accessToken,
      async function (error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          let result = JSON.parse(body);
          email = result["email"] ?? "";
        }
      }
    );
    let user = await User.findOne({
      user_email: email,
      user_deleted: 0,
    }).populate({
      path: "user_role",
      populate: {
        path: "role",
      },
    });

    if (user) {
      let role = user.user_role ? user.user_role.id.toString() : null;
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
      "login.email.invalid",
      "The email address you entered is invalid !"
    );
  } catch (uncaughtException) {
    return errors(res, "request_failed", 500, "request.failed", null);
  }
}
