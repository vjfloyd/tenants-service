export class PaymentResponse {
  constructor(
    public readonly tenantId: string,
    public readonly amount: number,
    public readonly paymentDate: Date,
    public readonly status: string,
  ) {}
}
