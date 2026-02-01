import {CreatePaymentPort} from '../../../application/ports/out/create_payment/create_payment.port';
import {Payment} from '../../../application/service/create_payment/Payment';
import {CreatePaymentRepository} from './create.payment.repository';
import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {PaymentRepository} from '../calculate_payment/payment.repository';
import {PaymentDocument} from '../common/collections/payments.schema';

@Injectable()
export class CreatePaymentAdapter implements CreatePaymentPort {

    constructor(private readonly createPaymentRepository: CreatePaymentRepository,
                private readonly paymentRepository: PaymentRepository) {
    }

    async createPayment(payment: Payment): Promise<void> {
        payment.paymentId = uuidv4(); // Ensure payment has a unique ID
        let paymentRecord  : PaymentDocument | null =
            await this.paymentRepository.findPaymentsByMonthYear(payment.month, payment.year);
        if (paymentRecord) {
            // Update the existing payment record
            const paymentUpdatePayload = toPaymentDocument(payment, paymentRecord);
            await this.paymentRepository.updatePayment(paymentRecord.paymentId, paymentUpdatePayload);
            return;
        }
        return this.createPaymentRepository.createPayment(payment);
    }


}

// Mapper function to convert Payment domain model to a partial PaymentDocument
const toPaymentDocument = (payment: Payment, paymentDocument: PaymentDocument): Partial<PaymentDocument> => {
    return {
        paymentId: paymentDocument.paymentId,
        month: payment.month,
        year: payment.year,
        totalConsumption: payment.totalConsumption,
        totalAmount: payment.totalAmount,
        engineConsumption: payment.engineConsumption,
        tenants: payment.tenants,
    };
};