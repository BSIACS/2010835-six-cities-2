import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';


@injectable()
export default class OfferService implements OfferServiceInterface {

  constructor(
    @inject(Component.LoggerInterface)
    private logger : LoggerInterface,
    @inject(Component.UserModel)
    private readonly offerModel : types.ModelType<OfferEntity>
  ){}

  public async create(dto : CreateOfferDto) : Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId : string) : Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findById(offerId).exec();

    return result;
  }
}
