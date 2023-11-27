'use client';


import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthThunks } from "@/store/thunks/auth";
import { Avatar, Box, Button, Container, Link, Stack, Typography } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import NextLink from 'next/link';
import { stringAvatar } from "@/utils/helperfunctions";

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
                    <Container maxWidth="xl" sx={{
                    }}>
                        <Box sx={{
                            height: "60px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Box>
                                <Link
                                    href="/calendar"
                                    component={NextLink}
                                    underline="none"
                                    sx={{
                                        color: "inherit"
                                    }}
                                >
                                    <Typography variant="h4" >Calendar</Typography>
                                </Link>
                            </Box>
                            <Stack direction="row" alignItems={"center"} spacing={3}>
                                <Stack direction="row" alignItems={"center"} spacing={1}>
                                    <Avatar
                                        {...stringAvatar(currentUser?.name || "No Name")}
                                        sx={{
                                            ...stringAvatar(currentUser?.name || "No Name").sx,
                                            width: 32, height: 32, fontSize: 14
                                        }}
                                    />
                                    <Typography>
                                        {currentUser?.name}
                                    </Typography>
                                </Stack>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                >
                                    Switch User
                                </Button>
                            </Stack>
                        </Box>
                        <Stack direction={"column"}
                            sx={{
                                minHeight: "calc(100vh - 60px)",
                                width: "100%",
                            }}
                        >
                            {props.children}
                        </Stack>
                    </Container>
                </Box>
            </main>
        </div>
    )
}


export default CalendarLayout;