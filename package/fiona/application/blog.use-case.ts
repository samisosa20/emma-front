import type { BlogAdapter } from '../domain/blog/blog.adapter';
import type { BlogRepository } from '../domain/blog/blog.repository';

class BlogUseCase implements BlogRepository {
    private authAdapter: BlogAdapter;

    constructor(_authAdapter: BlogAdapter) {
        this.authAdapter = _authAdapter
    }

    listBlogs = () => {
        return this.authAdapter.listBlogs();
    }

    getBlogDetail = (slug: string) => {
        return this.authAdapter.getBlogDetail(slug);
    }
}

export { BlogUseCase }