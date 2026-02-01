import {Controller, Get, Query} from '@nestjs/common';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {GetTenantsUseCase} from '../../../application/ports/in/get_tenant/get.tenant.usecase';
import {TenantInfo} from '../../../application/domain/model/TenantInfo';

@Controller('v1/tenants')
export class GetTenantController {
  constructor(private readonly getTenantsUseCase: GetTenantsUseCase) {}

  @Get()
  async get(): Promise<Tenant[]> {
    return this.getTenantsUseCase.findAll();
  }

  @Get('/comsumption')
  async getTenantsInfo(@Query('month') month: number,
                       @Query('year') year: number): Promise<TenantInfo[]> {
    return this.getTenantsUseCase.findTenantsInfo(month, year);
  }

}
