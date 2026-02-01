import {Body, Controller, Post} from '@nestjs/common';
import {PaymentRequest} from './payment.request';
import {CalculatePaymentUseCase} from '../../../application/ports/in/calculate_payment/calculate.payment.usecase';
import {PaymentResponse} from './payment.response';

@Controller('v1/payments/calculate')
export class CalculatePaymentController {

    constructor(
        private readonly calculatePaymentUseCase : CalculatePaymentUseCase
    ){}

    @Post()
    async calculatePayment(@Body() payment: PaymentRequest): Promise<PaymentResponse[]> {
        console.log("CalculatePaymentController - calculatePayment called with:", payment);
        return this.calculatePaymentUseCase.calculatePayment(payment);
    }
}