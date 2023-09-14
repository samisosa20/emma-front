import type { HeritageAdapter } from '../domain/heritage/heritage.adapter';
import type { HeritageRepository } from '../domain/heritage/heritage.repository';
import type { HeritageCreate } from '../domain/heritage/heritage';

class HeritageUseCase implements HeritageRepository {
    private authAdapter: HeritageAdapter;

    constructor(_authAdapter: HeritageAdapter) {
        this.authAdapter = _authAdapter
    }

    listHeritages = () => {
        return this.authAdapter.listHeritages();
    }
    getListPerYearDetail = (year: number) => {
        return this.authAdapter.getListPerYearDetail(year);
    }
    getHeritageDetail = (id: number) => {
        return this.authAdapter.getHeritageDetail(id);
    }
    createHeritage = (data: HeritageCreate) => {
        return this.authAdapter.createHeritage(data);
    }
    editHeritage = (id: number, data: HeritageCreate) => {
        return this.authAdapter.editHeritage(id, data);
    }
    deleteHeritage = (id: number) => {
        return this.authAdapter.deleteHeritage(id);
    }
}

export { HeritageUseCase }