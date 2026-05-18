import { UserModel } from '@/repositories/mongoose/schemas/user.schema';

export async function migrateUsersIsActive() {
    const result = await UserModel.updateMany(
        {
            isActive: {
                $exists: false
            }
        },
        {
            $set: {
                isActive: true
            }
        }
    );

    if (result.modifiedCount > 0) {
        console.log(`[Migration] ${result.modifiedCount} users updated with isActive=true`);
    }
}