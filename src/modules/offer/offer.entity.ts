import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { EstateType } from '../../types/estate-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({required: true})
  public title!: string;

  @prop({required: true})
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true})
  public city!: string;

  @prop({required: true})
  public previewImageSrc!: string;

  @prop({required: true})
  public offerImageSrc!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})                                     //ОБЩЕЕ КОЛИЧЕСТВО БАЛЛОВ РЕЙТИНГА
  public rate!: number;

  @prop({required: true})                                     //КОЛИЧЕСТВО ПОЛЬЗОВАТЕЛЕЙ ПОСТАВИВШИХ ОЦЕНКУ
  public rateQuantity!: number;

  @prop({required: true})
  public estateType!: EstateType;

  @prop({required: true})
  public roomsQuantity!: number;

  @prop({required: true})
  public guestQuantity!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public goods!: string[];

  @prop({required: true, ref: UserEntity})
  public userId!: Ref<UserEntity>;

  @prop()
  public commentsQuantity!: number;

  @prop({required: true})
  public location!: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
