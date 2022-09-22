import { EstateType } from '../types/estate-type.enum.js';
import { Location } from '../types/location.type.js';
import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, city, previewImageSrc, offerImageSrc, isPremium, isFavorite, rate, estateType, image, roomsQuantity, guestQuantity, price, goods, hostEmail, commentsQuantity, location] = tokens;
  return {
    title,
    description,
    date: new Date(date),
    city,
    previewImageSrc,
    offerImageSrc: offerImageSrc.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rate: Number(rate),
    estateType: EstateType[(estateType as keyof typeof EstateType)],
    image,
    roomsQuantity: Number(roomsQuantity),
    guestQuantity: Number(guestQuantity),
    price: Number(price),
    goods: goods.split(';'),
    hostEmail,
    commentsQuantity: Number(commentsQuantity),
    location: ({latitude: Number(location.split(';')[0]), longitude: Number(location.split(';')[1])} as Location),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
