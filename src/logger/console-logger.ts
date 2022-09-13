import { Offer } from '../types/offer.type';
import { Logger } from './logger.interface';
import chalk from 'chalk';

export class ConsoleColorLogger implements Logger{
  dataToLog : Offer[];

  constructor(dataToLog : Offer[]){
    this.dataToLog = dataToLog;
  }

  log(): void{
    this.dataToLog.forEach((data) => {
      console.log(chalk.red(data.title));
      console.log(data.description);
      console.log(data.date);
      console.log(data.previewImageSrc);
      console.log(data.offerImageSrc);
      console.log(chalk.bgMagentaBright(data.isPremium));
      console.log(data.isFavorite);
      console.log(data.rate);
      console.log(data.estateType);
      console.log(chalk.green(data.image));
      console.log(chalk.green(data.roomsQuantity));
      console.log(data.guestQuantity);
      console.log(chalk.grey(data.price));
      console.log(data.goods);
      console.log(chalk.bgCyan(data.hostEmail));
      console.log(data.commentsQuantity);
      console.log(data.location);
    });
  }
}
