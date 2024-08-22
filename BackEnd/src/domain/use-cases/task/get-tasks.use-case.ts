import { GetTasksDto } from "../../dtos/task/get-tasks.dto";
import { TaskRepository } from "../../repositories/task.repository";

interface Task {
    id: string;
    title: string;
    description: string;
    isFinished: boolean;
}

interface GetTasksUseCase {
    execute(getTasksDto: GetTasksDto): Promise<Task[]>;
}

export class GetTasks implements GetTasksUseCase {
    constructor(
        private readonly taskRepository: TaskRepository,

    ) { }
    
    async execute(getTasksDto: GetTasksDto): Promise<Task[]> {
        const tasks = await this.taskRepository.getTasks(getTasksDto);
        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            isFinished: task.isFinished
        }));
    }
}