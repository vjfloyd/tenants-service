import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PaymentDocument, Payments} from '../common/collections/payments.schema';

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectModel(Payments.name) private paymentModel: Model<PaymentDocument>,
    ) {}

    async findPaymentsByMonthYear(month: number, year: number): Promise<PaymentDocument | null> {
        return this.paymentModel.findOne({month: month, year: year}).lean().exec();
    }

    async updatePayment(paymentId: string, payment: Partial<PaymentDocument>): Promise<void> {
        await this.paymentModel.updateOne({ paymentId: paymentId }, { $set: payment });
    }

    
}
