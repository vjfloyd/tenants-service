import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Tenant} from '@/application/service/create_tenant/Tenant';
import {Payments, PaymentsSchema} from '@/adapters/out/common/collections/payments.schema';
import {TenantSchema} from '@/adapters/out/common/collections/tenant.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Tenant.name, schema: TenantSchema},
            {name: Payments.name, schema: PaymentsSchema}
        ])
    ],
    exports: [
        MongooseModule.forFeature([
            {name: Tenant.name, schema: TenantSchema},
            {name: Payments.name, schema: PaymentsSchema}
        ])
    ]


})

export class DatabaseModelsModule {
}