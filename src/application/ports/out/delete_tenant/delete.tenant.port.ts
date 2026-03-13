export abstract class DeleteTenantPort {
    abstract deleteByCode(code: string): Promise<void>;
}
