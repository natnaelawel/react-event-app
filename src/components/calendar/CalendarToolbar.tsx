'use client';

import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import {
    MdArrowBackIos,
    MdArrowForwardIos
} from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";

import {
    Box,
    Button,
    IconButton,
    Stack,
    SvgIcon,
    TextField,
    Theme,
    Typography,
    useMediaQuery
} from '@mui/material';


export enum View {
    dayGridMonth = 'dayGridMonth',
    timeGridWeek = 'timeGridWeek',
    timeGridDay = 'timeGridDay',
}

const viewOptions = [
    {
        label: 'Month',
        value: View.dayGridMonth
    },
    {
        label: 'Week',
        value: View.timeGridWeek
    },
    {
        label: 'Day',
        value: View.timeGridDay
    },
];


type CalendarToolbarProps = {
    date: Date;
    onAddClick?: () => void;
    onDateNext?: () => void;
    onDatePrev?: () => void;
    onDateToday?: () => void;
    onViewChange?: (view: View) => void;
    view: View;
};

export const CalendarToolbar = (props: CalendarToolbarProps) => {
    const {
        date,
        onAddClick,
        onDateNext,
        onDatePrev,
        onDateToday,
        onViewChange,
        view,
        ...other
    } = props;
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const handleViewChange = useCallback((event: any) => {
        onViewChange?.(event.target.value);
    }, [onViewChange]);

    const dateMonth = format(date, 'MMMM');
    const dateDay = format(date, 'y');

    // On mobile allow only timeGridDay and agenda views

    const availableViewOptions = useMemo(() => {
        return mdUp
            ? viewOptions
            : viewOptions.filter((option: {
                label: string;
                value: View;
            }) => [View.timeGridDay].includes(option.value));
    }, [mdUp]);

    return (
        <Stack
            alignItems="center"
            flexWrap="wrap"
            justifyContent="space-between"
            flexDirection={{
                xs: 'column',
                md: 'row'
            }}
            sx={{
                py: 1,
                width: "100%",
                overflow: "auto",
                gap: 1,
            }}
            spacing={1}
            {...other}
        >
            <Box
                width={{
                    xs: "100%",
                    md: "auto"
                }}
                sx={{
                    gap: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    xs: {
                        flexGrow: 1,
                        width: "100%",
                        justifyContent: "space-between"
                    },
                }}
            >
                <Stack direction={"row"} sx={{
                }}>
                    <IconButton onClick={onDatePrev}>
                        <SvgIcon>
                            <MdArrowBackIos />
                        </SvgIcon>
                    </IconButton>
                    <IconButton onClick={onDateNext}>
                        <SvgIcon>
                            <MdArrowForwardIos />
                        </SvgIcon>
                    </IconButton>
                </Stack>

                <Button
                    sx={{
                        width: {
                            md: 'auto',
                            minWidth: "100px"
                        }
                    }}
                    variant='outlined' onClick={onDateToday}>
                    Today
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Typography variant="h5">
                    {dateMonth}
                </Typography>

                <Typography
                    sx={{ fontWeight: 400 }}
                    variant="h5"
                >
                    {dateDay}
                </Typography>
            </Box>
            <Box
                width={{
                    xs: "100%",
                    md: "auto"
                }}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1
                }}
            >
                <TextField
                    label="View"
                    name="view"
                    onChange={handleViewChange}
                    select
                    SelectProps={{ native: true }}
                    size="small"
                    sx={{
                        minWidth: 120,
                        order: {
                            xs: -1,
                            md: 0
                        }
                    }}
                    value={view}
                >
                    {availableViewOptions.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <Button
                    onClick={onAddClick}
                    startIcon={(
                        <SvgIcon>
                            <HiOutlinePlus />
                        </SvgIcon>
                    )}
                    sx={{
                        width: {

                        }
                    }}
                    variant="contained"
                >
                    New Event
                </Button>
            </Box>
        </Stack>
    );
};
