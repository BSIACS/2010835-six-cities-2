import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { EstateType } from '../../../types/estate-type.enum.js';

export default class UpdateOfferDto{
  @IsOptional()
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum title length must be 20'})
  @MaxLength(1024, {message: 'Maximum title length must be 1024'})
  public description?: string;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «image»'})
  public city?: string;

  @IsOptional()
  @IsString({message: 'previewImageSrc is required'})
  public previewImageSrc?: string;

  @IsOptional()
  @IsArray({message: 'offerImageSrc must be an array'})
  public offerImageSrc?: string[];

  @IsOptional()
  @IsBoolean({message: 'isPremium must be an boolean'})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(EstateType, {message: 'type must be an EstateType'})
  public estateType?: EstateType;

  @IsOptional()
  @IsInt({message: 'roomsQuantity must be an integer'})
  public roomsQuantity?: number;

  @IsOptional()
  @IsInt({message: 'guestQuantity must be an integer'})
  public guestQuantity?: number;

  @IsOptional()
  @IsInt({message: 'price must be an integer'})
  @Min(100, {message: 'minimum price is 100'})
  @Max(100000, {message: 'maximum price is 100000'})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'Field categories must be an array'})
  public goods?: string[];

  @IsOptional()
  @IsArray({message: 'field location must be an array'})
  public location?: number[];
}
