import * as Yup from "yup";
import { Response } from "express";
import { setError } from "../helpers/errorHelper";

export async function requireParamater(
  res: Response,
  param: any,
  name: String
) {
  const data = {
    param,
  };
  try {
    const schema = Yup.object().shape({
      param: Yup.string()
        .max(255)
        .required(name + " is required"),
    });
    await schema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    const err = JSON.parse(JSON.stringify(error));
    let description = "";
    let msgKey = "";
    let code = "";
    if (err.errors) {
      switch (err.errors[0]) {
        case name + " is required":
          description = name + " is required";
          msgKey = name + ".required";
          code = name + "_required";
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
