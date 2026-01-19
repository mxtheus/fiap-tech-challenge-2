import { IUser } from '@/entities/models/user.interface';
import { Model } from 'mongoose';
import { IUserRepository } from '../user.repository.interface';
import { UserModel } from './schemas/user.schema';

export class MongooseUserRepository implements IUserRepository {
    constructor(private readonly userModel: Model<IUser> = UserModel) { }

    async create(data: IUser): Promise<IUser> {
        const user = new this.userModel(data);
        await user.save();
        return user.toObject();
    }

    async findById(id: string): Promise<IUser | null> {
        return this.userModel
            .findById(id)
            .select('-password')
            .lean()
            .exec();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.userModel.findOne({ email }).lean().exec();
    }
}
