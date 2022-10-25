import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { CityName } from '../../types/city-name.enum.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import updateOfferDto from './dto/update-offer-dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { DEFAULT_OFFER_COUNT, FIND_PREMIUM_LIMIT } from './offer.constants.js';
import { OfferEntity } from './offer.entity.js';


@injectable()
export default class OfferService implements OfferServiceInterface {

  constructor(
    @inject(Component.LoggerInterface)
    private logger : LoggerInterface,
    @inject(Component.OfferModel)
    private readonly offerModel : types.ModelType<OfferEntity>
  ){}

  public async create(dto : CreateOfferDto) : Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async updateById(offerId : string, dto: updateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .exec();
  }

  public async findById(offerId : string) : Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsQuantity: 1,
      }}, {new: true}).exec();
  }

  public async findPremium(city : CityName): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isPremium: true, city: city}, {}, {limit: FIND_PREMIUM_LIMIT})
      .exec();
  }
}
