import { Application } from './app/application.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './logger/logger.service.js';

const logger = new LoggerService();

const application = new Application(logger);
await application.init();

console.log((new ConfigService()).get('PORT'));
