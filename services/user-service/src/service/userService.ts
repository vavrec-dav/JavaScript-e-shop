import { CreateUserRequest } from "../dto/createUserRequest";
import { User } from "../entity/user";
import crypto from 'crypto';
import * as userRepository from "../repository/userRepository";
import { PaginatedResult } from "../dto/paginatedResult";
import { UpdateUserRequest } from "../dto/updateUserRequest";
import { GetUserResponse } from "../dto/getUserResponse";


/** * Updates an existing user.
 * @param {UpdateUserRequest} user - The request object containing user details to be updated.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 */
export const updateUser = async (user: UpdateUserRequest): Promise<User> => {
    return userRepository.updateUser(user);
}

/**
 * Deletes a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
 */
export const deleteUser = async (id: string): Promise<void> => {
    console.log(`Deleting user with id: ${id}`);
    await userRepository.deleteUser(id);
}

/**
   * Retrieves a list of users with pagination.
   *
   * @param {number} limit - The maximum number of users to retrieve.
   * @param {number} offset - The number of users to skip before starting to collect the result set.
   * @returns {Promise<PaginatedResult<User>>} A promise that resolves to a paginated result containing users.
   * @throws {Error} If the limit or offset is invalid.
   * @throws {Error} If there is an issue retrieving users from the database.
   */
export const getUsers = async (limit: number, offset: number): Promise<PaginatedResult<GetUserResponse>> => {
    if (limit < 1 || offset < 0) {
        throw new Error("Invalid limit or offset");
    }
    const totalCount = await userRepository.getTotalCountOfUsers();
    return userRepository.getUsers(limit, offset).then(users => {
        return {
            items: users,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    })
}

/**
 * Retrieves a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null otherwise.
 */
export function getUserById(id: string): Promise<User | null> {
    return userRepository.getUserById(id);
}

/**
 * Creates a new user in the system.
 * 
 * @param {CreateUserRequest} createUserRequest - The request object containing user details.
 * @returns {Promise<void>} A promise that resolves when the user is successfully created.
 */
export function createUser(createUserRequest: CreateUserRequest): Promise<void> {
    const { firstName, lastName } = createUserRequest;

    const user: User = {
        id: crypto.randomUUID(), // Generate a UUID for the user ID
        firstName,
        lastName,
        createdAt: new Date() // Set the current date and time as createdAt
    };

    return userRepository.createUser(user).then(() => { });
}  