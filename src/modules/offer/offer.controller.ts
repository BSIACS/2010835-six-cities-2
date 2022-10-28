import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.abstract.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import OffersGetResponseDTO from './dto/offers-get.response.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void>{
    const offers = await this.offerService.find();

    const offerResponse = offers?.map((offer) => (new OffersGetResponseDTO(offer)));

    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.send(res, StatusCodes.CREATED, result);
  }

}
