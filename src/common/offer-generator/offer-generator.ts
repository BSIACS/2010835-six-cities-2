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
    const roomsQuantity = String(generateRandomValue(1, 8));
    const guestQuantity = String(generateRandomValue(1, 10));
    const price = String(generateRandomValue(100, 100000));
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const commentsQuantity = String(generateRandomValue(1, 50));

    const cityLocation = this.generateLocation(city);
    const randomLatitude = (generateRandomValue(1, 10) / 10 + cityLocation.latitude).toFixed(6);
    const randomLongitude = (generateRandomValue(1, 10) / 10 + cityLocation.longitude).toFixed(6);

    const location = `${randomLatitude};${randomLongitude}`;

    const name = getRandomItem<string>(this.mockData.name);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const userType = generateRandomValue(0, 1) === 0 ? 'common' : 'pro';

    return [
      title, description, date, city, previewImageSrc, offerImageSrc, isPremium,
      isFavorite, rate, estateType, roomsQuantity, guestQuantity, price,
      goods, commentsQuantity, location, name, email, avatar, userType
    ].join('\t');
  }

  private generateLocation(city : string) : Location {
    city = capitalizeFirstLetter(city);

    return getLocation(CityName[city as keyof typeof CityName]);
  }
}
