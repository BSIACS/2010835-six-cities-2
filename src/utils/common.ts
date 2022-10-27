import { EstateType } from '../types/estate-type.enum.js';
import { Offer } from '../types/offer.type.js';
import crypto from 'crypto';
import {plainToInstance, ClassConstructor} from 'class-transformer';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, city, previewImageSrc, offerImageSrc, isPremium, rate, rateQuantity, estateType,
    roomsQuantity, guestQuantity, price, goods, commentsQuantity, location, name, email, avatar, userType] = tokens;

  return {
    title,
    description,
    date: new Date(date),
    city,
    previewImageSrc,
    offerImageSrc: offerImageSrc.split(';'),
    isPremium: Boolean(isPremium),
    rate: Number(rate),
    rateQuantity: Number(rateQuantity),
    estateType: EstateType[(estateType.charAt(0).toUpperCase() + estateType.slice(1) as keyof typeof EstateType)],
    roomsQuantity: Number(roomsQuantity),
    guestQuantity: Number(guestQuantity),
    price: Number(price),
    goods: goods.split(';'),
    user: {name, email, avatar, userType: userType},
    commentsQuantity: Number(commentsQuantity),
    location: location.split(';').map((element) => Number(element)),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
