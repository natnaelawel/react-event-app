'use client';

import SingleDayEventsComponent from '@/components/calendar/SingleDay';
import useAuth from '@/hooks/auth/useAuth';
import { Box, CircularProgress, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {};


const DateSpanPage = (props: Props) => {
    const pathname = usePathname();
    const currentUser = useAuth()
    const [startDateStr, endDateStr] = pathname.split('/').slice(-1)[0].split('&');

    const startDate = new Date(startDateStr).getTime(); // start of the day
    const endDate = new Date(endDateStr).getTime(); // end of the day

    return (
        <Box
            display={"flex"}
            sx={{
                width: "100%",
                justifyContent: "center",
            }} >
            {
                currentUser ? (
                    <SingleDayEventsComponent startDate={startDate} endDate={endDate} userId={currentUser.id} />
                ) : <Stack sx={{
                    minHeight: "50vh",
                }}>
                    <CircularProgress />
                </Stack>
            }
        </Box>
    );
}

export default DateSpanPage