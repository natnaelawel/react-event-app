'use client';

import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import {
    MdArrowBackIos,
    MdArrowForwardIos
} from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";

import {
    Button,
    IconButton,
    Stack,
    SvgIcon,
    TextField,
    Theme,
    Typography,
    useMediaQuery
} from '@mui/material';

const viewOptions = [
    {
        label: 'Month',
        value: 'dayGridMonth'
    },
    {
        label: 'Week',
        value: 'timeGridWeek'
    },
    {
        label: 'Day',
        value: 'timeGridDay'
    },
];

export enum View {
    dayGridMonth = 'dayGridMonth',
    timeGridWeek = 'timeGridWeek',
    timeGridDay = 'timeGridDay',
}

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
            : viewOptions.filter((option) => ['timeGridDay', 'listWeek'].includes(option.value));
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
            sx={{ px: 3, py: 1 }}
            {...other}
        >
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
            >
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

                <Button
                    sx={{
                        width: {
                            xs: '100%',
                            md: 'auto'
                        }
                    }}
                    variant='outlined' onClick={onDateToday}>
                    Today
                </Button>
            </Stack>
            <Stack
                direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant="h5">
                    {dateMonth}
                </Typography>

                <Typography
                    sx={{ fontWeight: 400 }}
                    variant="h5"
                >
                    {dateDay}
                </Typography>
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
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
                            xs: '100%',
                            md: 'auto'
                        }
                    }}
                    variant="contained"
                >
                    New Event
                </Button>
            </Stack>
        </Stack>
    );
};
