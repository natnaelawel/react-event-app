'use client';

import Calendar from '@fullcalendar/react';
import useModal from "@/hooks/common/modal";
import useCurrentEvent from "@/hooks/events/useCurrentEvent";
import useEvents from "@/hooks/events/useEvents";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { calendarThunks } from "@/store/thunks/calendar";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Card, CardHeader, Container, Link, List, ListItem, ListItemText, Stack, Theme, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CalendarStyleWrapper } from './CalendarStyleWrapper';
import CurrentDateEvents from './CurrentDateEvents';
import useUsers from '@/hooks/users/useUsers';
import { CalendarToolbar, View } from './CalendarToolbar';
import { EventModal } from './EventModal';

const CalendarComponent = () => {
    const dispatch = useAppDispatch();
    const calendarRef = useRef<any>(null);
    const { user: currentUser } = useAppSelector(
        (state) => state.auth
    );
    const events = useEvents({
        userId: currentUser?.id
    });
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>(mdUp ? View.timeGridDay : View.dayGridMonth);
    const createModal = useModal();
    const updateModal = useModal();
    const updatingEvent = useCurrentEvent(events, updateModal.data);
    const [selectedDateRange, setSelectedDateRange] = useState<{
        from?: number;
        to?: number;
    }>({

    });

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

        console.log(arg, "arg");
        setSelectedDateRange({
            from: arg.start.getTime(),
            to: arg.end.getTime()
        });

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
            await dispatch(calendarThunks.updateEvent({
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start?.getTime(),
                    end: event.end?.getTime()
                }
            }));
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const handleEventDrop = useCallback(async (arg: any) => {
        const { event } = arg;

        try {
            await dispatch(calendarThunks.updateEvent({
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start?.getTime(),
                    end: event.end?.getTime()
                }
            }));
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack direction={"row"}>
                        <Stack
                            sx={{
                                flexGrow: 1,
                            }}
                            spacing={3}>
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
                                        ref={calendarRef}
                                        rerenderDelay={10}
                                        select={handleRangeSelect}
                                        selectable
                                        weekends

                                    />
                                </CalendarStyleWrapper  >
                            </Card>
                        </Stack>
                        <Stack>
                            <CurrentDateEvents selectedDateRange={selectedDateRange} userId={currentUser?.id} />
                        </Stack>
                    </Stack>
                </Container>
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
