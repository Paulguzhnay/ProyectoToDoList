import { TaskModel } from '../../data/mongodb';
import {
    CreateTaskDto,
    CustomError,
    DeleteTaskDto,
    GetTaskDto,
    TaskDataSource,
    TaskEntity,
    UpdateTaskDto
} from '../../domain';
import { TaskMapper } from '../mappers/task.mapper';

export class TaskDataSourceImpl implements TaskDataSource {

    constructor() { }
    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { title, description, userID } = createTaskDto;
        try {
            const task = await TaskModel.create({
                title,
                description,
                userID
            });

            return TaskMapper.taskEntityFromObject(task);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();   
        }
    }

    async updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const { id, userID, description, title, isFinished, updatedAt } = updateTaskDto;
    
        try {
            const updatedTask = await TaskModel.findOneAndUpdate(
                { _id: id, userID },
                { description, title, isFinished, updatedAt },
                { new: true }
            );
    
            if (!updatedTask) throw CustomError.notFound('Task not found');
            return TaskMapper.taskEntityFromObject(updatedTask);
    
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void> {
        const { id, userID } = deleteTaskDto;
        try {
            const deletedTask = await TaskModel.findOneAndDelete({ _id: id, userID });
            if (!deletedTask) throw CustomError.notFound('Task not found');

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();     
        }
    }

    getTask(getTaskDto: GetTaskDto): Promise<TaskEntity> {
        throw new Error('Method not implemented.');
    }

}