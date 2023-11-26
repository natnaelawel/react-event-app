import { EventState } from "@/store/slices/calendar/calendarSlice";

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
}

export interface UpdateEventRequest {
  eventId: string;
  update: Partial<EventState>;
}

export interface DeleteEventRequest {
  eventId: string;
}

const getEvents = async (params: GetEventsRequest) => {
  console.log(params, "params");
  const response = await fetch(
    `/api/events?${params.userId ? `userId=${params.userId}` : ""}${
      params.from ? `&from=${params.from}` : ""
    }${params.to ? `&to=${params.to}` : ""}`
  );
  const { status, data } = await response.json();

  return data;
};

const getEvent = async (params: GetEventRequest) => {
  const response = await fetch(`/api/events?id=${params.id}`);
  const { status, data } = await response.json();

  return data;
};

const createEvent = async (params: CreateEventRequest) => {
  const response = await fetch("/api/events", {
    method: "POST",
    body: JSON.stringify(params),
  });

  const { status, data } = await response.json();

  return data;
};

const updateEvent = async (params: UpdateEventRequest) => {
  const response = await fetch(`/api/events/${params.eventId}`, {
    method: "PUT",
    body: JSON.stringify(params.update),
  });

  const { status, data } = await response.json();

  return data;
};

const deleteEvent = async (params: DeleteEventRequest) => {
  const response = await fetch(`/api/events/${params.eventId}`, {
    method: "DELETE",
  });

  const { status, data } = await response.json();

  return data;
};

export const calendarApi = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
