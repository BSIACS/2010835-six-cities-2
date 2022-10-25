import { EstateType } from '../../../types/estate-type.enum.js';

export default class UpdateOfferDto{
  public title?: string;
  public description?: string;
  public city?: string;
  public previewImageSrc?: string;
  public offerImageSrc?: string[];
  public isPremium?: boolean;
  public estateType?: EstateType;
  public roomsQuantity?: number;
  public guestQuantity?: number;
  public price?: number;
  public goods?: string[];
  public location?: number[];
}
