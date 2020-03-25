import { CategoriesService } from './categories.service';
import { CategoryInterface } from './interfaces/category.interface';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(req: any): Promise<CategoryInterface[]>;
}
