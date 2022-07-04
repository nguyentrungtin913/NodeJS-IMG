import { Request, response, Response } from "express";
import Image from "../models/image";
import ImageTag from "../models/image_tag";
import * as imageValidator from "../validators/imageValidator";
import { success, errors } from "../helpers/responseHelper";
import { pagination } from "../helpers/paginationHelper";
import { getError } from "../helpers/errorHelper";
import { convertListImage } from "../helpers/imagesHelper";
import mongoose from "mongoose";
import fs from "fs";
import moment from "moment";
import _ from "lodash";
const base64Img = require("base64-img");
const STATUS_IMAGE = [0, 1, 2];

export async function createImage(req: any, res: Response) {
  try {
    if (!(await imageValidator.create(req, res))) {
      return getError(res);
    }
    let extension = "png";
    const id = new mongoose.Types.ObjectId();
    const image = req.files.file;
    extension = image.mimetype.split("/")[1];

    let dir = `${process.cwd()}/public/images`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    image.mv(`${dir}/${id}.${extension}`);

    let { message, ob } = req.body;
    let idUser = ob ? ob.id : 0;
    const img = {
      _id: id,
      image_message: message,
      image_system_name: `${id}.${extension}`,
      image_original_name: image.name,
      image_create_by: idUser,
    };

    await Image.create(img);
    return success(
      res,
      "create_success",
      "create.success",
      "Request successfully",
      null
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
export async function getList(req: Request, res: Response) {
  try {
    let {
      page = 1,
      limit = 5,
      status = -1,
      message = "",
      fromDate = "",
      toDate = "",
    } = req.query;
    page =
      isNaN(parseInt(page.toString())) ||
      page.toString().trim() === "" ||
      page === undefined
        ? "1"
        : page;
    limit =
      isNaN(parseInt(limit.toString())) ||
      limit.toString().trim() === "" ||
      limit === undefined
        ? "5"
        : limit;

    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    let params: any = {};
    let skip = (page - 1) * limit;
    if (STATUS_IMAGE.includes(parseInt(status.toString()))) {
      params["image_status"] = status;
      params["image_deleted"] = 0;
    } else if (parseInt(`${status}`) === 3) {
      params["image_deleted"] = 1;
    } else {
      params["image_deleted"] = 0;
    }

    if (message) {
      params["image_message"] = { $regex: ".*" + message + ".*" };
    }

    if (fromDate && _.isString(fromDate) && moment(fromDate).isValid()) {
      params["image_create_at"] = { $gte: fromDate };
    }
    if (toDate && _.isString(toDate) && moment(toDate).isValid()) {
      params["image_create_at"] = { $lte: toDate };
    }
    const images = await Image.find(params)
      .limit(limit * 1)
      .skip(skip);
    const count = await Image.countDocuments(params);
    return pagination(
      res,
      convertListImage(images),
      "ListImages",
      "get_image_success",
      "get.success",
      "Get a list of successful images",
      count,
      page,
      limit
    );
  } catch (err) {
    console.error(err);
  }
}

export async function softDelete(req: Request, res: Response) {
  try {
    if (!(await imageValidator.softDelete(req, res))) {
      return getError(res);
    }
    let { id = "" } = req.params;
    const now = new Date();
    let params: any = {
      image_deleted_at: now.toISOString(),
      image_deleted: 1,
    };
    await Image.findOneAndUpdate({ _id: id }, params, { new: true });
    return success(
      res,
      "delete_success",
      "delete.success",
      "Request successfully",
      null
    );
  } catch (err) {
    console.error(err);
  }
}

export async function restore(req: Request, res: Response) {
  try {
    if (!(await imageValidator.restore(req, res))) {
      return getError(res);
    }
    let { id = "" } = req.params;
    const now = new Date();
    let params: any = {
      image_updated_at: now.toISOString(),
      image_deleted: 0,
    };
    await Image.findOneAndUpdate({ _id: id }, params, { new: true });
    return success(
      res,
      "restore_success",
      "restore.success",
      "Request successfully",
      null
    );
  } catch (err) {
    console.error(err);
  }
}

export async function getImageById(req: any, res: Response) {
  const { id = "" } = req.params;
  try {
    const foundImage = await Image.findOne({ _id: id });
    const image = `${process.cwd()}/public/images/${
      foundImage.image_system_name
    }`;
    const base64Image = base64Img.base64Sync(image);
    if (fs.existsSync(image)) {
      res.send(base64Image);
    } else {
      res.status(404);
      res.end();
    }
  } catch (uncaughtException) {
    return errors(
      res,
      "request_failed",
      400,
      "request_failed",
      uncaughtException
    );
  }
}

export async function getImageByIdAndTag(req: any, res: Response) {
  const { id = "", tag = "" } = req.params;
  try {
    const foundImageTag = await ImageTag.findOne({
      image_id: id,
      image_tag: tag,
    });
    const foundImage = await Image.findOne({
      _id: id,
    });
    const image = `${process.cwd()}/public${foundImage.image_system_name}.${
      foundImageTag.image_tag
    }`;
    if (fs.existsSync(image)) {
      res.send(image);
    } else {
      res.status(404);
      res.end();
    }
  } catch (uncaughtException) {
    return errors(
      res,
      "request_failed",
      400,
      "request_failed",
      uncaughtException
    );
  }
}

export async function createImageByIdAndTag(req: any, res: Response) {
  try {
    const { id = "", tag = "" } = req.params;
    const foundImage = await Image.findOne({
      _id: id,
    });
    if (!foundImage) {
      return errors(
        res,
        "not_found_data",
        404,
        "not_found_data",
        `Not found #${id}`
      );
    }
    ImageTag.findOne(
      {
        image_id: id,
        image_tag: tag,
      },
      async (error: any, foundImageTag: any) => {
        if (error || !foundImageTag) {
          await ImageTag.create({
            _id: new mongoose.Types.ObjectId(),
            image_id: foundImage._id,
            image_tag: tag,
          });
        }
        let dir = `${process.cwd()}/public/images`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        fs.writeFile(
          `${dir}/${foundImage.image_system_name}.${tag}`,
          req.body,
          () => {}
        );
        return success(
          res,
          "create_success",
          "create.success",
          "Request successfully",
          null
        );
      }
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
