import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from '@/adapters/in/auth/auth.controller';
import {AuthService} from '@/application/service/auth/auth.service';
import {AuthUseCase} from '@/application/ports/in/auth/auth.usecase';
import {UserPort} from '@/application/ports/out/auth/user.port';
import {UserAdapter} from '@/adapters/out/auth/user.adapter';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';
import {GoogleStrategy} from '@/infrastructure/auth/google.strategy';
import {SessionSerializer} from '@/infrastructure/auth/session.serializer';

@Module({
    imports: [
        DatabaseModelsModule,
        PassportModule.register({session: true}),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthUseCase,
            useClass: AuthService,
        },
        {
            provide: UserPort,
            useClass: UserAdapter,
        },
        GoogleStrategy,
        SessionSerializer,
    ],
})
export class AuthModule {
}
