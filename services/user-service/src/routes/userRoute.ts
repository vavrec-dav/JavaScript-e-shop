import express from 'express'
import { getUserById } from '../controllers/userController';

const router = express.Router();

const api = 'v1/user';


/**
 * @swagger
 * /v1/user/id:
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
router.get(`/v1/user/:id`, getUserById);

export default router;