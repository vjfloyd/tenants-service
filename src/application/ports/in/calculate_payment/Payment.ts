import {TenantConsumption} from './TenantConsumption';
import {IsArray, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class PaymentInfo {
    month: number;
    year: number;
    totalConsumption: number;
    totalAmount: number;
    engineConsumption: number;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TenantConsumption)
    tenants: TenantConsumption[];

}
