import type { EventAdapter } from '../domain/event/event.adapter';
import type { EventRepository } from '../domain/event/event.repository';
import type { EventCreate } from '../domain/event/event';

class EventUseCase implements EventRepository {
    private authAdapter: EventAdapter;

    constructor(_authAdapter: EventAdapter) {
        this.authAdapter = _authAdapter
    }

    listEvents = () => {
        return this.authAdapter.listEvents();
    }
    getEventDetail = (id: number) => {
        return this.authAdapter.getEventDetail(id);
    }
    createEvent = (data: EventCreate) => {
        return this.authAdapter.createEvent(data);
    }
    editEvent = (id: number, data: EventCreate) => {
        return this.authAdapter.editEvent(id, data);
    }
}

export { EventUseCase }