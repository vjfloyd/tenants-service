import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GetTenantController} from './adapters/in/get_tenants/get.tenants.controller';
import {CreateTenantController} from './adapters/in/create_tenant/create.tenant.controller';
import {GetTenantService} from './application/service/get_tenants/get.tenant.service';
import {GetTenantsPort} from './application/ports/out/get_tenant/get.tenats.port';
import {CreateTenantPort} from './application/ports/out/create_tenant/create.tenant.port';
import {GetTenantAdapter} from './adapters/out/get_tenants/get.tenant.adapter';
import {CreateTenantAdapter} from './adapters/out/create_tenant/create.tenant.adapter';
import {MongooseModule} from '@nestjs/mongoose';
import * as process from 'node:process';
import {TenantRepository} from './adapters/out/get_tenants/tenant.repository';
import {Tenant, TenantSchema} from './adapters/out/common/collections/tenant.schema';
import {GetTenantsUseCase} from './application/ports/in/get_tenant/get.tenant.usecase';
import {CreateTenantUseCase} from './application/ports/in/create_tenant/create.tenat.usecase';
import {CreateTenantService} from './application/service/create_tenant/create.tenant.service';
import {CalculatePaymentController} from './adapters/in/calculate_payment/calculate.payment.controller';
import {CalculatePaymentUseCase} from './application/ports/in/calculate_payment/calculate.payment.usecase';
import {CalculatePaymentAdapter} from './adapters/out/calculate_payment/calculate.payment.adapter';
import {CalculatePaymentService} from './application/service/calculate_payment/calculate.payment.service';
import {GetPreviousPaymentPort} from './application/ports/out/calculate_payment/calculate_payment.port';
import {PaymentRepository} from './adapters/out/calculate_payment/payment.repository';
import {CreatePaymentController} from './adapters/in/create_payment/create.payment.controller';
import {CreatePaymentPort} from './application/ports/out/create_payment/create_payment.port';
import {CreatePaymentAdapter} from './adapters/out/create_payment/create.payment.adapter';
import {CreatePaymentRepository} from './adapters/out/create_payment/create.payment.repository';
import {Payments, PaymentsSchema} from './adapters/out/common/collections/payments.schema';
import {CreatePaymentUseCase} from './application/ports/in/create_payment/create.tenat.usecase';
import {CreatePaymentService} from './application/service/create_payment/create.payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
          `.env.${process.env.NODE_ENV}`,
          `.env`,
      ].filter(Boolean),
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/tenants'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Payments.name, schema: PaymentsSchema }
    ])
  ],
  controllers: [AppController, GetTenantController,
    CreateTenantController, CalculatePaymentController, CreatePaymentController],
  providers: [
    AppService,
    {
      provide: GetTenantsUseCase,
      useClass: GetTenantService,
    },
    {
      provide: GetTenantsPort,
      useClass: GetTenantAdapter,
    },
    {
      provide: CreateTenantUseCase,
      useClass: CreateTenantService,
    },
    {
      provide: CreateTenantPort,
      useClass: CreateTenantAdapter,
    },
    {
      provide: CalculatePaymentUseCase,
      useClass: CalculatePaymentService,
    },
    {
        provide: GetPreviousPaymentPort,
        useClass: CalculatePaymentAdapter,
    },
    {
      provide: CreatePaymentPort,
      useClass: CreatePaymentAdapter,
    },
    {
      provide: CreatePaymentUseCase,
      useClass: CreatePaymentService,
    },
    TenantRepository,
    PaymentRepository,
    CreatePaymentRepository
  ],
})
export class AppModule {}
