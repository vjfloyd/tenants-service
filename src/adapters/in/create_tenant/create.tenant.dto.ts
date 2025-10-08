import {IsNotEmpty, IsNumber, IsString, Max, Min} from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  floor: number;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;

}