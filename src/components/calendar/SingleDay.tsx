'use client';

import React from 'react'
import useEvents from '@/hooks/events/useEvents';
import useUsers from '@/hooks/users/useUsers';
import { Box, Stack, Container, Card, CardHeader, Typography, CardContent, List, ListItem, ListItemText, Link, ListItemSecondaryAction, IconButton, SvgIcon } from '@mui/material';
import { CiTrash } from "react-icons/ci";
import { format } from 'date-fns';

type Props = {
    startDate: number;
    endDate: number;
    userId: string;
}

const SingleDayEventsComponent = (props: Props) => {
    const { startDate, endDate, userId } = props;
    console.log(startDate, endDate, userId, "startDate, endDate, userId")
    const events = useEvents({
        from: startDate,
        to: endDate,
        userId: userId
    });

    console.log(events, startDate, endDate, "events")

    return (

        <Container sx={{
            width: '100%',
            minWidth: "30vw",
            maxHeight: "100vh",
            overflow: "auto"
        }} maxWidth="md"

        >
            <Card>
                <CardHeader title={<Typography color={"black"}>Current Events</Typography>} />
                <CardContent >
                    <List>
                        {
                            events.map((event) => {
                                return (
                                    <ListItem
                                        key={event.id}
                                        onClick={() => {
                                        }}
                                        divider
                                    >
                                        <ListItemText
                                            disableTypography
                                            primary={(
                                                <Link
                                                    color="text.primary"
                                                    noWrap
                                                    sx={{ cursor: 'pointer' }}
                                                    underline="none"
                                                    variant="subtitle2"
                                                >
                                                    {event.title}
                                                </Link>
                                            )}
                                            secondary={(
                                                <Stack direction={"column"} px={2}>
                                                    <span>
                                                        {event.description}
                                                    </span>
                                                    <Stack >
                                                        <Typography variant={"caption"}>
                                                            From:  {format(new Date(event.start), "MM-dd HH:mm")}
                                                        </Typography>
                                                        <Typography variant={"caption"}>
                                                            To: {format(new Date(event.end), "MM-dd HH:mm")}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            )}
                                        />
                                        <ListItemSecondaryAction >
                                            <IconButton
                                                edge="end"
                                                onClick={() => {
                                                }}
                                            >
                                                <SvgIcon>
                                                    <CiTrash />

                                                </SvgIcon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </CardContent>

            </Card>
        </Container>


    )
}

// import React from 'react'
// import useCurrentEvent from '@/hooks/events/useCurrentEvent';
// import useEvents from '@/hooks/events/useEvents';
// import { Card, CardContent, CardHeader, Container, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, Stack, SvgIcon, Typography } from '@mui/material'
// import { format } from 'date-fns';
// import { useRouter } from 'next/navigation';
// import { IoMdMore } from "react-icons/io";


export default SingleDayEventsComponent