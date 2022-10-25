import { EstateType } from './estate-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: string,
  previewImageSrc: string,
  offerImageSrc: string[],
  isPremium: boolean,
  favorites: string[],
  rate: number,
  rateQuantity: number,
  estateType: EstateType,
  roomsQuantity: number,
  guestQuantity: number,
  price: number,
  goods: string[],
  user: User,
  commentsQuantity: number,
  location: number[],
}
