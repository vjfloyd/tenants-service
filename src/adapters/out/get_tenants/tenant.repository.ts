import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {TenantDocument} from '../common/collections/tenant.schema';
import {Tenant} from '../../../application/domain/model/tenant.model';
import {TenantInfo} from '../../../application/domain/model/TenantInfo';
import {PaymentDocument, Payments, TenantConsumption} from '../common/collections/payments.schema';

@Injectable()
export class TenantRepository {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    @InjectModel(Payments.name) private paymentModel: Model<PaymentDocument>
  ) {}

  async findAll(): Promise<Tenant[]> {
    console.log('findAll');
    return this.tenantModel.find().exec();
  }


  async create(tenant: Tenant): Promise<void> {
    const createdTenant = new this.tenantModel(tenant);
     await createdTenant.save();
  }

  async findTenants(month: number, year: number): Promise<TenantInfo[]> {
    console.log('findTenants');
      // this.p
    const payment = await  this.paymentModel.
    find({year: year, month: month}, {tenants: 1, _id: 0})
        .exec();

  // To flatten all TenantConsumption[] from all matched payments:
  const allTenants: TenantConsumption[] = payment.flatMap(payment =>
      payment.tenants ?? []);

    return allTenants.map(tenant => {
      return {
        name: tenant.name ?? '',
        debt: tenant.debt ?? '',
        floor: tenant.floor ?? '',
      } as TenantInfo;
    });
  }


}