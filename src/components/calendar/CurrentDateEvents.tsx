import React from 'react'
import useCurrentEvent from '@/hooks/events/useCurrentEvent';
import useEvents from '@/hooks/events/useEvents';
import { Card, CardContent, CardHeader, Container, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, Stack, SvgIcon, Typography } from '@mui/material'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { IoMdMore } from "react-icons/io";


type Props = {
    selectedDateRange: {
        from?: number;
        to?: number;
    };
    userId?: string;
}

const CurrentDateEvents = (props: Props) => {
    const events = useEvents(
        {
            from: props.selectedDateRange?.from,
            to: props.selectedDateRange?.to,
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
                                                    const startDate = format(new Date(event.start), "yyyy-MM-dd");
                                                    const endDate = format(new Date(event.end), "yyyy-MM-dd");
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
                        }
                    </List>
                </CardContent>

            </Card>
        </Container>
    )
}

export default CurrentDateEvents