import {Injectable} from '@nestjs/common';
import {DeleteTenantUseCase} from '../../ports/in/delete_tenant/delete.tenant.usecase';
import {DeleteTenantPort} from '../../ports/out/delete_tenant/delete.tenant.port';

@Injectable()
export class DeleteTenantService implements DeleteTenantUseCase {
    constructor(
        private readonly deleteTenantPort: DeleteTenantPort
    ) {
    }

    async deleteTenantByCode(code: string): Promise<void> {
        await this.deleteTenantPort.deleteByCode(code);
    }
}
