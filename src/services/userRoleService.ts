import { Request, Response, NextFunction } from 'express';
import UserRole from '../models/userRole';

export async function createUserRole(req: Request, res: Response) {
    UserRole.create(req.body)
        .then(function (dbUserRole) {
            // return User.findOneAndUpdate({ _id: req.params.id }, { user_role: dbUserRole._id }, { new: true });
        })
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            res.json(err);
        });
}