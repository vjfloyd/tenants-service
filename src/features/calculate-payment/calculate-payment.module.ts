// src/features/calculate-payment/calculate-payment.module.ts
import {Module} from '@nestjs/common';
import {CalculatePaymentController} from '@/adapters/in/calculate_payment/calculate.payment.controller';
import {CalculatePaymentService} from '@/application/service/calculate_payment/calculate.payment.service';
import {GetPaymentAdapter} from '@/adapters/out/get_payment/get_payment.adapter';
import {CalculatePaymentUseCase} from '@/application/ports/in/calculate_payment/calculate.payment.usecase';
import {GetPreviousPaymentPort} from '@/application/ports/out/get_payment/get_payment.port';
import {PaymentPortsModule} from '@/features/shared/payment-ports.module';
import {GetPaymentRepository} from '@/adapters/out/get_payment/get_payment.repository';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

const calculatePaymentProviders = [
    {
        provide: CalculatePaymentUseCase,
        useClass: CalculatePaymentService,
    }
    ,
    {
        provide: GetPreviousPaymentPort,
        useClass: GetPaymentAdapter,
    },
    GetPaymentRepository,
    // CreatePaymentRepository
];

@Module({
    imports: [
        DatabaseModelsModule,
        PaymentPortsModule,
    ],
    controllers: [CalculatePaymentController],
    providers: calculatePaymentProviders,
})
export class CalculatePaymentModule {
}