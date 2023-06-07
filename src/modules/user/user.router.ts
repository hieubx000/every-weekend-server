import { Router } from 'express';
import { findAll, findById, create, update, remove } from './user.controller';

const UserRouter = Router();

UserRouter.get('/', findAll);
UserRouter.get('/:id', findById);
UserRouter.post('/', create);
UserRouter.patch('/:id', update);
UserRouter.delete('/:id', remove);

export default UserRouter;
