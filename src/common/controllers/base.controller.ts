import { Router } from "express";

// Abstract class that every controller should extend
export abstract class BaseController {
  public router: Router;
  public path: string = "/"; // Default to "/"

  constructor() {
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  // Abstract method that must be implemented in the child class
  protected abstract initializeRoutes(): void;
}
