import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserPort} from '@/application/ports/out/auth/user.port';
import {User as UserDomain} from '@/application/domain/model/user.model';
import {User as UserSchema} from '@/adapters/out/common/collections/user.schema';

@Injectable()
export class UserAdapter implements UserPort {
    constructor(
        @InjectModel(UserSchema.name)
        private readonly userModel: Model<UserSchema>,
    ) {
    }

    async findByEmail(email: string): Promise<UserDomain | null> {
        try {
            const userDoc = await this.userModel.findOne({email}).exec();
            if (!userDoc) return null;
            return this.mapToDomain(userDoc);
        } catch (error) {
            console.error('Error in UserAdapter.findByEmail:', error);
            throw error;
        }
    }

    async findById(id: string): Promise<UserDomain | null> {
        try {
            const userDoc = await this.userModel.findOne({id}).exec();
            if (!userDoc) return null;
            return this.mapToDomain(userDoc);
        } catch (error) {
            console.error('Error in UserAdapter.findById:', error);
            throw error;
        }
    }

    async save(user: UserDomain): Promise<UserDomain> {
        try {
            const newUser = new this.userModel(user);
            const saved = await newUser.save();
            return this.mapToDomain(saved);
        } catch (error) {
            console.error('Error in UserAdapter.save:', error);
            throw error;
        }
    }

    async update(user: UserDomain): Promise<UserDomain> {
        try {
            const updated = await this.userModel.findOneAndUpdate({id: user.id}, user, {new: true}).exec();
            if (!updated) {
                console.error('User to update not found:', user.id);
                throw new Error('User not found');
            }
            return this.mapToDomain(updated);
        } catch (error) {
            console.error('Error in UserAdapter.update:', error);
            throw error;
        }
    }

    private mapToDomain(doc: any): UserDomain {
        return new UserDomain(
            doc.id,
            doc.email,
            doc.name,
            doc.provider,
            doc.providerId,
            doc.picture,
        );
    }
}
