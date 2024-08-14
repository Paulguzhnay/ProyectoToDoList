import { TodoEntity } from '../../entities/todo.entity';

export interface ITodoRepository {
    create(todo: TodoEntity): Promise<TodoEntity>;
    findById(id: string): Promise<TodoEntity | null>;
    findAll(): Promise<TodoEntity[]>;
    update(id: string, todo: Partial<TodoEntity>): Promise<TodoEntity | null>;
    delete(id: string): Promise<void>;
}

export class TodoRepository implements ITodoRepository {
    private todos: TodoEntity[] = [];

    async create(todo: TodoEntity): Promise<TodoEntity> {
        this.todos.push(todo);
        return todo;
    }

    async findById(id: string): Promise<TodoEntity | null> {
        return this.todos.find(todo => todo.id === id) || null;
    }

    async findAll(): Promise<TodoEntity[]> {
        return this.todos;
    }

    async update(id: string, todo: Partial<TodoEntity>): Promise<TodoEntity | null> {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return null;

        this.todos[index] = { ...this.todos[index], ...todo, updatedAt: new Date() };
        return this.todos[index];
    }

    async delete(id: string): Promise<void> {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
