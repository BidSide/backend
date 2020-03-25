import { Model } from 'mongoose';
import { CategoryInterface } from './interfaces/category.interface';
import { CategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<CategoryInterface>);
    getAll(): Promise<CategoryInterface[]>;
    getById(_id: any): Promise<CategoryInterface>;
    getParentOf(_id: any): Promise<CategoryInterface>;
    create(categoryDto: CategoryDto): Promise<CategoryInterface>;
    delete(_id: any): Promise<CategoryInterface>;
}
