"use client"
import { useAppDispatch } from '@/hooks/redux'
import useUsers from '@/hooks/users/useUsers'
import { UserState } from '@/store/slices/user/userSlice'
import { AuthThunks } from '@/store/thunks/auth'
import { stringAvatar } from '@/utils/helperfunctions'
import { Avatar, Button, Card, CardContent, CardHeader, CircularProgress, Container, IconButton, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, SvgIcon, Theme, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter();

  const handleLogin = useCallback((user: UserState) => {
    dispatch(AuthThunks.loginUser(user));
    router.push("/calendar");
  }, [dispatch]);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const users = useUsers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container sx={{
        width: '100%',
        py: 4,
      }} maxWidth="lg"
      >
        <Typography
          variant={"h3"}
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "black",
          }}
          textAlign={"center"} >
          Welcome to Calendar App
        </Typography>

        <Container maxWidth="md">
          <Card>
            <CardHeader title={<Stack>
              <Typography variant="h5" color={"black"}>
                Users
              </Typography>
              <Typography variant="caption"
                sx={{
                  color: "black",
                  fontSize: "1rem",
                }}
              >
                Click on view to view user&apos;s calendar
              </Typography>
            </Stack>
            }
            />
            <CardContent >
              <List>
                {
                  users.length == 0 ? <Stack
                    direction="row"
                    justifyContent={"center"}
                  >
                    <CircularProgress />
                  </Stack> : users.length > 0 ? users.map((user) => {
                    return (
                      <ListItem
                        key={user.id}
                        onClick={() => {
                        }}
                        divider
                        sx={{
                          columnGap: "1rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ListItemAvatar sx={{ mt: 0.5 }}>
                          <Avatar {...stringAvatar(user.name)} />
                        </ListItemAvatar>
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
                              {user.name}
                            </Link>
                          )}
                          secondary={(
                            <Typography variant="body2">
                              {user.email}
                            </Typography>
                          )}
                        />
                        <ListItemSecondaryAction sx={{
                          columnGap: "1rem",
                          display: "flex",
                          alignItems: "center",
                        }} >


                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleLogin(user);
                            }}
                          >
                            View
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  }) :
                    <Typography>
                      No users
                    </Typography>
                }
              </List>
            </CardContent>
          </Card>
        </Container>
      </Container>

    </main>
  )
}