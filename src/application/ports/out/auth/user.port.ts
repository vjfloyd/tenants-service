import {User} from '@/application/domain/model/user.model';

export abstract class UserPort {
    abstract findByEmail(email: string): Promise<User | null>;

    abstract findById(id: string): Promise<User | null>;

    abstract save(user: User): Promise<User>;

    abstract update(user: User): Promise<User>;
}
