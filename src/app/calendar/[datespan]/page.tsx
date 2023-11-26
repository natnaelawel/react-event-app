'use client';

import CalendarComponent from '@/components/calendar/Calendar'
import SingleDayEventsComponent from '@/components/calendar/SingleDay';
import useUsers from '@/hooks/users/useUsers';
import { Box, Stack, Container, CircularProgress } from '@mui/material';
import Head from 'next/head'
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const pathname = usePathname();
    const [startDateStr, endDateStr] = pathname.split('/').slice(-1)[0].split('&');
    const startDate = new Date(startDateStr).getTime();
    const endDate = new Date(endDateStr).getTime();
    const users = useUsers();

    return (
        <div>
            {
                users.length > 0 ? (
                    <SingleDayEventsComponent startDate={startDate} endDate={endDate} userId={users[0]?.id} />
                ) : <CircularProgress />
            }
        </div>
    );
}

export default page