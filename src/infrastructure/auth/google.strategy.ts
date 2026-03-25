import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AuthUseCase} from '@/application/ports/in/auth/auth.usecase';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authUseCase: AuthUseCase,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID') || 'dummy-id',
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || 'dummy-secret',
            callbackURL: configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:4000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const {name, emails, photos, id} = profile;
        const user = await this.authUseCase.validateUser(
            emails[0].value,
            name.givenName + ' ' + name.familyName,
            'google',
            id,
            photos[0].value,
        );
        done(null, user);
    }
}
