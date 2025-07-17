import { Request, Response } from "express";
import * as userService from "../service/userService";

export const updateUserHandler = async (req: Request, res: Response) => {
    const updateUserRequest = req.body;
    try {
        await userService.updateUser(updateUserRequest);
        res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to update user" });
    }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: "Failed to delete user" });
    }
}

export const getUsersHandler = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const response = await userService.getUsers(limit, offset);
    res.status(200).json(response);
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const response = await userService.getUserById(userId);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).send({ error: "User not found" });
    }
}

export const createUserHandler = async (req: Request, res: Response) => {
    const createUserRequest = req.body;

    try {
        await userService.createUser(createUserRequest);
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to create user" });
    }
}