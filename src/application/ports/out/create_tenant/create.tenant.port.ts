import {Tenant} from '../../../domain/model/tenant.model';

export abstract class CreateTenantPort {
    abstract save(tenant: Tenant): Promise<void>;
}