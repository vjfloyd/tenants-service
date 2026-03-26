import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Tenant} from '@/application/service/create_tenant/Tenant';
import {Payments, PaymentsSchema} from '@/adapters/out/common/collections/payments.schema';
import {TenantSchema} from '@/adapters/out/common/collections/tenant.schema';
import {User, UserSchema} from '@/adapters/out/common/collections/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Tenant.name, schema: TenantSchema},
            {name: Payments.name, schema: PaymentsSchema},
            {name: User.name, schema: UserSchema}
        ])
    ],
    exports: [
        MongooseModule.forFeature([
            {name: Tenant.name, schema: TenantSchema},
            {name: Payments.name, schema: PaymentsSchema},
            {name: User.name, schema: UserSchema}
        ])
    ]


})

export class DatabaseModelsModule {
}