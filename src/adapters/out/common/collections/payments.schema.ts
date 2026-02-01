import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PaymentDocument = Payments & Document;

  @Schema()
  export class TenantConsumption {
    @Prop({ required: true })
    tenantCode: string;

    @Prop({ required: false })
    name: string;

    @Prop({ required: true })
    floor: number;

    @Prop({ required: true })
    consumption: number;

    @Prop({ required: false })
    debt: number;
  }

  export const TenantConsumptionSchema = SchemaFactory.createForClass(TenantConsumption);

  @Schema({ timestamps: true })
  export class Payments {
    @Prop({ unique: true, required: true })
    paymentId: string;

    @Prop({ required: true, min: 1, max: 12 })
    month: number;

    @Prop({ required: true, min: 2020 })
    year: number;

    @Prop({ required: false, min: 0 })
    totalConsumption: number;

    @Prop({ required: true, min: 0 })
    totalAmount: number;

    @Prop({ required: true, min: 0 })
    engineConsumption: number;

    @Prop({ type: [TenantConsumptionSchema], required: true })
    tenants: TenantConsumption[];

    @Prop({ default: 'pending' })
    status: string;

    @Prop()
    paidDate?: Date;

    @Prop()
    dueDate?: Date;
  }

  export const PaymentsSchema = SchemaFactory.createForClass(Payments);

  PaymentsSchema.index({ year: 1, month: 1 });
  PaymentsSchema.index({ status: 1 });