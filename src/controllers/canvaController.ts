import { Request, Response } from "express";
import * as canavaServerice from "../services/canvaService";

export async function get(req: Request, res: Response) {
  if (
    !canavaServerice.isValidPostRequest(process.env.CANVA_SECRET_KEY ?? "", req)
  ) {
    res.sendStatus(401);
    return;
  }
  res.status(200).send({
    type: "SUCCESS",
    resources: [],
  });
}

export async function find(req: Request, res: Response) {
  if (
    !canavaServerice.isValidPostRequest(process.env.CANVA_SECRET_KEY ?? "", req)
  ) {
    res.sendStatus(401);
    return;
  }
  res.status(200).send({
    type: "SUCCESS",
    resources: [],
  });
}

export async function upload(req: any, res: Response) {
  console.log(req.headers, req.params, req.query, req.body, req.rawBody);
  if (
    !canavaServerice.isValidPostRequest(process.env.CANVA_SECRET_KEY ?? "", req)
  ) {
    res.sendStatus(401);
    return;
  }
  canavaServerice.saveFile(req, res);
  res.status(200).send({
    type: "SUCCESS",
    resources: [],
  });
}
