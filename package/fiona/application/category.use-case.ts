import type { CategoryAdapter } from '../domain/category/category.adapter';
import type { CategoryRepository } from '../domain/category/category.repository';
import type { CategoryCreate, CategoryDetailParams } from '../domain/category/category';

class CategoryUseCase implements CategoryRepository {
    private authAdapter: CategoryAdapter;

    constructor(_authAdapter: CategoryAdapter) {
        this.authAdapter = _authAdapter
    }

    listCategories = () => {
        return this.authAdapter.listCategories();
    }
    listSelectCategories = () => {
        return this.authAdapter.listSelectCategories();
    }
    getCategoryDetail = (id: number, params: CategoryDetailParams) => {
        return this.authAdapter.getCategoryDetail(id, params);
    }
    createCategory = (data: CategoryCreate) => {
        return this.authAdapter.createCategory(data);
    }
    editCategory = (id: number, data: CategoryCreate) => {
        return this.authAdapter.editCategory(id, data);
    }
    deleteCategory = (id: number) => {
        return this.authAdapter.deleteCategory(id);
    }
}

export { CategoryUseCase }