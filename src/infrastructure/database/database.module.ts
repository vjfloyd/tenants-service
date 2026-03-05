// src/infrastructure/database/database.module.ts
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService} from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const uri = config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/tenants');

                const sanitizedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
                console.log('🔍 Connecting to MongoDB:', sanitizedUri);
                console.log('🔍 Environment:', process.env.NODE_ENV || 'local');

                return {
                    uri,
                    retryAttempts: 3,
                    retryDelay: 1000,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {
}