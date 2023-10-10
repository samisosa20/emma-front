import type { MovementAdapter } from '../domain/movement/movement.adapter';
import type { MovementRepository } from '../domain/movement/movement.repository';
import type { MomeventCreate } from '../domain/movement/movement';

class MovementUseCase implements MovementRepository {
    private authAdapter: MovementAdapter;

    constructor(_authAdapter: MovementAdapter) {
        this.authAdapter = _authAdapter
    }

    getMovementDetail = (id: number) => {
        return this.authAdapter.getMovementDetail(id);
    }
    createMovement = (data: MomeventCreate) => {
        return this.authAdapter.createMovement(data);
    }
    editMovement = (id: number, data: MomeventCreate) => {
        return this.authAdapter.editMovement(id, data);
    }
    deleteMovement = (id: number) => {
        return this.authAdapter.deleteMovement(id);
    }
}

export { MovementUseCase }