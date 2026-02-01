import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {TenantRepository} from '../../src/adapters/out/get_tenants/tenant.repository';
import {Model} from 'mongoose';
import {PaymentDocument} from '../../src/adapters/out/common/collections/payments.schema'

describe('TenantRepository Integration', () => {
  let tenantRepository: TenantRepository;
  let paymentModel: Model<PaymentDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantRepository,
        { provide: getModelToken('Tenant'), useValue: Model },
        { provide: getModelToken('Payment'), useValue: Model },
      ],
    }).compile();

    tenantRepository = module.get<TenantRepository>(TenantRepository);
    paymentModel = module.get<Model<PaymentDocument>>(getModelToken('Payment'));
  });

  afterEach(async () => {
    await paymentModel.deleteMany({});
  });

  it('should return tenants filtered by year and month', async () => {
    // Insert test data
    await paymentModel.create([
      { tenant: { _id: 't1', name: 'Tenant 1' }, year: 2024, month: 6 },
      { tenant: { _id: 't2', name: 'Tenant 2' }, year: 2024, month: 6 },
      { tenant: { _id: 't3', name: 'Tenant 3' }, year: 2023, month: 5 },
    ]);

    const result = await tenantRepository.findTenants(6, 2024);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ tenantId: 't1', name: 'Tenant 1' }),
        expect.objectContaining({ tenantId: 't2', name: 'Tenant 2' }),
      ])
    );

    expect('Result => ' + result).toHaveLength(2);

    const result2 = await tenantRepository.findTenants(5, 2023);

    console.log(JSON.stringify(result2, null, 2));

    expect(result2).toHaveLength(1);

    expect(result2).toEqual(
        expect.objectContaining({ tenantId: 't3', name: 'Tenant 3' })
    );


  });
});