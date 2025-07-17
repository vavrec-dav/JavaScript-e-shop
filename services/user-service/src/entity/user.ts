// This file defines the structure of a user in the database.
export interface User {
    id: string; // UUID
    firstName: string;
    lastName: string;
    createdAt: Date;
}