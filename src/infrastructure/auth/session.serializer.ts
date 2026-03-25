import {PassportSerializer} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {User} from '@/application/domain/model/user.model';
import {UserPort} from '@/application/ports/out/auth/user.port';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userPort: UserPort) {
        super();
    }

    serializeUser(user: User, done: (err: Error | null, user: string) => void): any {
        done(null, user.id);
    }

    async deserializeUser(
        id: string,
        done: (err: Error | null, user: User | null) => void,
    ): Promise<any> {
        try {
            const user = await this.userPort.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }
}
