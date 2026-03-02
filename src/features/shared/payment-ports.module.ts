import {Module} from '@nestjs/common';
import {CreatePaymentPort} from '@/application/ports/out/create_payment/create_payment.port';
import {CreatePaymentAdapter} from '@/adapters/out/create_payment/create.payment.adapter';
import {CreatePaymentRepository} from '@/adapters/out/create_payment/create.payment.repository';
import {CalculatePaymentRepository} from '@/adapters/out/calculate_payment/calculate_payment.repository';
import {GetPaymentRepository} from '@/adapters/out/get_payment/get_payment.repository';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

@Module({
    imports: [DatabaseModelsModule],
    providers: [
        {
            provide: CreatePaymentPort,
            useClass: CreatePaymentAdapter
        },
        CreatePaymentRepository,
        CalculatePaymentRepository,
        GetPaymentRepository
    ],
    exports: [CreatePaymentPort, CreatePaymentRepository],
})

export class PaymentPortsModule {
}