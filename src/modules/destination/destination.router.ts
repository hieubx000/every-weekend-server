import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update,
} from './destination.controller';

const DestinationRouter = Router();

DestinationRouter.get('/', findAll);
DestinationRouter.get('/:id', findById);
DestinationRouter.get('/slug/:id', findBySlug);
DestinationRouter.post('/', create);
DestinationRouter.patch('/:id', update);
DestinationRouter.delete('/:id', remove);

export default DestinationRouter;
