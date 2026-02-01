
export class Payment {
  paymentId?: string | null;
  month: number;
  year: number;
  totalConsumption: number | undefined;
  totalAmount: number;
  engineConsumption: number;
  tenants: TenantConsumption[];
}

class TenantConsumption {
    tenantCode: string;
    name: string;
    floor: number;
    consumption: number;
    debt: number;
}
