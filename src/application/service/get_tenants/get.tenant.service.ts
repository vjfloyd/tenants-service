import {Injectable} from '@nestjs/common';
import {Tenant} from '../../domain/model/tenant.model';
import {GetTenantsPort} from '../../ports/out/get_tenant/get.tenats.port';
import {GetTenantsUseCase} from '../../ports/in/get_tenant/get.tenant.usecase';
import {TenantInfo} from '../../domain/model/TenantInfo';

@Injectable()
export class GetTenantService implements GetTenantsUseCase{
  constructor(
    private readonly getTenantPort: GetTenantsPort
  ) {}

  findAll(): Promise<Tenant[]> {
    return this.getTenantPort.findAll();
  }

  findTenantsInfo( month: number, year: number): Promise<TenantInfo[]> {
    return this.getTenantPort.findTenantsInfo(month, year);
  }

}
