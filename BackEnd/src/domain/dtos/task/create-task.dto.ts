
export class CreateTaskDto {
    constructor(
        public title: string,
        public description: string,
        public userID: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateTaskDto?] {
        const { title, description, userID } = object;
        if (!title) return ['Title is required'];
        if (!description) return ['Description is required'];
        if (!userID) return ['User is required'];
        
        return [
            undefined,
            new CreateTaskDto(title.trim(), description.trim(), userID)
        ];
    }
}
