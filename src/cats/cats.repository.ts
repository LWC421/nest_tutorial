import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

//Repository패턴을 적용하기 위하여 repository 정의
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await await this.catModel.findById(catId).select('-password'); //password필드를 제외하고 가져오기
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat> {
    const result = await this.catModel.findOne({ email });
    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result ? true : false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async fildByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`; //cat의 정보를 변경
    const newCat = await cat.save(); //cat의 정보를 저장
    console.log(newCat);

    return newCat.readOnlyData;
  }

  //모든 데이터를 가져온다.
  async findAll() {
    const CommentsModel = mongoose.model(Comments.name, CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('commentsList', CommentsModel);
    //find안에 query문을 쓰지않으면 모든 데이터를 가져온다
    //populate를 사용하면 다른 document와 이어주어서 데이터를 가져온다
    return result;
  }
}
