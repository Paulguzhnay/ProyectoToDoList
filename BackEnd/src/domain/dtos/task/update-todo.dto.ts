import { Validators } from "../../../config";

export class UpdateTaskDto {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public isFinished: boolean,
        public userID: string,
        public updatedAt: Date = new Date(),
    ) {}

    static create(object: {[key: string]: any}): [string?, UpdateTaskDto?] {
        const { id, title, description, isFinished, userID } = object;
        if (!id) return ['Task ID is required'];
        if (!title) return ['Title is required'];
        if (!Validators.text.test(title)) return ['Invalid title'];
        if (!description) return ['Description is required'];
        if (!Validators.text.test(description)) return ['Invalid description'];
        if (!userID) return ['User is required'];
        
        return [
            undefined,
            new UpdateTaskDto(id, title.trim(), description.trim(), isFinished, userID)
        ];
    }
}
