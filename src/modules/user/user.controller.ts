import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService, UserService } from './user.service';
import {
  validateBody,
  validatePaginationQuery,
  validateUuid,
} from '../../common/middlewares';
import { ApiResponseDto } from '../../common/dtos';
import { UserMessages } from './constants/messages.constants';
import { PaginationQuery, paginationQuerySchema } from '../../common/schema';
import { NotFoundException } from '../../common/exceptions/http.exception';
import { userSchema, updateUserSchema } from './schema/user.schema';
import { BaseController } from '../../common/controllers/base.controller';

class UserController extends BaseController {
  public path: string = '/brand-vertical';

  constructor(private readonly userService: UserService) {
    super();
  }

  protected initializeRoutes() {
    this.router.post('/', validateBody(userSchema), this.create.bind(this));
    this.router.get(
      '/',
      validatePaginationQuery(paginationQuerySchema),
      this.findAll.bind(this),
    );
    this.router.get(
      '/:userId',
      validateUuid,
      this.validateUserById.bind(this),
      this.findOne.bind(this),
    );
    this.router.put(
      '/:userId',
      validateUuid,
      this.validateUserById.bind(this),
      validateBody(updateUserSchema),
      this.update.bind(this),
    );
    this.router.delete(
      '/:userId',
      validateUuid,
      this.validateUserById.bind(this),
      this.delete.bind(this),
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.insert(req.body);

      res
        .status(StatusCodes.CREATED)
        .json(new ApiResponseDto(UserMessages.Success.Created, req.body));
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationQuery = req.query as unknown as PaginationQuery;
      const userEntities = await this.userService.paginate(paginationQuery);

      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponseDto(
            userEntities?.length
              ? UserMessages.Success.FoundAll
              : UserMessages.Failure.NoDataFound,
            userEntities,
            paginationQuery,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async validateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userEntity = await this.userService.findOne(req.params.userId);

      if (!userEntity) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(new NotFoundException(UserMessages.Failure.NotFound));
        return;
      }

      res.locals.userEntity = userEntity;
      next();
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userEntity = res.locals.userEntity;
      res
        .status(StatusCodes.OK)
        .json(new ApiResponseDto(UserMessages.Success.Found, userEntity));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userEntity = res.locals.userEntity;

      await this.userService.update(userEntity.id, req.body);

      Object.assign(userEntity, req.body);

      res
        .status(StatusCodes.OK)
        .json(new ApiResponseDto(UserMessages.Success.Updated, userEntity));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userEntity = res.locals.userEntity;

      await this.userService.softDelete(userEntity.id);

      res
        .status(StatusCodes.OK)
        .json(new ApiResponseDto(UserMessages.Success.Deleted, userEntity));
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController(userService);
