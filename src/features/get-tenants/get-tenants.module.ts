// src/features/get-tenants/get-tenants.module.ts
import {Module} from '@nestjs/common';
import {GetTenantController} from '@/adapters/in/get_tenants/get.tenants.controller';
import {GetTenantService} from '@/application/service/get_tenants/get.tenant.service';
import {GetTenantAdapter} from '@/adapters/out/get_tenants/get.tenant.adapter';
import {TenantRepository} from '@/adapters/out/get_tenants/tenant.repository';
import {GetTenantsUseCase} from '@/application/ports/in/get_tenant/get.tenant.usecase';
import {GetTenantsPort} from '@/application/ports/out/get_tenant/get.tenats.port';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

const getTenantsProviders = [
    {
        provide: GetTenantsUseCase,
        useClass: GetTenantService,
    },
    {
        provide: GetTenantsPort,
        useClass: GetTenantAdapter,
    },
    TenantRepository,
];

@Module({
    imports: [DatabaseModelsModule],
    controllers: [GetTenantController],
    providers: getTenantsProviders,
    exports: [TenantRepository],
})
export class GetTenantsModule {
}