import { Router, Request, Response } from 'express';
import { ApiResponseDto } from '../common/dtos';
import { StatusCodes } from 'http-status-codes';
import { jwtCheck } from '../common/middlewares';
import { userController } from './user/user.controller';

const apiRouter = Router({ mergeParams: true });

apiRouter.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponseDto('Service is healthy.'));
});

const authControllers = [
  userController
];
authControllers.forEach(({ path, router }) => {
  apiRouter.use(path, jwtCheck, router);
});

export default apiRouter;
