import {TenantConsumption} from './TenantConsumption';

export class PaymentDebt {
    month: number;
    year: number;
    totalConsumption: number;
    totalAmount: number;
    engineConsumption: number;
    tenants: TenantConsumption[];

}

