import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Controller } from '../../common/controller/controller.abstract.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
  }

  public create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _res: Response
  ): void {
    throw new Error('[UserController] Not implemented yet!');
  }
}
