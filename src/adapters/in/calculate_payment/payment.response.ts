export class PaymentResponse {
  tenantId: string;
  isTenant?: boolean;
  floor: number;
  firstFloor? : number;
  tenantName?: string;
  month?: number;
  debt: number;
}