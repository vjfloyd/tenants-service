
export class Payment {
  paymentId?: string | null;
  month: number;
  year: number;
  totalConsumption: number;
  totalAmount: number;
  engineConsumption: number;
  tenants: TenantConsumption[];
}

class TenantConsumption {
    tenantCode: string;
    tenantName: string;
    floor: number;
    consumption: number;
}
