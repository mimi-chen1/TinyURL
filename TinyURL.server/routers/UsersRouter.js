import express from 'express'
import UserController from '../controllers/UsersController.js'
const UserRouter = express.Router()

UserRouter.get('/', UserController.getUsers)

UserRouter.get('/:id', UserController.getById)

UserRouter.post('/', UserController.createUser)

UserRouter.put('/:id', UserController.updateUser)

UserRouter.delete('/:id', UserController.deleteUser)

export default UserRouter