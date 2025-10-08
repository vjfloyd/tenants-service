export class Tenant {
    name: string;
    floor: number;
    month: number;
    year: number;
    code: string;

    constructor(
        name: string,
        floor: number,
        month: number,
        year: number,
        code: string
    ) {
        this.name = name;
        this.floor = floor;
        this.month = month;
        this.year = year
        this.code = code;
    }
}