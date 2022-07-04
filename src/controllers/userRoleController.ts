import { Request, Response, NextFunction } from 'express';
import * as UserRoleService from '../services/userRoleService';

export async function createUserRole(req: Request, res: Response, next: NextFunction) {
    let userRole = await UserRoleService.createUserRole(req, res);
    return userRole;
}