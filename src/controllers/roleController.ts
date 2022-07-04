import { Request, Response, NextFunction } from 'express';
import * as RoleService from '../services/roleService';

export async function createRole(req: Request, res: Response, next: NextFunction) {
    let role = await RoleService.createRole(req, res);
    return role;
}

export async function get(req: Request, res: Response, next: NextFunction) {
    let roles = await RoleService.get(req, res);
    return roles;
}
