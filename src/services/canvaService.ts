import { Request, Response } from "express";
import mongoose from "mongoose";
import Image from "../models/image";
import _ from "lodash";
import { getUrlExtension } from "../helpers/imagesHelper";
import fs from "fs";
import https from "https";
const { createHmac } = require("crypto");
const getPathForSignatureVerification = (input: string) => {
  const paths = [
    "/configuration",
    "/configuration/delete",
    "/content/resources/find",
    "/editing/image/process",
    "/editing/image/process/get",
    "/publish/resources/find",
    "/publish/resources/get",
    "/publish/resources/upload",
  ];

  return paths.find((path) => input.endsWith(path));
};

const isValidTimestamp = (
  sentAtSeconds: number,
  receivedAtSeconds: number,
  leniencyInSeconds = 300
) => {
  console.log(Math.abs(sentAtSeconds - receivedAtSeconds), "12312312");
  return Math.abs(sentAtSeconds - receivedAtSeconds) < leniencyInSeconds;
};

const calculateSignature = (secret: string, message: string) => {
  // Decode the client secret
  const key = Buffer.from(secret, "base64");

  // Calculate the signature
  return createHmac("sha256", key).update(message).digest("hex");
};

export const isValidPostRequest = (secret: string, request: any) => {
  // Verify the timestamp
  const sentAtSeconds = parseInt(`${request.header("X-Canva-Timestamp")}`);
  const receivedAtSeconds = new Date().getTime() / 1000;
  if (
    !_.isNumber(sentAtSeconds) ||
    !_.isNumber(receivedAtSeconds) ||
    !isValidTimestamp(sentAtSeconds, receivedAtSeconds)
  ) {
    return false;
  }

  // Construct the message
  const version = "v1";
  const timestamp = request.header("X-Canva-Timestamp");
  const path = getPathForSignatureVerification(request.path);
  const body = request.rawBody;
  const message = `${version}:${timestamp}:${path}:${body}`;

  // Calculate a signature
  const signature = calculateSignature(secret, message);

  // Reject requests with invalid signatures
  const signatures = request.header("x-canva-signatures");
  console.log(signatures?.includes(signature), "123123");
  console.log(signatures);
  console.log(signature);
  if (!_.isString(signatures) || !signatures.includes(signature)) {
    return false;
  }

  return true;
};

export const isValidGetRequest = (secret: string, request: Request) => {
  // Verify the timestamp
  const sentAtSeconds = parseInt(`${request.query.time}`);
  const receivedAtSeconds = new Date().getTime() / 1000;

  if (
    !_.isNumber(sentAtSeconds) ||
    !_.isNumber(receivedAtSeconds) ||
    !isValidTimestamp(sentAtSeconds, receivedAtSeconds)
  ) {
    return false;
  }

  // Construct the message
  const version = "v1";
  const { time, user, brand, extensions, state } = request.query;
  const message = `${version}:${time}:${user}:${brand}:${extensions}:${state}`;

  // Calculate a signature
  const signature = calculateSignature(secret, message);

  // Reject requests with invalid signatures
  const signatures = request.query.signatures;
  if (!_.isString(signatures) || !signatures.includes(signature)) {
    return false;
  }

  return true;
};

export const saveFile = (request: Request, response: Response) => {
  const dataToSave = {
    canva_design_id: request?.body?.designId || "",
    canva_user_id: request?.body?.user || "",
    canva_brand: request?.body?.brand || "",
    canva_label: request?.body?.label || "",
    image_message: request?.body?.message || "",
    image_create_by: 0,
  };
  if (_.isArray(request.body.assets)) {
    request.body.assets.forEach((asset: any) => {
      const id = new mongoose.Types.ObjectId();
      const extension = getUrlExtension(asset.url);
      let dir = `${process.cwd()}/public/images`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const pathToSaveFile = `${dir}/${id}.${extension}`;
      const file = fs.createWriteStream(pathToSaveFile);
      https
        .get(asset.url, function (response) {
          response.pipe(file);
          file.on("finish", function () {
            Image.create({
              ...dataToSave,
              _id: id,
              image_system_name: `${id}.${extension}`,
              image_original_name: asset?.name || "",
            });
            file.close(() => {}); // close() is async, call cb after close completes.
          });
        })
        .on("error", function (err) {
          // Handle errors
          fs.unlink(pathToSaveFile, () => {}); // Delete the file async. (But we don't check the result)
        });
    });
  }
};
