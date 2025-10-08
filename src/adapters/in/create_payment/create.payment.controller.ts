import {Body, Controller, Post} from '@nestjs/common';
import {PaymentRequest} from './payment.request';
import {CreatePaymentUseCase} from '../../../application/ports/in/create_payment/create.tenat.usecase';

@Controller('v1/payments')
export class CreatePaymentController {

    constructor(
        private readonly createPaymentUseCase : CreatePaymentUseCase
    ){}

    @Post()
    async calculatePayment(@Body() payment: PaymentRequest): Promise<void>{
        return this.createPaymentUseCase.createPayment(payment);
    }
}