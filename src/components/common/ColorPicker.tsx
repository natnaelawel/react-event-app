import React, { useEffect, useState } from 'react';
import { FormControlLabel, Stack, TextField, Typography } from '@mui/material';

type ColorPickerProps = {
    formik: any;
};

const ColorPickerComponent = ({ formik }: ColorPickerProps) => {
    const [color, setColor] = useState(formik.values.color || "#1976d2");

    useEffect(() => {
        const id = setTimeout(() => {
            formik.setFieldValue('color', color);
        }, 200)

        return () => {
            clearTimeout(id)
        }
    }, [color]);



    return (
        <FormControlLabel
            labelPlacement='start'
            control={
                <TextField
                    type="color"
                    value={color}
                    onBlur={formik.handleBlur}
                    name="color"
                    onChange={(e) => setColor(e.target.value)}
                    InputProps={{
                        style: {
                            width: '100px',
                            outline: 'none',
                        },
                    }}
                />}
            label={
                <Stack direction="row" alignItems="center" px={1}>
                    <Typography variant="body1">Pick Color</Typography>
                </Stack>
            }
        />
    );
};

export default ColorPickerComponent;