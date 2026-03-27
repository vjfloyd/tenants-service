import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from '@/infrastructure/database/database.module';
import {GetTenantsModule} from '@/features/get-tenants/get-tenants.module';
import {CreateTenantModule} from '@/features/create-tenant/create-tenant.module';
import {CalculatePaymentModule} from '@/features/calculate-payment/calculate-payment.module';
import {CreatePaymentModule} from '@/features/create-payment/create-payment.module';
import {DeleteTenantModule} from '@/features/delete-tenant/delete-tenant.module';
import {AuthModule} from '@/features/auth/auth.module';


@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
              `.env.${process.env.NODE_ENV}.local`,
              `.env.${process.env.NODE_ENV}`,
              '.env.local',
              `.env`,
          ].filter(Boolean),
      }),
      DatabaseModule,
      GetTenantsModule,
      CreateTenantModule,
      DeleteTenantModule,
      CalculatePaymentModule,
      CreatePaymentModule,
      AuthModule
  ],
})

export class AppModule {}
