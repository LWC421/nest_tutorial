import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

//Cat에 대한 전체적인 스키마인 Cat을 상속받는다
//이렇게 하면 불필요한 요소또한 상속을 받음 -> PickType을 사용해서 필요한 부분만
//반대로 필요없는 것만 빼고 싶으면 OmitType을 사용
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1121',
    description: 'id',
  })
  id: string;

  // @ApiProperty({
  //   example: 'test@test.com',
  //   description: 'email',
  //   required: true,
  // })
  // email: string;
  // @ApiProperty({
  //   example: 'james',
  //   description: 'name',
  //   required: true,
  // })
  // name: string;
}
