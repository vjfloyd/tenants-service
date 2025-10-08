export class TenantDebt {
  tenantId: string;
  tenantName: string;
  floor: number | undefined;
  debt: number | undefined;
  month: number | undefined;
  isTenant:boolean | undefined;
  consumption: number | undefined;


  constructor(
       tenantId: string,
       tenantName: string,
       floor: number,
       debt: number,
       consumption: number,
       month: number,
      isTenant:boolean) {
    this.tenantId = tenantId;
    this.tenantName = tenantName;
    this.floor = floor;
    this.debt = debt;
    this.month = month;
    this.isTenant = isTenant;
    this.consumption = consumption;
  }

}