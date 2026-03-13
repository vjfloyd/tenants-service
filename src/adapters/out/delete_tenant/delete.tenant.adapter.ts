import {Injectable} from '@nestjs/common';
import {DeleteTenantPort} from '@/application/ports/out/delete_tenant/delete.tenant.port';
import {TenantRepository} from '../get_tenants/tenant.repository';

@Injectable()
export class DeleteTenantAdapter implements DeleteTenantPort {
    constructor(private readonly tenantRepository: TenantRepository) {
    }

    async deleteByCode(code: string): Promise<void> {
        return this.tenantRepository.deleteByCode(code);
    }
}
