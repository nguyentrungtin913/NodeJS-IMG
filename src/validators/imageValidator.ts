import { Request, Response } from "express";
import { setError } from "../helpers/errorHelper";
import Image from "../models/image";
import * as baseValidator from "../validators/baseValidator";

async function findById(res: Response, id: any, deleted: 0 | 1 = 0) {
  try {
    let image = await Image.find({ _id: id, image_deleted: deleted });
    if (image.length < 1) {
      setError(
        res,
        400,
        "image_not_exist",
        "image_not.exist",
        "Image not exists"
      );
      return false;
    }
    return true;
  } catch (uncaughtException: any) {
    setError(res, 500, "request_failed", "request.failed", uncaughtException);
    return false;
  }
}
export async function update(req: Request, res: Response) {
  let { id } = req.body ?? "";
  if (
    !(await baseValidator.requireParamater(res, id, "Id")) ||
    !(await findById(res, id))
  ) {
    return false;
  }
  return true;
}
export async function restore(req: Request, res: Response) {
  let { id } = req.params ?? "";
  if (
    !(await baseValidator.requireParamater(res, id, "Id")) ||
    !(await findById(res, id, 1))
  ) {
    return false;
  }
  return true;
}
export async function softDelete(req: Request, res: Response) {
  let { id } = req.params ?? "";
  if (
    !(await baseValidator.requireParamater(res, id, "Id")) ||
    !(await findById(res, id))
  ) {
    return false;
  }
  return true;
}
async function isImage(req: any, res: Response) {
  const mimeTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (!req?.files?.file) {
    setError(res, 400, "image_required", "image.required", "Image is required");
    return false;
  }
  const currMimeType = req?.files?.file.mimetype || "";
  if (!mimeTypes.includes(currMimeType)) {
    setError(res, 400, "invalid_file", "invalid_file", "File is invalid");
    return false;
  }
  return true;
}
export async function create(req: Request, res: Response) {
  let { message } = req.body ?? "";
  if (
    !(await baseValidator.requireParamater(res, message, "Message")) ||
    !(await isImage(req, res))
  ) {
    return false;
  }
  return true;
}
