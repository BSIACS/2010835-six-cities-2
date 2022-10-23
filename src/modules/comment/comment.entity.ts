import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity';
import { UserEntity } from '../user/user.entity';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps{
  @prop({required: true})
  public text!: string;

  @prop({required: true})
  public rate!: number;

  @prop({required: true, ref: OfferEntity})
  public offerId!: Ref<OfferEntity>;

  @prop({required: true, ref: UserEntity})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);


