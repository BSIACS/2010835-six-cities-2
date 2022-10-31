import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import CreateCommentDto from './dto/create-comment-dto.js';


export interface CommentServiceInterface{
  find(): Promise<DocumentType<CommentEntity>[]>;
  create(createCommentDto: CreateCommentDto) : Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
