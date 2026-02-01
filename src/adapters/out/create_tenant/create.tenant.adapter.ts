import {Injectable} from '@nestjs/common';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {CreateTenantPort} from '../../../application/ports/out/create_tenant/create.tenant.port';
import {TenantRepository} from '../get_tenants/tenant.repository';

@Injectable()
export class CreateTenantAdapter implements CreateTenantPort {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async save(tenant: Tenant): Promise<void> {
    // tenant.code = uuidv4(); // Ensure tenant has a unique code

    return this.tenantRepository.create(tenant);
  }
}