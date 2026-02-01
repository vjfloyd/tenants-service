import {Injectable} from '@nestjs/common';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {GetTenantsPort} from '../../../application/ports/out/get_tenant/get.tenats.port';
import {TenantRepository} from './tenant.repository';
import {TenantInfo} from 'src/application/domain/model/TenantInfo';

@Injectable()
export class GetTenantAdapter implements GetTenantsPort {

  constructor(private readonly tenantRepository: TenantRepository) {
  }

  async findTenantsInfo(month: number,year: number): Promise<TenantInfo[]> {
        return this.tenantRepository.findTenants(month, year);
  }

  async findAll(): Promise<Tenant[]> {
    return  this.tenantRepository.findAll().then(tenants => tenants.map(
        ({ code, name, floor}) => ({ code, name, floor})
    ));
  }
}