import {CalculatePaymentUseCase} from '../../ports/in/calculate_payment/calculate.payment.usecase';
import {Injectable} from '@nestjs/common';
import {PaymentInfo} from '../../ports/in/calculate_payment/Payment';
import {TenantConsumption} from '../../ports/in/calculate_payment/TenantConsumption';
import {GetPreviousPaymentPort} from '../../ports/out/calculate_payment/calculate_payment.port';
import {TenantDebtResult} from './tenant.debt.result';
import {PaymentDebt} from '../../../adapters/out/calculate_payment/model/payment.debt.model';


@Injectable()
export class CalculatePaymentService implements CalculatePaymentUseCase{

    constructor(
        private readonly getPreviousPaymentPort: GetPreviousPaymentPort) {
    }


    async calculatePayment(payment: PaymentInfo): Promise<TenantDebtResult[]> {
        // Implement the logic to calculate payment here
        // This is a placeholder implementation
        const tenantsCurrentConsumption: TenantConsumption[] = payment.tenants;
        const previousPayment: PaymentDebt  = await
            this.getPreviousPaymentPort.getPayment(payment.year, payment.month);


        const engineCurrent = payment.engineConsumption;

        const monthlyEngineConsumption = engineCurrent - previousPayment.engineConsumption;
        const engineDebt: number = monthlyEngineConsumption * 1.1;
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
                tenantName: tenantPrevious?.tenantName ?? '',
            };
            tenantsMap.set(tenantCurrent.tenantCode, tenantDebt);

        });
        firstFloorPay = payment.totalAmount - accDebt;

        let tenant  : TenantDebtResult | undefined = tenantsMap.get("P01");
        if( tenant){
            tenant.debt = Math.round((firstFloorPay)*100)/100;
            tenantsMap.set("P01", tenant);
        }

        return Array.from(tenantsMap.values());
    }


}
