'use client';

import React from 'react'
import { Box, Stack, Container, Card, CardHeader, Typography, CardContent, List, ListItem, ListItemText, Link, ListItemSecondaryAction, IconButton, SvgIcon } from '@mui/material';
import { CiTrash } from "react-icons/ci";
import { format } from 'date-fns';
import { useGetEventsQuery } from '@/services/events';
import { EventState } from '@/types/events';

type Props = {
    startDate: number;
    endDate: number;
    userId: string;
}

const SingleDayEventsComponent = (props: Props) => {
    const { startDate, endDate, userId } = props;
    const { data, isFetching, isError } = useGetEventsQuery(
        {
            from: startDate,
            to: endDate,
            userId: userId
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    return (

        <Container sx={{
            width: '100%',
            minWidth: "30vw",
            maxHeight: "100vh",
            overflow: "auto"
        }} maxWidth="md"

        >
            <Card>
                <CardHeader title={<Typography variant='h5' color={"black"}>Events</Typography>} />
                <CardContent >
                    <List>
                        {
                            isFetching ? <Typography>loading...</Typography> :
                                data.data.length > 0 ? data.data.map((event: EventState) => {
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
                                                                From:  {format(new Date(event.start), "yyyy-MM-dd HH:mm aa")}
                                                            </Typography>
                                                            <Typography variant={"caption"}>
                                                                To: {format(new Date(event.end), "yyyy-MM-dd HH:mm aa")}
                                                            </Typography>
                                                            <Typography variant={"caption"}>
                                                                All day: {event.allDay ? "Yes" : "No"}
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
                                }) :
                                    <Typography>
                                        No events
                                    </Typography>
                        }
                    </List>
                </CardContent>
            </Card>
        </Container>


    )
}

export default SingleDayEventsComponent