import {IsNumber, IsOptional, IsString} from 'class-validator';
import {Expose} from 'class-transformer';


export class TenantConsumption {
    @IsNumber()
    floor: number;

    @IsNumber()
    consumption: number;

    @IsString()
    @Expose({ name: 'code' })
    tenantCode: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    debt: number;
}
