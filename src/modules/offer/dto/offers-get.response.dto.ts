import { OfferEntity } from '../offer.entity';

export default class OffersGetResponseDTO {
  public price!: number;
  public title!: string;
  public estateType!: string;
  public date!: Date;
  public rate!: number;
  public city!: string;
  public previewImageSrc!: string;
  public isPremium!: boolean;
  public commentsQuantity!: number;

  constructor(offerEntity: OfferEntity){
    this.price = offerEntity.price;
    this.title = offerEntity.title;
    this.estateType = offerEntity.estateType;
    this.date = offerEntity.date;
    this.rate = offerEntity.rate/offerEntity.rateQuantity;
    this.city = offerEntity.city;
    this.previewImageSrc = offerEntity.previewImageSrc;
    this.isPremium = offerEntity.isPremium;
    this.commentsQuantity = offerEntity.commentsQuantity;
  }
}
