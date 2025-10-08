import {Tenant} from '../../../domain/model/tenant.model';

export abstract class GetTenantsUseCase {
    abstract findAll(): Promise<Tenant[]>;
}