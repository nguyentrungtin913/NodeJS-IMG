import { Request, Response } from "express";
import * as ImageService from "../services/imageService";

export async function createImage(req: Request, res: Response) {
  let image = ImageService.createImage(req, res);
  return image;
}

export async function getList(req: Request, res: Response) {
  let images = ImageService.getList(req, res);
  return images;
}
export async function softDelete(req: Request, res: Response) {
  let image = ImageService.softDelete(req, res);
  return image;
}
export async function restore(req: Request, res: Response) {
  let image = ImageService.restore(req, res);
  return image;
}
export async function getImageById(req: Request, res: Response) {
  return ImageService.getImageById(req, res);
}
export async function getImageByIdAndTag(req: Request, res: Response) {
  return ImageService.getImageByIdAndTag(req, res);
}
export async function createImageByIdAndTag(req: Request, res: Response) {
  return ImageService.createImageByIdAndTag(req, res);
}
