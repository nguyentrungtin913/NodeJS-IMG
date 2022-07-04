import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/userService';


export async function createUser(req: Request, res: Response, next: NextFunction) {
   let user = await UserService.createUser(req, res)
   return user;
}

export async function getList(req: Request, res: Response, next: NextFunction) {
    let users = await UserService.getList(req, res)
    return users;
}

export async function login(req: Request, res: Response, next: NextFunction) {
    let user = await UserService.login(req, res)
    return user;
}

export async function softDelete(req: Request, res: Response) {
    let user = await UserService.softDelete(req, res)
    return user;
};

export async function getProfile(req: Request, res: Response) {
    let user = await UserService.getProfile(req, res)
    return user;
};
