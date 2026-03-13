export abstract class DeleteTenantUseCase {
    abstract deleteTenantByCode(code: string): Promise<void>;
}
