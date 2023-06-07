import { Router } from 'express';

import { login, register } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/login', login);
AuthRouter.post('/register', register);

export default AuthRouter;
