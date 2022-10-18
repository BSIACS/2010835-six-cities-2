import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity.js';


export interface OfferServiceInterface{
  create(createOfferDto : CreateOfferDto) : Promise<DocumentType<OfferEntity>>
}
