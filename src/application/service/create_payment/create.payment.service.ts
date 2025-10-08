import {Injectable} from '@nestjs/common';
import {CreatePaymentUseCase} from '../../ports/in/create_payment/create.tenat.usecase';
import {Payment} from './Payment';
import {CreatePaymentPort} from '../../ports/out/create_payment/create_payment.port';

@Injectable()
export class CreatePaymentService implements CreatePaymentUseCase {
    constructor(
        private readonly createPaymentPort: CreatePaymentPort
    ) {
    }

    createPayment(payment: Payment): Promise<void> {
        console.log('Creating  payment:', payment);
        return this.createPaymentPort.createPayment(payment);
    }

}