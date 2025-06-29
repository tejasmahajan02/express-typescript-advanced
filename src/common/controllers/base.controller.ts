import {
  NextFunction,
  Response,
  Request,
  RequestHandler,
  Router,
} from 'express';

// Abstract class that every controller should extend
export abstract class BaseController {
  public router: Router;
  public basePath: string = '/'; // Default to "/"

  constructor(...requestHandlers: RequestHandler[]) {
    this.router = Router({ mergeParams: true });

    requestHandlers.forEach((mw) => {
      this.router.use(mw);
    });

    this.initializeRoutes();
  }

  // Abstract method that must be implemented in the child class
  protected abstract initializeRoutes(): void;

  protected asyncHandler(fn: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
