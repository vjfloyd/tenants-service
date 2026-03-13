import {Test, TestingModule} from '@nestjs/testing';
import {DeleteTenantController} from '@/adapters/in/delete_tenant/delete.tenant.controller';
import {DeleteTenantUseCase} from '@/application/ports/in/delete_tenant/delete.tenant.usecase';

describe('DeleteTenantController', () => {
    let controller: DeleteTenantController;
    let deleteTenantUseCase: DeleteTenantUseCase;

    beforeEach(async () => {
        const mockDeleteTenantUseCase = {
            deleteTenantByCode: jest.fn().mockResolvedValue(undefined),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [DeleteTenantController],
            providers: [
                {
                    provide: DeleteTenantUseCase,
                    useValue: mockDeleteTenantUseCase,
                },
            ],
        }).compile();

        controller = module.get<DeleteTenantController>(DeleteTenantController);
        deleteTenantUseCase = module.get<DeleteTenantUseCase>(DeleteTenantUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('delete', () => {
        it('should delete a tenant by code', async () => {
            const tenantCode = 'TENANT-123';

            await controller.delete(tenantCode);

            expect(deleteTenantUseCase.deleteTenantByCode).toHaveBeenCalledWith(tenantCode);
            expect(deleteTenantUseCase.deleteTenantByCode).toHaveBeenCalledTimes(1);
        });

        it('should call deleteTenantByCode with correct parameter', async () => {
            const tenantCode = 'TEST-CODE-456';

            await controller.delete(tenantCode);

            expect(deleteTenantUseCase.deleteTenantByCode).toHaveBeenCalledWith(tenantCode);
        });
    });
});
