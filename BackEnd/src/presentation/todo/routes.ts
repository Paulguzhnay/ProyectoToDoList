import { Router } from 'express';
import { CreateTodoUseCase } from '../../domain/use-cases/todos/create-todo.usecase';
import { GetTodoUseCase } from '../../domain/use-cases/todos/get-todo.usecase';
import { ListTodosUseCase } from '../../domain/use-cases/todos/list-todos.usecase';
import { UpdateTodoUseCase } from '../../domain/use-cases/todos/update-todo.usecase';
import { DeleteTodoUseCase } from '../../domain/use-cases/todos/delete-todo.usecase';
import { TodoRepository } from '../../domain/repositories/todos/todo.repository';

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        // Instancias de los casos de uso y el repositorio
        const todoRepository = new TodoRepository();
        const createTodoUseCase = new CreateTodoUseCase(todoRepository);
        const getTodoUseCase = new GetTodoUseCase(todoRepository);
        const listTodosUseCase = new ListTodosUseCase(todoRepository);
        const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
        const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

        // Ruta para crear una tarea
        router.post('/', async (req, res) => {
            const todo = await createTodoUseCase.execute(req.body);
            res.status(201).json(todo);
        });

        // Ruta para obtener una tarea por su ID
        router.get('/:id', async (req, res) => {
            const todo = await getTodoUseCase.execute(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.json(todo);
        });

        // Ruta para obtener todas las tareas
        router.get('/', async (req, res) => {
            const todos = await listTodosUseCase.execute();
            res.json(todos);
        });

        // Ruta para actualizar una tarea
        router.put('/:id', async (req, res) => {
            const todo = await updateTodoUseCase.execute(req.params.id, req.body);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.json(todo);
        });

        // Ruta para eliminar una tarea
        router.delete('/:id', async (req, res) => {
            await deleteTodoUseCase.execute(req.params.id);
            res.status(204).send();
        });

        return router;
    }
}
