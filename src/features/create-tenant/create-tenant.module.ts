// src/features/create-tenant/create-tenant.module.ts
import {Module} from '@nestjs/common';
import {CreateTenantController} from '@/adapters/in/create_tenant/create.tenant.controller';
import {CreateTenantService} from '@/application/service/create_tenant/create.tenant.service';
import {CreateTenantAdapter} from '@/adapters/out/create_tenant/create.tenant.adapter';
import {TenantRepository} from '@/adapters/out/get_tenants/tenant.repository';
import {CreateTenantUseCase} from '@/application/ports/in/create_tenant/create.tenat.usecase';
import {CreateTenantPort} from '@/application/ports/out/create_tenant/create.tenant.port';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

const createTenantProviders = [
    {
        provide: CreateTenantUseCase,
        useClass: CreateTenantService,
    },
    {
        provide: CreateTenantPort,
        useClass: CreateTenantAdapter,
    },
    TenantRepository,
];

@Module({
    imports: [DatabaseModelsModule],
    controllers: [CreateTenantController],
    providers: createTenantProviders,
})
export class CreateTenantModule {
}