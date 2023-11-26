'use client';


import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthThunks } from "@/store/thunks/auth";
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    children: React.ReactNode;
}

const CalendarLayout = (props: Props) => {
    const { user: currentUser } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleLogout = useCallback(() => {
        dispatch(AuthThunks.logoutUser());
        router.replace("/")
    }, [dispatch]);


    return (
        <div>
            <Head>
                <title>Calendar</title>
                <meta name="description" content="Calendar" />
            </Head>

            <main>
                <Box
                    sx={{
                        flexGrow: 1,
                    }}>
                    <Container maxWidth="xl">
                        <Box sx={{
                            height: "60px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <h1>Calendar</h1>
                            <Stack direction="row" alignItems={"center"} spacing={3}>
                                <Typography>
                                    {currentUser?.name}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </Button>
                            </Stack>
                        </Box>
                        <Stack direction={"column"}>
                            {props.children}
                        </Stack>
                    </Container>
                </Box>
            </main>
        </div>
    )
}


export default CalendarLayout;