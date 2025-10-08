import {TenantConsumption} from '../../ports/in/calculate_payment/TenantConsumption';

export interface Payment {
    month: number;
    year: number;
    totalConsumption: number;
    totalAmount: number;
    engineConsumption: number;
    tenants: TenantConsumption[]
}