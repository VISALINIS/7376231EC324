"use client"

import { useEffect, useState } from "react"

import axios from "axios"

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material"

export default function Home() {

  const [notifications, setNotifications] = useState([])

  const [filter, setFilter] = useState("All")
  const [readNotifications, setReadNotifications] = useState([])

  useEffect(() => {

    axios
      .get("http://4.224.186.213/evaluation-service/notifications")
      .then((res) => {

        setNotifications(res.data.notifications)

      })
      .catch((err) => {

  console.log(err)

  setNotifications([
    {
      ID: "1",
      Type: "Placement",
      Message: "Google Hiring",
      Timestamp: "2026-04-22"
    },
    {
      ID: "2",
      Type: "Result",
      Message: "Semester Results Published",
      Timestamp: "2026-04-23"
    },
    {
      ID: "3",
      Type: "Event",
      Message: "Tech Fest Tomorrow",
      Timestamp: "2026-04-24"
    }
  ])

})

  }, [])
  const priorityOrder = {
  Placement: 3,
  Result: 2,
  Event: 1
}

const topNotifications = [...notifications]
  .sort((a, b) => {

    return (
      priorityOrder[b.Type] -
      priorityOrder[a.Type]
    )

  })
  .slice(0, 2)

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.Type === filter
        )

  return (

    <Container maxWidth="md">

      <Typography
        variant="h3"
        sx={{
          marginTop: 4,
          marginBottom: 4,
          textAlign: "center"
        }}
      >
        Campus Notifications
      </Typography>

      <Typography
  variant="h5"
  sx={{
    marginBottom: 2
  }}
>
  Top Priority Notifications
</Typography>

{
  topNotifications.map((item) => (

   <Card
      key={item.ID}
      sx={{
        marginBottom: 2,
        backgroundColor: "#1976d2",
        color: "white"
      }}
    >

      <CardContent>

  <Typography
  variant="h6"
  sx={{
    color: "white"
  }}
>
  {item.Type}
</Typography>

        <Typography>
          {item.Message}
        </Typography>

      </CardContent>

    </Card>

  ))
}

      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginBottom: 4,
          flexWrap: "wrap"
        }}
      >

        <Button
  variant="contained"
  onClick={() => setFilter("All")}
>
  All ({notifications.length})
</Button>

       Event (
{
  notifications.filter(
    (item) => item.Type === "Event"
  ).length
}
)
Result (
{
  notifications.filter(
    (item) => item.Type === "Result"
  ).length
}
)
Placement (
{
  notifications.filter(
    (item) => item.Type === "Placement"
  ).length
}
)

      </Stack>

      {
        filteredNotifications.map((item) => (

         <Card
  key={item.ID}

  onClick={() => {

    if (
      !readNotifications.includes(item.ID)
    ) {

      setReadNotifications([
        ...readNotifications,
        item.ID
      ])

    }

  }}

  sx={{

    marginBottom: 3,

    backgroundColor:

      readNotifications.includes(item.ID)
        ? "#bdbdbd"
        : "white",

    cursor: "pointer"

  }}
>
          

            <CardContent>

              <Typography variant="h6">
                {item.Type}
              </Typography>

              <Typography>
                {item.Message}
              </Typography>

              <Typography variant="body2">

                {item.Timestamp}

              </Typography>

            </CardContent>

          </Card>

        ))
      }

    </Container>

  )
}