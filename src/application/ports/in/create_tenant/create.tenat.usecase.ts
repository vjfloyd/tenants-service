import {Tenant} from '../../../service/create_tenant/Tenant';

export abstract class CreateTenantUseCase {
    abstract createTenant(tenant: Tenant): Promise<void>;
}