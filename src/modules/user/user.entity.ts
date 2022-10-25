import { UserType } from '../../types/user-type.enum.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';
import { CreateUserDto } from './dto/create-user.dto.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
export class UserEntity extends defaultClasses.TimeStamps {

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public avatar!: string;

  @prop({required: true, default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  @prop({required: true, default: []})                          //МАССИВ ИЗБРАННЫХ ОБЪЯВЛЕНИЙ
  public favoriteOffers!: string[];

  @prop({
    type: () => String,
    enum: UserType
  })
  public userType!: UserType;

  constructor(dto : CreateUserDto){
    super();
    this.name = dto.name;
    this.email = dto.email;
    this.avatar = dto.avatar;
    this.userType = dto.userType;
  }
}

export const UserModel = getModelForClass(UserEntity);
