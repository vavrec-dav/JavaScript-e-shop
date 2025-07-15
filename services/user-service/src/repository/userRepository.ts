import { databasePool } from "../manager/databaseManager";
import { User } from "../entity/user";

export const createUser = async (user: User): Promise<User> => {
    const query = 'INSERT INTO users (id, firstName, lastName, createdAt) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [user.id, user.firstName, user.lastName, user.createdAt];

    try {
        const result = await databasePool.query(query, values);
        return result.rows[0];
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating user: ${error.message}`);
        } else {
            throw new Error('Error creating user: Unknown error');
        }
    }
}