import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function login(req: any, res: Response, next: NextFunction) {
    let auth = await authService.login(req, res)
    return auth;
}
