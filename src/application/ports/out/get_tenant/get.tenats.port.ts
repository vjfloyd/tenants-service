import {Tenant} from '../../../domain/model/tenant.model';

export abstract class GetTenantsPort {
    abstract findAll(): Promise<Tenant[]>;
}