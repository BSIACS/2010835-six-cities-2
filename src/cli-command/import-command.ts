import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createOffer } from '../utils/common.js';
import ConsoleLoggerService from '../logger/console-logger.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { getURI } from '../utils/db.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import { Offer } from '../types/offer.type.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import OfferService from '../modules/offer/offer.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private databaseService : DatabaseInterface;
  private logger: LoggerInterface;
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private salt!: string;

  constructor(){
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLoggerService();
    this.databaseService = new DatabaseService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);

    this.logger.info('constructor');
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.create({...offer.user, password: DEFAULT_USER_PASSWORD}, this.salt);
    const result =  await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImageSrc: offer.previewImageSrc,
      offerImageSrc: offer.offerImageSrc,
      isPremium: offer.isPremium,
      rate: offer.rate,
      rateQuantity: offer.rateQuantity,
      estateType: offer.estateType,
      roomsQuantity: offer.roomsQuantity,
      guestQuantity: offer.guestQuantity,
      price: offer.price,
      goods: offer.goods,
      commentsQuantity: offer.commentsQuantity,
      location: offer.location,
      userId: user.id,
    });

    return result;
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);

    resolve();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    this.salt = salt;
    const connectionString = getURI(login, password, host, DEFAULT_DB_PORT, dbname);

    await this.databaseService.connect(connectionString);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      fileReader.read();
    } catch (error) {
      console.log(`Can't read the file: ${error}`);
    }
  }

}
