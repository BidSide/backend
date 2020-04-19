import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './interfaces/category.interface';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryInterface>,
  ) {
  }

  async getAll() {
    return this.categoryModel.find({
      parentCategory: null,
    });
  }

  async getById(_id) {
    return this.categoryModel.findById(_id);
  }

  async getParentOf(_id) {
    const category = await this.getById(_id);
    return this.categoryModel.findById(category.parentCategory);
  }

  async create(categoryDto: CategoryDto) {
    // TODO: set the parent's children
    const category = new this.categoryModel(categoryDto);
    return category.save();
  }

  async delete(_id) {
    // TODO: children/parent check
    return this.categoryModel.findByIdAndDelete(_id);
  }

  async findByName(searchForCategory: string) {
    return this.categoryModel.findOne({name: searchForCategory});
  }
}
