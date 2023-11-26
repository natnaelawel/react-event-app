import React from 'react'
import { Card, CardContent, CardHeader, CircularProgress, Link, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Stack, SvgIcon, Typography } from '@mui/material'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { IoMdMore } from "react-icons/io";
import { useGetEventsQuery } from '@/services/events';
import NextLink from 'next/link';
import { EventState } from '@/types/events';

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
                <CardHeader title={<Typography color={"black"}>Today's Events</Typography>} />
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
                                        return (
                                            <ListItem
                                                key={event.id}
                                                divider
                                            >
                                                <ListItemText
                                                    disableTypography
                                                    primary={(
                                                        <Link
                                                            component={NextLink}
                                                            href={`/calendar/${startDate}&${endDate}`}
                                                            color="text.primary"
                                                            underline="none"
                                                            variant="subtitle2"
                                                        >
                                                            {event.title}
                                                        </Link>
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
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => {
                                                            router.push(`/calendar/${startDate}&${endDate}`)
                                                        }}
                                                    >
                                                        <SvgIcon>
                                                            <IoMdMore />
                                                        </SvgIcon>
                                                    </IconButton>
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