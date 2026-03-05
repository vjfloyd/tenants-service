import {CalculatePaymentUseCase} from '../../ports/in/calculate_payment/calculate.payment.usecase';
import {Injectable} from '@nestjs/common';
import {PaymentInfo} from '../../ports/in/calculate_payment/Payment';
import {TenantConsumption} from '../../ports/in/calculate_payment/TenantConsumption';
import {GetPreviousPaymentPort} from '@/application/ports/out/get_payment/get_payment.port';
import {TenantDebtResult} from './tenant.debt.result';
import {PaymentDebt} from '../../../adapters/out/calculate_payment/model/payment.debt.model';
import {CreatePaymentPort} from '../../ports/out/create_payment/create_payment.port';
import {Payment} from '../create_payment/Payment';
import {Validations} from './validations';
import {DomainError} from '../common/domain.error';


@Injectable()
export class CalculatePaymentService implements CalculatePaymentUseCase{

    constructor(
        private readonly getPreviousPaymentPort: GetPreviousPaymentPort,
        private readonly createPaymentPort: CreatePaymentPort
    ) {

    }


    async calculatePayment(payment: PaymentInfo): Promise<TenantDebtResult[]> {

        Validations.validateDate(payment.month, payment.year);

        const previousPayment   : PaymentDebt = await  this.getPreviousPaymentOrFail(payment.year, payment.month)

        const tenantsCurrentConsumption: TenantConsumption[] = payment.tenants;
        const engineCurrent = payment.engineConsumption;
        const engineConsumption = engineCurrent - previousPayment.engineConsumption;
        const engineDebt: number = engineConsumption * 1.10;
        //TODO: round to 2 decimals


        const tenantsPreviousConsumption: TenantConsumption[] = previousPayment.tenants;
        let accDebt = 0;

        let firstFloorPay : number;
        const tenantsMap = new Map<string, TenantDebtResult>();

        tenantsCurrentConsumption.map(tenantCurrent => {
            const tenantPrevious = tenantsPreviousConsumption
                .find(tp => tp.tenantCode === tenantCurrent.tenantCode);

            let amountToPay = tenantCurrent.consumption - (tenantPrevious?.consumption ?? 0);

            if (tenantPrevious?.floor === 3 || tenantPrevious?.floor === 4) {
                // @ts-ignore
                amountToPay = amountToPay * 1.1 + engineDebt / 2;
                accDebt += amountToPay;
            }
            else if (tenantPrevious?.floor === 2 || tenantPrevious?.floor === 5) {
                // @ts-ignore
                amountToPay = amountToPay * 1.1;
                accDebt += amountToPay;
            }

            let tenantDebt : TenantDebtResult =  {
                tenantId: tenantCurrent.tenantCode,
                floor: tenantCurrent.floor,
                debt: Math.round(amountToPay*100)/100,
                name: tenantCurrent.name?? tenantPrevious?.name ?? '',
            };
            tenantCurrent.debt = tenantDebt.debt;
            tenantsMap.set(tenantCurrent.tenantCode, tenantDebt);

        });
        firstFloorPay = payment.totalAmount - accDebt;

        let firstFloorDebt = Math.round((firstFloorPay)*100)/100;
        let tenant : TenantDebtResult =  {
                tenantId: "P01",
                floor: 1,
                debt: firstFloorDebt
        }
        tenantsMap.set(tenant.tenantId, tenant);



        const totalDebt = Array.from(tenantsMap.values())
            .reduce((acc, current) => acc + current.debt, 0);
        console.log('total debt', totalDebt);

        const firstFloorTenant : TenantConsumption = {
            tenantCode: "P01",
            floor: 1,
            consumption: 0,
            name: "Store",
            debt: firstFloorDebt
        }
        payment.tenants.push(firstFloorTenant);

        await this.createPaymentPort.createPayment(this.mapToPayment(payment));

        return Array.from(tenantsMap.values());
    }


    async getPreviousPaymentOrFail(year: number, month: number) {
        const prev = await this.getPreviousPaymentPort.getPayment(year, month);

        if (!prev) {
            throw new DomainError(
                'Previous payment not found',
                'PAYMENT_NOT_FOUND' as any,
                404,
                { requestedYear: year, requestedMonth: month },
            );
        }

        return prev;
    }

    private mapToPayment(paymentInfo: PaymentInfo): Payment {
        // Map PaymentInfo to Payment model
        return {
            year: paymentInfo.year,
            month: paymentInfo.month,
            totalAmount: paymentInfo.totalAmount,
            engineConsumption: paymentInfo.engineConsumption,
            totalConsumption: paymentInfo.totalConsumption,
            tenants: paymentInfo.tenants.map(tc => ({
                tenantCode: tc.tenantCode,
                floor: tc.floor,
                consumption: tc.consumption,
                name: tc.name,
                debt: tc.debt
            }))
        };
    }

}
