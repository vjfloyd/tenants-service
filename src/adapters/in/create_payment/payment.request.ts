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
    tenantName: string;

    @IsNumber()
    floor: number;

    @IsNumber()
    consumption: number;
}