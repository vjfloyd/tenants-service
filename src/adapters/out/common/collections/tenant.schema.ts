import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type TenantDocument = Tenant & Document;

@Schema()
export class Tenant {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: uuidv4 })
  code: string;

  @Prop({ required: true })
  floor: number;

  @Prop()
  month: number;

  @Prop()
  year: number;

}

export const TenantSchema = SchemaFactory.createForClass(Tenant);