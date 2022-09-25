import { LoggerInterface } from '../logger/logger.interface';

export class Application{
  private logger : LoggerInterface;

  constructor(logger : LoggerInterface){
    this.logger = logger;
  }

  public init(){
    this.logger.info('Application initialized');
  }
}
