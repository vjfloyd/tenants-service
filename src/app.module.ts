import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from '@/infrastructure/database/database.module';
import {GetTenantsModule} from '@/features/get-tenants/get-tenants.module';
import {CreateTenantModule} from '@/features/create-tenant/create-tenant.module';
import {CalculatePaymentModule} from '@/features/calculate-payment/calculate-payment.module';
import {CreatePaymentModule} from '@/features/create-payment/create-payment.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
              `.env.${process.env.NODE_ENV}`,
              `.env`,
          ].filter(Boolean),
      }),
      DatabaseModule,
      GetTenantsModule,
      CreateTenantModule,
      CalculatePaymentModule,
      CreatePaymentModule
  ],
})

export class AppModule {}
