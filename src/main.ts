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
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './modules/offer/offer-service.interface.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import OfferService from './modules/offer/offer.service.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import CommentService from './modules/comment/comment.service.js';
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js';
import { ControllerInterface } from './common/controller/controller.interface.js';
import UserController from './modules/user/user.controller.js';
import OfferController from './modules/offer/offer.controller.js';
import { ExceptionFilterInterface } from './common/errors/exception-filter.interface.js';
import ExceptionFilter from './common/errors/exception-filter.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();

applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
