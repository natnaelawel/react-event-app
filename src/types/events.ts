export interface EventState {
  id: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: number;
  end: number;
  userId: string;
  color?: string;
}

export interface GetEventsRequest {
  userId?: string;
  from?: number;
  to?: number;
}

export interface GetEventRequest {
  id: string;
}

export interface CreateEventRequest {
  allDay: boolean;
  description: string;
  end: number;
  start: number;
  title: string;
  userId: string;
  color?: string;
}

export interface UpdateEventRequest {
  eventId: string;
  update: Partial<EventState>;
}

export interface DeleteEventRequest {
  eventId: string;
}
