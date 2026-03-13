import {Controller, Delete, Param} from '@nestjs/common';
import {DeleteTenantUseCase} from '@/application/ports/in/delete_tenant/delete.tenant.usecase';

@Controller('v1/tenants')
export class DeleteTenantController {
    constructor(private readonly deleteTenantUseCase: DeleteTenantUseCase) {
    }

    @Delete(':code')
    async delete(@Param('code') code: string): Promise<void> {
        return this.deleteTenantUseCase.deleteTenantByCode(code);
    }
}
