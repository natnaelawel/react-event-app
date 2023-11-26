import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { calendarThunks } from "@/store/thunks/calendar";
import { GetEventsRequest } from "@/lib/api/calendar";

const useDateRangeEvents = (
   params: GetEventsRequest
) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.events);

  const handleGetEvents = useCallback(() => {
      dispatch(calendarThunks.getEvents(params));
  }, [dispatch]);

  useEffect(() => {
    handleGetEvents();
  }, []);

  return events;
};

export default useDateRangeEvents;
