import {IsArray, IsNumber, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {TenantConsumption} from './tenants';

export class  PaymentRequest {

    @IsNumber()
    month: number;
    @IsNumber()
    year: number;
    @IsNumber()
    totalConsumption: number;
    @IsNumber()
    totalAmount: number;
    @IsNumber()
    engineConsumption: number;
    @IsArray()
    @Type(() => TenantConsumption)
    @ValidateNested({each: true})
    tenants: TenantConsumption[];

}

