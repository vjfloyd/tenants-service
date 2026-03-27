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
        console.log('Serializing user:', user.id);
        done(null, user.id);
    }

    async deserializeUser(
        id: string,
        done: (err: Error | null, user: User | null) => void,
    ): Promise<any> {
        try {
            console.log('Deserializing user:', id);
            const user = await this.userPort.findById(id);
            if (!user) {
                console.warn('User not found during deserialization:', id);
            }
            done(null, user);
        } catch (err) {
            console.error('Error during deserialization:', err);
            done(err, null);
        }
    }
}
