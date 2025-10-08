import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {PaymentRequest} from './payment.request';
import {CalculatePaymentUseCase} from '../../../application/ports/in/calculate_payment/calculate.payment.usecase';
import {PaymentResponse} from './payment.response';

@Controller('v1/payments/calculate')
export class CalculatePaymentController {

    constructor(
        private readonly calculatePaymentUseCase : CalculatePaymentUseCase
    ){}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async calculatePayment(@Body() payment: PaymentRequest): Promise<PaymentResponse[]>{
        return this.calculatePaymentUseCase.calculatePayment(payment);
    }
}