import {Payment} from '../../../service/create_payment/Payment';

export abstract class CreatePaymentUseCase {
    abstract createPayment(payment: Payment): Promise<void>;
}