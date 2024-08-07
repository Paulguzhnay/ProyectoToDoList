import { Request, Response } from 'express';

export class AuthController {

    constructor() { }

    registerUser = (req: Request, res: Response) => {
        res.json({ message: 'User registered' });
    }

    loginUser = (req: Request, res: Response) => {
        res.json({ message: 'User logged in' });
    }
}