import {CreateTenantDto} from './create.tenant.dto';
import {Tenant} from 'src/application/service/create_tenant/Tenant';
import {v4 as uuidv4} from 'uuid';


export function mapCreateTenantDtoToTenant(dto: CreateTenantDto): Tenant {
  return new Tenant(
    dto.name,
    dto.floor,
    dto.month,
    dto.year,
     uuidv4()
  );
}