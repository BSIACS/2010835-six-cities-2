import { EstateType } from '../../../types/estate-type.enum';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: Date;
  public city!: string;
  public previewImageSrc!: string;
  public offerImageSrc!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rate!: number;
  public estateType!: EstateType;
  public roomsQuantity!: number;
  public guestQuantity!: number;
  public price!: number;
  public goods!: string[];
  public userId!: string;
  public commentsQuantity!: number;
  public location!: number[];
}
