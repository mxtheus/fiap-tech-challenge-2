import { IPaginatedResponse } from '@/entities/models/pagination.interface';
import { IUser, UserRole } from '@/entities/models/user.interface';
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
        return await this.userModel
            .findById(id)
            .select('-password')
            .lean()
            .exec();
    }

    async findByIdWithPassword(id: string): Promise<IUser | null> {
        return await this.userModel
            .findById(id)
            .lean()
            .exec();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email }).lean().exec();
    }

    async findAll(
        page: number,
        limit: number,
        role?: UserRole,
        isActive?: boolean,
        search?: string
    ): Promise<IPaginatedResponse<IUser>> {
        const offset = (page - 1) * limit;

        const filters: any = {};

        if (role) {
            filters.role = role;
        }

        if (typeof isActive === 'boolean') {
            filters.isActive = isActive;
        }

        if (search) {
            filters.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }

        const [users, total] = await Promise.all([
            this.userModel
                .find(filters)
                .select('-password')
                .sort({
                    isActive: -1,
                    name: 1
                })
                .skip(offset)
                .limit(limit)
                .lean()
                .exec(),
            this.userModel.countDocuments(filters)
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    }

    async update(id: string, data: Partial<IUser>): Promise<void> {
        await this.userModel.updateOne(
            { _id: id },
            data
        ).exec();
    }

    async deactivate(id: string): Promise<void> {
        await this.userModel.updateOne(
            { _id: id },
            { isActive: false }
        ).exec();
    }

    async activate(id: string): Promise<void> {
        await this.userModel.updateOne(
            { _id: id },
            { isActive: true }
        ).exec();
    }
}
