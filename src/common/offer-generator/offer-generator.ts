import { CityName } from '../../types/city-name.enum.js';
import { Location } from '../../types/location.type.js';
import { MockData } from '../../types/mock-data.js';
import { getLocation } from '../../utils/location.js';
import { generateRandomValue, getRandomDate, getRandomItem, getRandomItems } from '../../utils/random.js';
import { capitalizeFirstLetter } from '../../utils/string-operations.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.description);
    const date = getRandomDate(new Date('2022-09-17T12:00:00.100Z'), new Date('2022-11-17T12:00:00.100Z'));
    const city = getRandomItem<string>(this.mockData.city);
    const previewImageSrc = getRandomItem<string>(this.mockData.imageSrc);
    const offerImageSrc = getRandomItem<string>(this.mockData.imageSrc);
    const isPremium = generateRandomValue(0, 1) === 0 ? 'false' : 'true';
    const isFavorite = generateRandomValue(0, 1) === 0 ? 'false' : 'true';
    const rate = String(generateRandomValue(1, 5, 1));
    const estateType = getRandomItem<string>(this.mockData.estateType);
    const image = getRandomItem<string>(this.mockData.imageSrc);
    const roomsQuantity = String(generateRandomValue(1, 8));
    const guestQuantity = String(generateRandomValue(1, 10));
    const price = String(generateRandomValue(100, 100000));
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const hostEmail = getRandomItem<string>(this.mockData.hostEmail);
    const commentsQuantity = String(generateRandomValue(1, 50));

    const cityLocation = this.generateLocation(city);
    const randomLatitude = (generateRandomValue(1, 10) / 10 + cityLocation.latitude).toFixed(6);
    const randomLongitude = (generateRandomValue(1, 10) / 10 + cityLocation.longitude).toFixed(6);

    const location = `${randomLatitude};${randomLongitude}`;

    return [
      title, description, date, city, previewImageSrc, offerImageSrc, isPremium,
      isFavorite, rate, estateType, image, roomsQuantity, guestQuantity, price,
      goods, hostEmail, commentsQuantity, location
    ].join('\t');
  }

  private generateLocation(city : string) : Location {
    city = capitalizeFirstLetter(city);

    return getLocation(CityName[city as keyof typeof CityName]);
  }
}
