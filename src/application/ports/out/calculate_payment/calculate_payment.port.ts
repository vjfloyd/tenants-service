import {PaymentDebt} from '../../../../adapters/out/calculate_payment/model/payment.debt.model';

export abstract class GetPreviousPaymentPort {
    abstract getPayment(year: number, month : number): Promise<PaymentDebt | null>;
}