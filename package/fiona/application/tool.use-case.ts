import type { ToolAdapter } from '../domain/tool/tool.adapter';
import type { ToolRepository } from '../domain/tool/tool.repository';
import type { TestProjectParams, PredictionParams } from '../domain/tool/tool';

class ToolUseCase implements ToolRepository {
    private authAdapter: ToolAdapter;

    constructor(_authAdapter: ToolAdapter) {
        this.authAdapter = _authAdapter
    }

    getCanIDo = (params: PredictionParams) => {
        return this.authAdapter.getCanIDo(params);
    }
    getTestProject = (params: TestProjectParams) => {
        return this.authAdapter.getTestProject(params);
    }
}

export { ToolUseCase }