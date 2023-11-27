'use client';

import Calendar from '@fullcalendar/react';
import useModal from "@/hooks/common/modal";
import useCurrentEvent from "@/hooks/events/useCurrentEvent";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Badge, Box, Card, CardHeader, Container, Link, List, ListItem, ListItemText, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CalendarStyleWrapper } from './CalendarStyleWrapper';
import CurrentDateEvents from './CurrentDateEvents';
import { CalendarToolbar, View } from './CalendarToolbar';
import { EventModal } from './EventModal';
import useAuth from '@/hooks/auth/useAuth';
import { EventState } from '@/types/events';
import { useUpdateEventMutation } from '@/services/events';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import theme from '@/utils/theme';

type Props = {
    events: EventState[];
}

const CalendarComponent = ({ events }: Props) => {
    const currentUser = useAuth();

    const dispatch = useAppDispatch();
    const calendarRef = useRef<any>(null);

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>(mdUp ? View.timeGridDay : View.dayGridMonth);
    const createModal = useModal();
    const updateModal = useModal();
    const updatingEvent = useCurrentEvent(events, updateModal.data);
    const [updateEvent] = useUpdateEventMutation();
    const handleScreenResize = useCallback(() => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            const newView = mdUp ? View.dayGridMonth : View.timeGridDay;

            calendarApi.changeView(newView);
            setView(newView);
        }
    }, [calendarRef, mdUp]);

    useEffect(() => {
        handleScreenResize();
    }, [mdUp]);

    const handleViewChange = useCallback((view: any) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(view);
            setView(view);
        }
    }, []);

    const handleDateToday = useCallback(() => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    }, []);

    const handleDatePrev = useCallback(() => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    }, []);

    const handleDateNext = useCallback(() => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    }, []);

    const handleAddClick = useCallback(() => {
        createModal.handleOpen();
    }, [createModal]);

    const handleRangeSelect = useCallback((arg: any) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
        createModal.handleOpen({
            range: {
                start: arg.start.getTime(),
                end: arg.end.getTime()
            }
        });


    }, [createModal]);

    const handleEventSelect = useCallback((arg: any) => {
        updateModal.handleOpen({
            eventId: arg.event.id
        });
    }, [updateModal]);

    const handleEventResize = useCallback(async (arg: any) => {
        const { event } = arg;
        try {
            await updateEvent({
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start?.getTime(),
                    end: event.end?.getTime()
                }
            }).unwrap();
            toast.success('Event updated successfully');

        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const handleEventDrop = useCallback(async (arg: any) => {
        const { event } = arg;

        try {
            await updateEvent({
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start?.getTime(),
                    end: event.end?.getTime()
                }
            }).unwrap();
            toast.success('Event updated successfully');
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const eventContent = (arg: any) => {
        const timeText = format(arg.event.start, 'hh:mmaa',);
        console.log(arg.event.color)
        return (
            <Stack
                className="custom-event"
                direction={"row"}
                alignItems={"center"}
                flexWrap={"wrap"}
                sx={{
                    // backgroundColor: arg.event.color || theme.palette.primary.main,
                    color: "white",
                    borderRadius: "5px",
                    padding: 1,
                    columnGap: 1,
                    overflow: "ellipsis",
                    height: arg.event.allDay ? "100%" : "auto",
                }}
            >
                <Badge
                    color="primary"
                    variant="dot" invisible
                >
                    {arg.event.allDay ? "All day" : ""}
                </Badge>
                <span>
                    {timeText}
                </span>
                <Typography sx={{
                    wordWrap: "break-word",
                    maxWidth: "100%",
                    overflow: "hidden",
                }} textOverflow={"ellipsis"}>
                    {arg.event.title}
                </Typography>
            </Stack>
        );
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    py: 2,
                }}
            >
                <Stack sx={{
                    flexGrow: 1,
                }} direction={"row"}>
                    <Stack
                        sx={{
                            flexGrow: 1,
                        }}
                        spacing={{
                            xs: 2,
                            md: 3
                        }}>
                        <CalendarToolbar
                            date={date}
                            onAddClick={handleAddClick}
                            onDateNext={handleDateNext}
                            onDatePrev={handleDatePrev}
                            onDateToday={handleDateToday}
                            onViewChange={handleViewChange}
                            view={view}
                        />
                        <Card>
                            <CalendarStyleWrapper>
                                <Calendar
                                    ref={calendarRef}
                                    nowIndicator
                                    eventClassNames={["custom-event"]}
                                    eventContent={eventContent}
                                    allDayMaintainDuration
                                    dayMaxEventRows={3}
                                    droppable
                                    editable
                                    eventClick={handleEventSelect}
                                    eventDisplay="block"
                                    eventDrop={handleEventDrop}
                                    eventResizableFromStart
                                    eventResize={handleEventResize}
                                    events={events}
                                    headerToolbar={false}
                                    height={800}
                                    initialDate={date}
                                    initialView={view}
                                    plugins={[
                                        dayGridPlugin,
                                        interactionPlugin,
                                        listPlugin,
                                        timeGridPlugin,
                                        timelinePlugin
                                    ]}
                                    rerenderDelay={10}
                                    select={handleRangeSelect}
                                    selectable
                                    weekends
                                    longPressDelay={0.7}
                                />
                            </CalendarStyleWrapper  >
                        </Card>
                    </Stack>
                    {
                        mdUp &&
                        <Stack>
                            <CurrentDateEvents userId={currentUser?.id} />
                        </Stack>
                    }
                </Stack>
            </Box>
            <EventModal
                action="create"
                onAddComplete={createModal.handleClose}
                onClose={createModal.handleClose}
                open={createModal.open}
                range={createModal.data?.range}
            />
            <EventModal
                action="update"
                event={updatingEvent}
                onClose={updateModal.handleClose}
                onDeleteComplete={updateModal.handleClose}
                onEditComplete={updateModal.handleClose}
                open={updateModal.open}
            />
        </LocalizationProvider>
    );
};

export default CalendarComponent;
