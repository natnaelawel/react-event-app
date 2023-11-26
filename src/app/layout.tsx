'use client'
import React from 'react'
import { ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/store'
import theme from '@/utils/theme';
import { Toaster } from 'react-hot-toast';
import ToasterComponent from '@/components/common/Toaster';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}

           <ToasterComponent/>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
