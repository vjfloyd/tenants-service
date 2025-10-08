import {CreatePaymentPort} from '../../../application/ports/out/create_payment/create_payment.port';
import {Payment} from '../../../application/service/create_payment/Payment';
import {CreatePaymentRepository} from './create.payment.repository';
import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class CreatePaymentAdapter implements CreatePaymentPort {

    constructor(private readonly createPaymentRepository: CreatePaymentRepository) {
    }

    createPayment(payment: Payment): Promise<void> {
        payment.paymentId = uuidv4(); // Ensure payment has a unique ID
        return this.createPaymentRepository.createPayment(payment);
    }


}