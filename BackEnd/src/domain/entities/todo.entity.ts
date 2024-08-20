


export class TodoEntity {
    constructor(
        public id: string,
        public userID: string,
        public title: string,
        public description: string,
        public isFinished: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}