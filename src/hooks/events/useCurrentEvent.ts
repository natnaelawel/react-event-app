import { EventState } from "@/store/slices/calendar/calendarSlice";
import { useMemo } from "react";

type DialogData = {
  eventId: any;
};

const useCurrentEvent = (events: EventState[], dialogData?: DialogData) => {
  return useMemo(() => {
    if (!dialogData) {
      return undefined;
    }

    return events.find((event: { id: any }) => event.id === dialogData.eventId);
  }, [dialogData, events]);
};

export default useCurrentEvent;
