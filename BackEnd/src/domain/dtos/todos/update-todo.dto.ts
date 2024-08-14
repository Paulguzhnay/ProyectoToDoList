export class UpdateTodoDTO {
    constructor(
        public title?: string,
        public description?: string,
        public isFinished?: boolean,
    ) {}
}
