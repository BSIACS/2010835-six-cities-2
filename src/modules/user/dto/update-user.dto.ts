import { UserType } from '../../../types/user-type.enum.js';

export class UpdateUserDto{
  public name?: string;
  public avatar?: string;
  public passwor?: string;
  public userType?: UserType;
}
