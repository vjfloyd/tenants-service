import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Tenant, TenantDocument} from '../common/collections/tenant.schema';

@Injectable()
export class TenantRepository {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
  ) {}

  async findAll(): Promise<Tenant[]> {
    console.log('findAll');
    return this.tenantModel.find().exec();
  }

  async create(tenant: Tenant): Promise<Tenant> {
    const createdTenant = new this.tenantModel(tenant);
    return createdTenant.save();
  }

}