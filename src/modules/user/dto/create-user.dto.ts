import { IsEmail, IsEnum, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto{
  @IsString({message: 'previewImageSrc is required'})
  @MinLength(1, {message: 'Minimum title length must be 10'})
  @MaxLength(15, {message: 'Maximum title length must be 100'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'avatar is required'})
  public avatar!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @IsEnum(UserType, {message: 'userType must be common and pro'})
  public userType!: UserType;
}
