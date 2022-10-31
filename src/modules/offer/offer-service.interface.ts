import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer-dto.js';
import { OfferEntity } from './offer.entity.js';


export interface OfferServiceInterface{
  create(createOfferDto : CreateOfferDto) : Promise<DocumentType<OfferEntity>>;
  updateById(offerId : string, updateOfferDto : UpdateOfferDto) : Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>
  find(count?: number) : Promise<DocumentType<OfferEntity>[] | null>;
  findById(offerId : string) : Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city : string): Promise<DocumentType<OfferEntity>[]>;
  exists(offerId: string): Promise<boolean>;
}
