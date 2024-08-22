import {
    CreateTaskDto,
    DeleteTaskDto,
    GetTasksDto,
    TaskDataSource,
    TaskEntity,
    TaskRepository,
    UpdateTaskDto
} from "../../domain";


export class TaskRepositoryImpl implements TaskRepository {
    constructor(
        private readonly taskDataSource: TaskDataSource,
    ) {}

    getTasks(getTasksDto: GetTasksDto): Promise<TaskEntity[]> {
        return this.taskDataSource.getTasks(getTasksDto);
    }

    createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskDataSource.createTask(createTaskDto);
    }
    
    updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        return this.taskDataSource.updateTask(updateTaskDto);
    }

    deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void> {
        return this.taskDataSource.deleteTask(deleteTaskDto);
    }
}