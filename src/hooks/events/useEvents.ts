import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { calendarThunks } from "@/store/thunks/calendar";
import { GetEventsRequest } from "@/lib/api/calendar";

const useEvents = (params: GetEventsRequest) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.events);
  
  const handleGetEvents = useCallback(() => {
    console.log(params, "params");
    dispatch(calendarThunks.getEvents({
      userId: params.userId,
      from: params.from,
      to: params.to,
    }));
  }, [dispatch]);

  useEffect(() => {
    handleGetEvents();
  }, []);

  return events;
};

export default useEvents;
