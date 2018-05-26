export class Task {

    constructor(
        public id?: number,
        public titulo?: string,
        public status?: string,
        public descricao?: string,
        public dataCriacao?: Date,
        public dataEdicao?: Date,
        public dataRemocao?: Date,
        public dataConclusao?: Date
    ){}

}