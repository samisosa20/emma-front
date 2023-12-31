import type { Event, EventDetail, EventCreate, EventSelect } from "./event"; // Import the Auth type


interface EventAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Event>} A Promise containing the list of todos.
     */
    listEvents(): Promise<Event>,
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<EventSelect>} A Promise containing the list of todos.
     */
    listSelectEvents(): Promise<EventSelect>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<Event>} A Promise containing the list of todos.
     */
    getEventDetail(id: number): Promise<EventDetail>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createEvent(data: EventCreate): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editEvent(id: number, data: EventCreate): Promise<{message:string, error: boolean}>,

}

export type { EventAdapter };
