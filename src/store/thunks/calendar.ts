import { GetEventsRequest, calendarApi } from "@/lib/api/calendar";
import { AppDispatch } from "..";
import {
  getEvents as getCalendarEvents,
  createEvent as createCalendarEvent,
  updateEvent as updateCalendarEvent,
  deleteEvent as deleteCalendarEvent,
  EventState,
} from "../slices/calendar/calendarSlice";

const getEvents = (params: GetEventsRequest) => async (dispatch: AppDispatch) => {
  console.log(params, "params");
  const response = await calendarApi.getEvents(params);
  dispatch(getCalendarEvents(response));
};

const createEvent = (params: any) => async (dispatch: AppDispatch) => {
  const response = await calendarApi.createEvent(params);
  dispatch(createCalendarEvent(response));
};

const updateEvent =
  (params: { eventId: string; update: Partial<EventState> }) =>
  async (dispatch: AppDispatch) => {
    const response = await calendarApi.updateEvent(params);

    dispatch(updateCalendarEvent(response));
  };

const deleteEvent = (params: any) => async (dispatch: AppDispatch) => {
  await calendarApi.deleteEvent(params);

  dispatch(deleteCalendarEvent(params.eventId));
};

export const calendarThunks = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
};
