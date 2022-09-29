import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  collection: 'comments',
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '고양이 고유id',
  })
  @Prop({
    type: Types.ObjectId, //id라는 key의 값은 mongoose에서 따르 쓰는 타입임
    required: true,
    ref: 'cats', //ref를 설정해서 어느 DB와 연결 할 것인지
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: '댓글내용',
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    example: 1,
    description: '좋아요 수',
    required: true,
  })
  @Prop({
    default: 0,
    required: true,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
