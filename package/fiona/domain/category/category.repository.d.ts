import type { Category, CategoryDetail, CategoryCreate, CategoryList } from "./category"; 


interface CategoryRepository {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Category>} A Promise containing the list of todos.
     */
    listCategories(): Promise<Category>,
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<CategoryList>} A Promise containing the list of todos.
     */
    listSelectCategories(): Promise<CategoryList>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Category>} A Promise containing the list of todos.
     */
    getCategoryDetail(id: number): Promise<CategoryCreate>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createCategory(data: CategoryCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editCategory(id: number, data: CategoryCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deleteCategory(id: number): Promise<{message:string, error: boolean}>,
}

export type { CategoryRepository };
