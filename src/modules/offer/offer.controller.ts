import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.abstract.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import OfferResponseDTO from './dto/offers.response.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import * as core from 'express-serve-static-core';
import { ParamsGetOffer } from '../../types/params-get-offer.js';
import HttpError from '../../common/errors/http-error.js';
import UpdateOfferDto from './dto/update-offer-dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middleware/validate-objectid.interface.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: '/premium', method: HttpMethod.Post, handler: this.getPremium});

  }

  public async index(_req: Request, res: Response): Promise<void>{
    const offers = await this.offerService.find();

    const offerResponse = offers?.map((offer) => (new OfferResponseDTO(offer)));

    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async show({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) : Promise<void>{
    const {offerId} = params;

    const result = await this.offerService.findById(offerId);

    if(!result){
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferController');
    }

    this.ok(res, new OfferResponseDTO(result));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res, new OfferResponseDTO(result));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {

    const result = await this.offerService.updateById(params.offerId, body);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, new OfferResponseDTO(result));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const result = await this.offerService.deleteById(offerId);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.noContent(res, result);
  }

  public async getPremium({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const offers = await this.offerService.findPremium(body.city);

    const result = offers?.map((offer) => (new OfferResponseDTO(offer)));

    this.send(res, StatusCodes.OK, result);
  }
}
