import {Body, Controller, Post} from '@nestjs/common';
import {CreateTenantDto} from './create.tenant.dto';
import {CreateTenantUseCase} from '../../../application/ports/in/create_tenant/create.tenat.usecase';
import {mapCreateTenantDtoToTenant} from './tenant.mapper';

@Controller('v1/tenants')
export class CreateTenantController {
  constructor(private readonly createTenantUseCase: CreateTenantUseCase) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto): Promise<void> {
    const tenant  =  mapCreateTenantDtoToTenant(createTenantDto);
    return this.createTenantUseCase.createTenant(tenant);
  }
}
