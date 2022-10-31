import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.abstract.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import OfferService from '../offer/offer.service.js';
import CommentService from './comment.service.js';
import CreateCommentDto from './dto/create-comment-dto.js';
import * as core from 'express-serve-static-core';
import { ParamsGetComments } from '../../types/params-get-comments.js';


@injectable()
export default class CommentController extends Controller{
  constructor(
    @inject (Component.LoggerInterface) logger: LoggerInterface,
    @inject (Component.CommentServiceInterface) private commentService: CommentService,
    @inject (Component.OfferServiceInterface) private offerService: OfferService
  ){
    super(logger);
    this.logger.info('Register routes for CommentController…');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getComments});
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>, res: Response): Promise<void>{

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create(body);

    if(!result){
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'New comment creation error',
        'CommentController'
      );
    }

    await this.offerService.incCommentCount(body.offerId);

    this.created(res, result);
  }

  public async getComments({params}: Request<core.ParamsDictionary | ParamsGetComments>, res: Response) : Promise<void>{
    if(!this.offerService.exists(params.offerId)){
      throw new HttpError(StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'CommentController');
    }

    const result = await this.commentService.findByOfferId(params.offerId);

    this.send(res, StatusCodes.OK, result);
  }
}
