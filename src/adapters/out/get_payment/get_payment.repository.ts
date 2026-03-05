import {PaymentDocument} from '@/adapters/out/common/collections/payments.schema';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class GetPaymentRepository {

    constructor(@InjectModel('Payments') private paymentModel: Model<PaymentDocument>) {
    }

    async findPaymentsByMonthYear(month: number, year: number): Promise<PaymentDocument | null> {
        return this.paymentModel.findOne({month: month, year: year}).lean().exec();
    }

}