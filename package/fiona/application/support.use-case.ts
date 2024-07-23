import type { SupportAdapter } from '../domain/support/support.adapter';
import type { SupportRepository } from '../domain/support/support.repository';
import type { SupportParamsSchema } from '../domain/support/support';

class SupportUseCase implements SupportRepository {
    private authAdapter: SupportAdapter;

    constructor(_authAdapter: SupportAdapter) {
        this.authAdapter = _authAdapter
    }

    postSupport = (params: SupportParamsSchema) => {
        return this.authAdapter.postSupport(params);
    }
}

export { SupportUseCase }