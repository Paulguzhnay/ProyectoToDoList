


export class TaskEntity {
    constructor(
        public id: string,
        public userID: string,
        public title: string,
        public description: string,
        public isFinished: boolean,
    ) {}
}