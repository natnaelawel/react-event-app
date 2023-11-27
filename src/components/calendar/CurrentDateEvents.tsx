import React from 'react'
import { Card, CardContent, CardHeader, CircularProgress, Link, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Stack, SvgIcon, Typography } from '@mui/material'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useGetEventsQuery } from '@/services/events';
import NextLink from 'next/link';
import { EventState } from '@/types/events';
import { SeverityPill } from '../common/SeverityPill';

type Props = {
    userId?: string;
}

const CurrentDateEvents = (props: Props) => {
    const startDate = new Date(format(new Date(), "yyyy-MM-dd")).getTime()
    const endDate = new Date(new Date(
        format(new Date(), "yyyy-MM-dd")
    ).getTime() + 24 * 60 * 60 * 1000 - 1).getTime(); // end of the day


    const { data, isFetching, isError } = useGetEventsQuery(
        {
            from: startDate,
            to: endDate,
            userId: props.userId
        }
    );

    const router = useRouter();
    return (
        <Container sx={{
            width: '100%',
            minWidth: "30vw",
            maxHeight: "100vh",
            overflow: "auto"
        }}
            maxWidth="md" >
            <Card>
                <CardHeader title={<Typography color={"black"}>Today&apos;s Events</Typography>} />
                <CardContent >
                    <List>
                        {
                            isFetching ? (
                                <Stack direction="row" justifyContent={"center"}>
                                    <CircularProgress />
                                </Stack>
                            )
                                : isError ? (
                                    <Typography>
                                        Error
                                    </Typography>
                                ) :
                                    data.data.length > 0 ? data.data.map((event: EventState) => {
                                        const startDate = format(new Date(format(new Date(event.start), "yyyy-MM-dd")), "yyyy-MM-dd")
                                        const endDate = format(new Date(new Date(
                                            format(new Date(event.end), "yyyy-MM-dd")
                                        ).getTime() + 24 * 60 * 60 * 1000 - 1), "yyyy-MM-dd")
                                        return (
                                            <ListItem
                                                component={NextLink}
                                                href={`/calendar/${startDate}&${endDate}`}
                                                key={event.id}
                                                divider
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                        cursor: 'pointer'
                                                    },
                                                    textDecoration: "none",
                                                    color: "inherit"
                                                }}
                                            >
                                                <ListItemText
                                                    disableTypography
                                                    primary={(
                                                        <Typography
                                                            color="text.primary"
                                                            variant="subtitle2"
                                                        >
                                                            {event.title}
                                                        </Typography>
                                                    )}
                                                    secondary={(
                                                        <Stack direction={"column"} px={2}>
                                                            <Typography variant='body2'>
                                                                {event.description || "No description"}
                                                            </Typography>
                                                            <Stack >
                                                                <Typography variant={"caption"}>
                                                                    From:  {format(new Date(event.start), "MM-dd HH:mm aa ")}
                                                                </Typography>
                                                                <Typography variant={"caption"}>
                                                                    To: {format(new Date(event.end), "MM-dd HH:mm aa")}
                                                                </Typography>

                                                            </Stack>
                                                        </Stack>
                                                    )}
                                                />
                                                <ListItemSecondaryAction >
                                                    <SeverityPill color={"primary"}>
                                                        {event.allDay ? "All day" : ""}
                                                    </SeverityPill>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    })
                                        : (
                                            <Typography>
                                                No events
                                            </Typography>
                                        )
                        }
                    </List>
                </CardContent>
            </Card>
        </Container>
    )
}

export default CurrentDateEvents