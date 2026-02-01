import {Tenant} from '../../../domain/model/tenant.model';
import {TenantInfo} from '../../../domain/model/TenantInfo';

export abstract class GetTenantsUseCase {
    abstract findAll(): Promise<Tenant[]>;
    abstract findTenantsInfo(month: number, year: number): Promise<TenantInfo[]>;
}