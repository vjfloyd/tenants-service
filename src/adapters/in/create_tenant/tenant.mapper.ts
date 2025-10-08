// src/adapters/in/create_tenant/create-tenant.mapper.ts
import {CreateTenantDto} from './create.tenant.dto';
import {Tenant} from 'src/application/service/create_tenant/Tenant';


export function mapCreateTenantDtoToTenant(dto: CreateTenantDto): Tenant {
  return new Tenant(
    dto.name,
    dto.floor,
    dto.month,
    dto.year,
      '' // Provide a default if code is missing
  );
}