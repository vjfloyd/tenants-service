import {PaymentInfo} from './Payment';

import {TenantDebtResult} from '../../../service/calculate_payment/tenant.debt.result';

export abstract class CalculatePaymentUseCase {
    abstract calculatePayment(payment: PaymentInfo): Promise<TenantDebtResult[]>;
}