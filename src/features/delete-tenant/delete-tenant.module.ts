import {Module} from '@nestjs/common';
import {DeleteTenantController} from '@/adapters/in/delete_tenant/delete.tenant.controller';
import {DeleteTenantService} from '@/application/service/delete_tenant/delete.tenant.service';
import {DeleteTenantAdapter} from '@/adapters/out/delete_tenant/delete.tenant.adapter';
import {TenantRepository} from '@/adapters/out/get_tenants/tenant.repository';
import {DeleteTenantUseCase} from '@/application/ports/in/delete_tenant/delete.tenant.usecase';
import {DeleteTenantPort} from '@/application/ports/out/delete_tenant/delete.tenant.port';
import {DatabaseModelsModule} from '@/infrastructure/database/database-models.module';

const deleteTenantProviders = [
    {
        provide: DeleteTenantUseCase,
        useClass: DeleteTenantService,
    },
    {
        provide: DeleteTenantPort,
        useClass: DeleteTenantAdapter,
    },
    TenantRepository,
];

@Module({
    imports: [DatabaseModelsModule],
    controllers: [DeleteTenantController],
    providers: deleteTenantProviders,
})
export class DeleteTenantModule {
}
