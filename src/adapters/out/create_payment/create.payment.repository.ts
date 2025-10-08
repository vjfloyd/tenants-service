import {Injectable} from '@nestjs/common';
import {Payment} from '../../../application/service/create_payment/Payment';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PaymentDocument} from '../common/collections/payments.schema';

@Injectable()
export class CreatePaymentRepository {
    constructor(
        @InjectModel('Payments') private readonly paymentModel: Model<PaymentDocument>,
    ) {}


    async createPayment(payment: Payment): Promise<void> {
        // Implement the logic to save the payment to the database
        await this.paymentModel.create(payment);
        console.log('Payment saved:');

    }

}