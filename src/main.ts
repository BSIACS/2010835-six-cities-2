import { Container } from 'inversify';
import { Application } from './app/application.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import { LoggerInterface } from './logger/logger.interface.js';
import LoggerService from './logger/logger.service.js';
import { Component } from './types/component.types.js';
import 'reflect-metadata';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
