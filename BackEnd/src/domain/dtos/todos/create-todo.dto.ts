export class CreateTodoDTO {
    constructor(
        public title: string,
        public description: string,
        public isFinished: boolean,
    ) {}
}
