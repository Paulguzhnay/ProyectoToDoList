import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class ToDoController {
    constructor(
        private readonly todoRepository: ToDoRepository;
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    createTask = (req: Request, res: Response) => {
        const [error, createToDoDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then( data => res.json(data))
            .catch(error => this.handleError(error, res));
    }
}