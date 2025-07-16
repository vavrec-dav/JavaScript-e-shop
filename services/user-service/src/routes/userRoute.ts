import express from 'express'
import { createUserHandler, deleteUserHandler, getUserByIdHandler, getUsersHandler, updateUserHandler } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: User found successfully.
 */
router.get(`/:id`, getUserByIdHandler);

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/', createUserHandler);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get users with pagination
 *     description: Retrieve a list of users with optional pagination.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The maximum number of users to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of users to skip before starting to collect the result set.
 *     responses:
 *       200:
 *         description: A list of users.
 */

router.get('/', getUsersHandler);


/**
 * @swagger
 * /api/v1/user:
 *   put:
 *     summary: Update an existing user
 *     description: Update an existing user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to update user.      
 */
router.put('', updateUserHandler);


/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to be deleted.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to delete user.  
 */
router.delete('/:id', deleteUserHandler);



export default router;