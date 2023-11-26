'use client';

import CalendarComponent from '@/components/calendar/Calendar'
import { Box, Stack, Container } from '@mui/material';
import Head from 'next/head'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <CalendarComponent />
        </div>
    )
}

export default page