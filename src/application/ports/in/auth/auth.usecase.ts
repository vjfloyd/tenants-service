import {User} from '@/application/domain/model/user.model';

export abstract class AuthUseCase {
    abstract validateUser(
        email: string,
        name: string,
        provider: string,
        providerId: string,
        picture?: string,
    ): Promise<User>;
}
