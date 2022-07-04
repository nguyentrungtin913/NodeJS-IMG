import * as Yup from 'yup';
import { Request, Response, NextFunction } from "express";
import { setError } from '../helpers/errorHelper';
import * as userModel from "../models/user";

async function validate_email_password(req: Request, res: Response) {
    const email = req.body.email ?? '';
    const password = req.body.password ?? '';
    const create = {
        email,
        password
    };
    try {
        const schema = Yup.object().shape({
            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
        });
        await schema.validate(create, { abortEarly: false });
        return true;
    } catch (error) {
        const err = JSON.parse(JSON.stringify(error));
        let description = '';
        let msgKey = '';
        let code = ''
        if (err.errors) {
            switch (err.errors[0]) {
                case "Must be a valid email":
                    description = 'Must be a valid email';
                    msgKey = 'email.invalid';
                    code = 'email_invalid';
                    break;
                case "Email is required":
                    description = 'Email is required';
                    msgKey = 'email.required';
                    code = 'email_required';
                    break;
                case "Password is required":
                    description = 'password is required';
                    msgKey = 'password.required';
                    code = 'password_required';
                    break;
                default:
                    description = 'error';
                    msgKey = 'error';
                    code = 'error';
                    break;
            }
        }
        setError(res, 400, code, msgKey, description)
        return false;
    }
}

async function checkEmailExist(res: Response, email: any) {
    let user = await userModel.findByEmail(email);
    if (user) {
        setError(res, 400, "email_exist", "email.exist", "Email already exists");
        return false;
    }
    return true;
}

export async function create(req: Request, res: Response) {
    let email = ((req.body.email).toLowerCase()) ?? "";

    if (!(await validate_email_password(req, res)) || !(await checkEmailExist(res, email))) {
        return false;
    }
    return true;
}


export async function login(req: Request, res: Response) {
    if (!(await validate_email_password(req, res))) {
        return false;
    }
    return true;
}