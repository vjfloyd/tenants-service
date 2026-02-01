import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';

export class PaymentRequest {

    @IsOptional()
    @IsString()
    paymentId?: string | null;
    @IsNumber()
    month: number;
    @IsNumber()
    year: number;
    @IsNumber()
    @IsOptional()
    totalConsumption: number;
    @IsNumber()
    totalAmount: number;
    @IsNumber()
    engineConsumption: number;
    @IsArray()
    tenants: TenantConsumptionRequest[];


}

 class TenantConsumptionRequest {
    @IsString()
    tenantCode: string;

    @IsString()
    name: string;

    @IsNumber()
    floor: number;

    @IsNumber()
    consumption: number;

    @IsNumber()
    debt: number;
}