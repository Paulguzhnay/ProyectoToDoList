export class GetTasksDto {
    constructor(
        public userID: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, GetTasksDto?] {
        const { userID } = object;
        if (!userID) return ['User is required'];
        
        return [
            undefined,
            new GetTasksDto(userID)
        ];
    }
}
