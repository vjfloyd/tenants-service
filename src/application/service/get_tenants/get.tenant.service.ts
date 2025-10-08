import {Injectable} from '@nestjs/common';
import {Tenant} from '../../domain/model/tenant.model';
import {GetTenantsPort} from '../../ports/out/get_tenant/get.tenats.port';
import {GetTenantsUseCase} from '../../ports/in/get_tenant/get.tenant.usecase';

@Injectable()
export class GetTenantService implements GetTenantsUseCase{
  constructor(
    private readonly getTenantPort: GetTenantsPort
  ) {}

  findAll(): Promise<Tenant[]> {
    return this.getTenantPort.findAll();
  }
}
