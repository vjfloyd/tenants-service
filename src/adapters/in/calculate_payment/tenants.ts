import {IsNumber, IsString} from 'class-validator';


export class TenantConsumption {
    @IsNumber()
    floor: number;

    @IsNumber()
    consumption: number;

    @IsString()
    tenantCode: string;

    @IsString()
    tenantName: string;
}
