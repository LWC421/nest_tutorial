import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cats.schema';

// RequestDto는 Cat스키마를 상속받아 필요한부분만 사용하자
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
]) {}

/* Dto의 경우 하나하나 필요할때마다 작성하기 힘드므로 Cat이라는 하나의 스키마로부터
    상속받아 사용하는 것이 재사용에 있어서 좋다
*/
// export class CatRequestDto {
// @ApiProperty({
//   example: 'test@test.com',
//   description: 'email',
//   required: true,
// })
// @IsEmail()
// @IsNotEmpty()
// email: string;
// @ApiProperty({
//   example: 'test_password',
//   description: 'password',
//   required: true,
// })
// @IsString()
// @IsNotEmpty()
// password: string;
// @ApiProperty({
//   example: 'james',
//   description: 'name',
//   required: true,
// })
// @IsString()
// @IsNotEmpty()
// name: string;
// }
