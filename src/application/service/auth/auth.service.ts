import {Injectable} from '@nestjs/common';
import {AuthUseCase} from '@/application/ports/in/auth/auth.usecase';
import {UserPort} from '@/application/ports/out/auth/user.port';
import {User} from '@/application/domain/model/user.model';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class AuthService implements AuthUseCase {
    constructor(private readonly userPort: UserPort) {
    }

    async validateUser(
        email: string,
        name: string,
        provider: string,
        providerId: string,
        picture?: string,
    ): Promise<User> {
        console.log(`Validating user: ${email}, provider: ${provider}, providerId: ${providerId}`);
        const user = await this.userPort.findByEmail(email);

        if (user) {
            console.log(`User found: ${user.id}. Updating...`);
            // If user exists but from different provider, you might want to handle it (merge or error)
            // For now, update user info from provider
            const updatedUser = new User(
                user.id,
                email,
                name,
                provider,
                providerId,
                picture || user.picture,
            );
            return this.userPort.update(updatedUser);
        }

        console.log(`User not found for email: ${email}. Creating new user.`);
        // New user sign up
        const newUser = new User(
            uuidv4(),
            email,
            name,
            provider,
            providerId,
            picture,
        );
        return this.userPort.save(newUser);
    }
}
