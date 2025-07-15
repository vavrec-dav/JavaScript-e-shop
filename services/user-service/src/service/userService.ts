import { CreateUserRequest } from "../dto/createUserRequest";
import { User } from "../entity/user";



export function createUser(createUserRequest: CreateUserRequest): Promise<void>  {
    const {firstName, lastName} = createUserRequest;

    const user: User = {
        id: crypto.randomUUID(), // Generate a UUID for the user ID
        firstName,
        lastName,
        createdAt: new Date() // Set the current date and time as createdAt
    };

}