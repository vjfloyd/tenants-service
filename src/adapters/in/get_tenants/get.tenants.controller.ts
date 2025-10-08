import {Controller, Get} from '@nestjs/common';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {GetTenantsUseCase} from '../../../application/ports/in/get_tenant/get.tenant.usecase';

@Controller('v1/tenants')
export class GetTenantController {
  constructor(private readonly getTenantsUseCase: GetTenantsUseCase) {}

  @Get()
  async get(): Promise<Tenant[]> {
    return this.getTenantsUseCase.findAll();
  }
}
