import {Tenant} from 'src/application/service/create_tenant/Tenant';
import {CreateTenantUseCase} from '../../ports/in/create_tenant/create.tenat.usecase';
import {Injectable} from '@nestjs/common';
import {CreateTenantPort} from '../../ports/out/create_tenant/create.tenant.port';


@Injectable()
export class CreateTenantService implements CreateTenantUseCase {
    constructor(
        private readonly createTenantPort: CreateTenantPort
    ) {
    }

    async createTenant(tenant: Tenant): Promise<void> {

        await this.createTenantPort.save(tenant);
    }

}