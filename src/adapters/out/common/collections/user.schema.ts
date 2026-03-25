import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true, default: uuidv4})
    id: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    provider: string;

    @Prop({required: true})
    providerId: string;

    @Prop()
    picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
