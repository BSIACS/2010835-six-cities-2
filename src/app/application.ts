import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import { Component } from '../types/component.types.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getURI } from '../utils/db.js';
import express, { Express } from 'express';
import { ControllerInterface } from '../common/controller/controller.interface.js';

@injectable()
export class Application{

  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
  ){
    this.expressApp = express();
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

    await this.databaseClient.disconnect();
  }

  public initRoutes() {
    this.expressApp.use('/users', this.userController.router);
  }
}
