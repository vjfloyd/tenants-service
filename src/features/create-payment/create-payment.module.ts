// src/features/create-payment/create-payment.module.ts
import {Module} from '@nestjs/common';
import {CreatePaymentController} from '@/adapters/in/create_payment/create.payment.controller';
import {CreatePaymentService} from '@/application/service/create_payment/create.payment.service';
import {CreatePaymentUseCase} from '@/application/ports/in/create_payment/create.tenat.usecase';
import {PaymentPortsModule} from '@/features/shared/payment-ports.module';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

const createPaymentProviders = [
    {
        provide: CreatePaymentUseCase,
        useClass: CreatePaymentService,
    }
];

@Module({
    imports: [
        DatabaseModelsModule,
        PaymentPortsModule,
    ],
    controllers: [CreatePaymentController],
    providers: createPaymentProviders,
})
export class CreatePaymentModule {
}