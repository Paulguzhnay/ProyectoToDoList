import { Request, Response } from 'express';
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from '../../domain';

export class AuthController {
    // Dependency injection
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then( data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then( data => res.json(data))
            .catch(error => this.handleError(error, res));
    }
}