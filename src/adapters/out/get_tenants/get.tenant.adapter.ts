import {Injectable} from '@nestjs/common';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {GetTenantsPort} from '../../../application/ports/out/get_tenant/get.tenats.port';
import {TenantRepository} from './tenant.repository';

@Injectable()
export class GetTenantAdapter implements GetTenantsPort {

  constructor(private readonly tenantRepository: TenantRepository) {
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.findAll();
  }
}