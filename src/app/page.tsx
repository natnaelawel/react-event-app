"use client"
import { useAppDispatch } from '@/hooks/redux'
import useUsers from '@/hooks/users/useUsers'
import { UserState } from '@/store/slices/user/userSlice'
import { AuthThunks } from '@/store/thunks/auth'
import { Button, Card, CardContent, CardHeader, CircularProgress, Container, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, SvgIcon, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter();


  const handleLogin = useCallback((user: UserState) => {
    dispatch(AuthThunks.loginUser(user));
    router.push("/calendar");
  }, [dispatch]);


  const users = useUsers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container sx={{
        width: '100%',
      }} maxWidth="xl"
      >
        <h1 className="text-6xl font-bold text-center">
          Welcome to Calendar App
        </h1>

        <p className="text-2xl mt-8">
          Get started by editing{' '}
          <code className="bg-gray-100 p-3 rounded font-mono text-lg">
            pages/index.js
          </code>
        </p>
        <Container maxWidth="md">
          <Card>
            <CardHeader title={<Typography color={"black"}>Users</Typography>} />
            <CardContent >
              <List>
                {
                  users.length == 0 ? <CircularProgress /> : users.map((user) => {
                    return (
                      <ListItem
                        key={user.id}
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
                          <Typography variant="body2">
                            Login as this user, and view user's events
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleLogin(user);
                            }}
                          >
                            Login
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })
                }
              </List>
            </CardContent>

          </Card>
        </Container>
      </Container>

    </main>
  )
}