import { MinLength, MaxLength, IsDateString, IsMongoId, IsArray, IsEnum, IsInt, IsString, IsBoolean, Min, Max } from 'class-validator';
import { EstateType } from '../../../types/estate-type.enum.js';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum title length must be 20'})
  @MaxLength(1024, {message: 'Maximum title length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'date must be valid ISO date'})
  public date!: Date;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public city!: string;

  @IsString({message: 'previewImageSrc is required'})
  public previewImageSrc!: string;

  @IsArray({message: 'offerImageSrc must be an array'})
  public offerImageSrc!: string[];

  @IsBoolean({message: 'isPremium must be an boolean'})
  public isPremium!: boolean;

  @IsInt({message: 'rate must be an integer'})
  public rate!: number;

  @IsInt({message: 'rateQuantity must be an integer'})
  public rateQuantity!: number;

  @IsEnum(EstateType, {message: 'type must be Buy and Sell'})
  public estateType!: EstateType;

  @IsInt({message: 'roomsQuantity must be an integer'})
  public roomsQuantity!: number;

  @IsInt({message: 'guestQuantity must be an integer'})
  public guestQuantity!: number;

  @IsInt({message: 'price must be an integer'})
  @Min(100, {message: 'minimum price is 100'})
  @Max(100000, {message: 'maximum price is 100000'})
  public price!: number;

  @IsArray({message: 'Field categories must be an array'})
  public goods!: string[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsInt({message: 'commentsQuantity must be an integer'})
  public commentsQuantity!: number;

  @IsArray({message: 'field location must be an array'})
  public location!: number[];
}
