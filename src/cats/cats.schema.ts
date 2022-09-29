import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

//timestamps를 true로 하면 결과값에 자동으로 시간관련 값들이 들어간다
const options: SchemaOptions = {
  collection: 'cats',
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // ApiProperty를 사용하면 Swagger상에서 해당하는 값에 대한 설명을 해준다
  @ApiProperty({
    example: 'test@test.com',
    description: '사용하는 이메일',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'james',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'sample_password',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '/dist/sample.png',
    description: 'image',
    required: true,
  })
  @Prop({
    //default이미지를 설정
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  //readOnlyData를 아래에서 만들었으므로 이를 여기에도 적어준다
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

//virtual field를 이용하여 HTTP요청에 대해 필요한 데이터만 주기
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('commentsList', {
  ref: 'comments', //해당 schema를 찾아서
  localField: '_id', //cats의 _id에 해당하는 comments를
  foreignField: 'info', //info값을 찾아서 가져온다
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
