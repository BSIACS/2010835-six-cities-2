import { UserType } from '../../../types/user-type.enum.js';
import { UserEntity } from '../user.entity.js';

export class CreateUserResponseDto{
  public name!: string;
  public email!: string;
  public avatar!: string;
  public userType!: UserType;

  constructor(userEntity: UserEntity){
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.avatar = userEntity.avatar;
    this.userType = userEntity.userType;
  }
}
