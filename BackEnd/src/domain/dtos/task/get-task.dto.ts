export class GetTaskDto {
    constructor(
        public id: string,
        public userID: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, GetTaskDto?] {
        const { id, userID } = object;
        if (!id) return ['Task ID is required'];
        if (!userID) return ['User is required'];
        
        return [
            undefined,
            new GetTaskDto(id, userID)
        ];
    }
}
