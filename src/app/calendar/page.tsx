'use client';

import CalendarComponent from '@/components/calendar/Calendar'
import useAuth from '@/hooks/auth/useAuth';
import { useGetEventsQuery } from '@/services/events';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const currentUser = useAuth()
    const { data, isFetching, isError } = useGetEventsQuery(
        { userId: currentUser?.id }, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <Box display={"flex"} sx={{
            width: "100%",
            justifyContent: "center"
        }} >
            {
                isFetching ? (
                    <Stack sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Stack>
                )
                    : isError ? (
                        <Typography>
                            Error
                        </Typography>
                    ) :
                        <CalendarComponent events={data.data} />
            }
        </Box>
    )
}

export default Page