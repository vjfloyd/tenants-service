import {Payment} from 'src/application/domain/model/Payment.model';
import {GetPreviousPaymentPort} from '../../../application/ports/out/calculate_payment/calculate_payment.port';
import {Injectable} from '@nestjs/common';
import {PaymentRepository} from './payment.repository';
import {PaymentDocument} from '../common/collections/payments.schema';
import {PaymentDebt} from './model/payment.debt.model';


@Injectable()
export class CalculatePaymentAdapter implements GetPreviousPaymentPort {

    constructor(private readonly paymentRepository: PaymentRepository) {
    }


    async getPayment(year: number, month: number): Promise<PaymentDebt> {

        let prevMonth = month - 1;
        let prevYear = year;
        if (month < 1) {
            prevMonth = 12;
            prevYear = year - 1;
        }
        let result =
            await this.paymentRepository.findPaymentsByMonthYear(prevMonth, prevYear);

        console.log('results', result);

        // const paymentResponse: PaymentDocument | null = results[0] ?? null;


        return this.mapPaymentDocumentToPayment(result);
    }

    mapPaymentDocumentToPayment(doc: PaymentDocument| null): Payment {
        if (!doc) {
            return {
                month: 0,
                year: 0,
                totalConsumption: 0,
                totalAmount: 0,
                engineConsumption: 0,
                tenants: [],
            };
        }
        return {
            month: doc.month,
            year: doc.year,
            totalConsumption: doc.totalConsumption,
            totalAmount: doc.totalAmount,
            engineConsumption: doc.engineConsumption,
            tenants: doc.tenants ?? [],
        };
    }

}