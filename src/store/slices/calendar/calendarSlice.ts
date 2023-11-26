import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EventState {
  id: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: number;
  end: number;
  userId: string;
}

export interface CalendarState {
  events: EventState[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    getEvents(state: CalendarState, action: PayloadAction<EventState[]>) {
      state.events = action.payload;
    },
    createEvent(state: CalendarState, action: PayloadAction<EventState>) {
      state.events.push(action.payload);
    },
    updateEvent(state: CalendarState, action: PayloadAction<EventState>) {
      const event = action.payload;

      state.events = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }

        return _event;
      });
    },
    deleteEvent(state: CalendarState, action: PayloadAction<string>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const { getEvents, createEvent, updateEvent, deleteEvent } =
  calendarSlice.actions;

export const selectCalendar = (state: { calendar: CalendarState }) =>
  state.calendar;

const calendarReducer = calendarSlice.reducer;

export default calendarReducer;
