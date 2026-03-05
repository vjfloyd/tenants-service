import {Payment} from '@/application/domain/model/Payment.model';
import {GetPreviousPaymentPort} from '@/application/ports/out/get_payment/get_payment.port';
import {Injectable} from '@nestjs/common';
import {PaymentDocument} from '../common/collections/payments.schema';
import {PaymentDebt} from '../calculate_payment/model/payment.debt.model';
import {GetPaymentRepository} from '@/adapters/out/get_payment/get_payment.repository';


@Injectable()
export class GetPaymentAdapter implements GetPreviousPaymentPort {

    constructor(private readonly paymentRepository: GetPaymentRepository) {
    }


    async getPayment(year: number, month: number): Promise<PaymentDebt | null> {

        let prevMonth = month - 1;
        let prevYear = year;
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear = year - 1;
        }
        let result =
            await this.paymentRepository.findPaymentsByMonthYear(prevMonth, prevYear);

        if( !result){
            return null;
        }
        console.log('Actually has a payment ', result);

        return this.mapPaymentDocumentToPayment(result);
    }

    mapPaymentDocumentToPayment(doc: PaymentDocument): Payment {
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