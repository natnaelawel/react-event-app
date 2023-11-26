import React from 'react'
import { Toaster } from 'react-hot-toast'
import { alpha, useTheme } from '@mui/material/styles'

type Props = {}

const ToasterComponent = (props: Props) => {
    const theme = useTheme()
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    backdropFilter: 'blur(6px)',
                    background: alpha(theme.palette.success.main, 0.8),
                    color: theme.palette.common.white,
                    boxShadow: theme.shadows[16]
                }
            }} />
    )
}

export default ToasterComponent