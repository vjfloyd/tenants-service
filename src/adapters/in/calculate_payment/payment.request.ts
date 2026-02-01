import {IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {Expose, Type} from 'class-transformer';
import {TenantConsumption} from './tenants';

export class  PaymentRequest {

    @IsNumber()
    @IsNotEmpty()
    month: number;
    @IsNumber()
    @IsNotEmpty()
    year: number;
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    totalConsumption: number;
    @IsNumber()
    @IsNotEmpty()
    @Expose({ name: 'amount' })
    totalAmount: number;
    @IsNumber()
    @IsNotEmpty()
    @Expose({ name: 'engine' })
    engineConsumption: number;
    @IsArray()
    @IsNotEmpty()
    @Type(() => TenantConsumption)
    @ValidateNested({each: true})
    tenants: TenantConsumption[];

}

