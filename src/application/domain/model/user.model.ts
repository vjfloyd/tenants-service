export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly provider: string,
        public readonly providerId: string,
        public readonly picture?: string,
    ) {
    }
}
