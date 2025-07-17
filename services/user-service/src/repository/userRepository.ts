import { databasePool } from "../manager/databaseManager";
import { User } from "../entity/user";
import { UpdateUserRequest } from "../dto/updateUserRequest";
import { validate as isUUID } from 'uuid';


export const deleteUser = async (id: string): Promise<void> => {
    if (!isUUID(id.trim())) {
        throw new Error('Invalid UUID');
    }
    const query = 'DELETE FROM users WHERE id = $1::uuid';
    const values = [id];
    await databasePool.query(query, values)
}

export const updateUser = async (user: UpdateUserRequest): Promise<User> => {
    const userExists = await getUserById(user.id);
    if (!userExists) {
        throw new Error(`User with id ${user.id} does not exist`);
    }
    const query = 'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *';
    const values = [user.firstName, user.lastName, user.id];

    const result = await databasePool.query(query, values).catch(error => {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    });
    return result.rows[0];
}

export const getUsers = async (limit: number, offset: number): Promise<User[]> => {
    const query = 'SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2';
    const values = [limit, offset];

    return databasePool.query(query, values).then(result => result
        .rows
        .map(row => mapRowToUser(row)));
}

export const getTotalCountOfUsers = async (): Promise<number> => {
    const query = 'SELECT COUNT(*) FROM users';
    const result = await databasePool.query(query);
    return parseInt(result.rows[0].count, 10);
}

export const getUserById = async (id: string): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    const result = await databasePool.query(query, values);
    if (result.rows.length > 0) {
        return mapRowToUser(result.rows[0]);
    }
    return null;
}

export const createUser = async (user: User): Promise<User> => {
    const query = 'INSERT INTO users (id, first_name, last_name, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [user.id, user.firstName, user.lastName, user.createdAt];

    const result = await databasePool.query(query, values).catch(error => {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    });
    return result.rows[0];
}

function mapRowToUser(row: any): User {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        createdAt: row.created_at
    };
}