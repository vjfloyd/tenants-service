import {Payment} from '../../../service/create_payment/Payment';


export abstract class CreatePaymentPort {
    abstract createPayment(tenant: Payment): Promise<void>;
}