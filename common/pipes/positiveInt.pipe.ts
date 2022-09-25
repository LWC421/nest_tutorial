import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
// Custom Pipe를 만들려고 하면 PipeTransform을 Implements하자
// transform함수에서 받은 값을 원하는 과정으로 처리한 후 return해주자
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('Value is must positive', 400);
    }

    return value;
  }
}
