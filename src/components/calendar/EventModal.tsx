'use client';

import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { addMinutes, format } from 'date-fns';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CiTrash } from "react-icons/ci";

import {
    Box,
    Button,
    Dialog,
    Divider,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputProps,
    Stack,
    SvgIcon,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from '@/services/events';
import { EventState } from '@/types/events';
const useInitialValues = (event: any, range: any) => {
    return useMemo(() => {
        if (event) {
            return {
                allDay: event.allDay || false,
                color: event.color || '',
                description: event.description || '',
                end: event.end ? new Date(event.end) : addMinutes(new Date(), 30),
                start: event.start ? new Date(event.start) : new Date(),
                title: event.title || '',
                submit: null,
            };
        }

        if (range) {
            return {
                allDay: false,
                color: '',
                end: new Date(range.end),
                start: new Date(range.start),
                title: '',
                submit: null,
            };
        }

        return {
            allDay: false,
            color: '',
            description: '',
            end: addMinutes(new Date(), 30),
            start: new Date(),
            title: '',
            submit: null
        };
    }, [event, range]);
};

const validationSchema = Yup.object({
    allDay: Yup.bool(),
    description: Yup.string().max(5000),
    end: Yup.date(),
    start: Yup.date(),
    title: Yup
        .string()
        .max(255)
        .required('Title is required')
});

type Props = {
    action: 'create' | 'update',
    event?: EventState,
    onAddComplete?: () => void,
    onClose?: () => void,
    onDeleteComplete?: () => void,
    onEditComplete?: () => void,
    open: boolean,
    range?: any

}

export const EventModal = (props: Props) => {
    const {
        action = 'create',
        event,
        onAddComplete,
        onClose,
        onDeleteComplete,
        onEditComplete,
        open = false,
        range
    } = props;
    const dispatch = useAppDispatch();
    const initialValues = useInitialValues(event, range);
    const { user: currentUser } = useAppSelector(
        (state) => state.auth
    );
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
    const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
    const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            helpers.setSubmitting(true);
            try {
                const data = {
                    allDay: values.allDay,
                    description: values.description,
                    end: values.end.getTime(),
                    start: values.start.getTime(),
                    title: values.title,
                    userId: currentUser?.id || ""
                };

                if (action === 'update') {

                    await updateEvent({
                        eventId: event!.id,
                        update: {
                            ...data,
                        }
                    }).unwrap();
                    toast.success('Event updated');
                } else {
                    await createEvent(
                        data
                    ).unwrap();
                    toast.success('Event added');
                }
                helpers.setSubmitting(false);
                helpers.resetForm();

                if (action === 'update') {
                    onEditComplete?.();
                } else {
                    onAddComplete?.();
                }
            } catch (err: any) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    const handleStartDateChange = useCallback((date: any) => {
        formik.setFieldValue('start', date);
        // Prevent end date to be before start date
        if (formik.values.end && date && date > formik.values.end) {
            formik.setFieldValue('end', date);
        }
    }, [formik]);

    const handleEndDateChange = useCallback((date: any) => {
        formik.setFieldValue('end', date);

        // Prevent start date to be after end date
        if (formik.values.start && date && date < formik.values.start) {
            formik.setFieldValue('start', date);
        }
    }, [formik]);

    const handleDelete = useCallback(async () => {
        if (!event) {
            return;
        }

        try {
            await deleteEvent({
                eventId: event.id
            }).unwrap();
            toast.success('Event deleted');
            onDeleteComplete?.();
        } catch (err) {
            console.error(err);
        }
    }, [dispatch, event, onDeleteComplete]);

    const router = useRouter();

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ p: 3 }}>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >

                        <Typography
                            align="center"
                            gutterBottom
                            variant="h5"
                        >
                            {event
                                ? 'Edit Event'
                                : 'Add Event'}
                        </Typography>

                        <Button variant='contained' onClick={() => {
                            // onClose?.();
                            router.push(`/calendar/${format(new Date(formik.values.start), "yyyy-MM-dd")}&${format(new Date(formik.values.end), "yyyy-MM-dd")}`);
                        }}>
                            Go to events
                        </Button>
                    </Stack>
                </Box>
                <Stack
                    spacing={2}
                    sx={{ p: 3 }}
                >
                    <TextField
                        error={!!(formik.touched.title && formik.errors.title)}
                        fullWidth
                        helperText={formik.touched.title && formik.errors.title ? formik.errors.title.toString() : ''}
                        label="Title"
                        name="title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <TextField
                        error={!!(formik.touched.description && formik.errors.description)}
                        fullWidth
                        helperText={formik.touched.description && formik.errors.description ? formik.errors.description.toString() : ''}
                        label="Description"
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <FormControlLabel
                        control={(
                            <Switch
                                checked={formik.values.allDay}
                                name="allDay"
                                onChange={formik.handleChange}
                            />
                        )}
                        label="All day"
                    />
                    <DateTimePicker
                        label="Start date"
                        onChange={handleStartDateChange}
                        // renderInput={(inputProps: any) => (
                        //   <TextField
                        //     fullWidth
                        //     {...inputProps} />
                        // )}
                        value={formik.values.start}
                    />
                    <DateTimePicker
                        label="End date"
                        onChange={handleEndDateChange}
                        // renderInput={(inputProps: InputProps) => (
                        //   <TextField
                        //     fullWidth
                        //     {...inputProps} />
                        // )}
                        value={formik.values.end}
                    />
                    {!!(formik.touched.end && formik.errors.end) && (
                        <FormHelperText error>
                            {/* {formik.errors.end} */}
                        </FormHelperText>
                    )}
                </Stack>
                <Divider />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ p: 2 }}
                >
                    {event && (
                        <IconButton onClick={() => handleDelete()}>
                            <SvgIcon>
                                <CiTrash />
                            </SvgIcon>
                        </IconButton>
                    )}
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Button
                            color="inherit"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={formik.isSubmitting}
                            type="submit"
                            variant="contained"
                            sx={{ px: 2, minWidth: 100 }}
                        >
                            {
                                action === 'update'
                                    ? isUpdating
                                        ? 'Updating...'
                                        : 'Update'
                                    : isCreating
                                        ? 'Adding...'
                                        : 'Add'
                            }
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Dialog>
    );
};
