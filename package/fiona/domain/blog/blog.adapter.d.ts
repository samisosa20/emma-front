import type { Blogs, BlogDetail  } from "./blog"; // Import the Auth type


interface BlogAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Blogs>} A Promise containing the list of todos.
     */
    listBlogs(): Promise<Blogs>,

    /**
     * Retrieves a list of todos from the data source.
     * @param {slug} string - The unique identifier of the todo.
     * @returns {Promise<BlogDetail>} A Promise containing the list of todos.
     */
    getBlogDetail(slug: string): Promise<BlogDetail>,
}

export type { BlogAdapter };
