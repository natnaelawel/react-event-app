import { v4 as uuidv4 } from "uuid";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

type EventType = {
  id: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: number;
  end: number;
  userId: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const filePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "data",
    "events.json"
  );
  const eventsData = readFileSync(filePath, "utf8");
  const events = JSON.parse(eventsData);
  if (id) {
    const eventsRes = events.filter((event: EventType) => event.id === id);
    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  if (userId && !from && !to) {
    const eventsRes = events.filter((event: EventType) => {
      return event.userId === userId;
    });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  if (from && to && userId) {
    const eventsRes = events.filter((event: EventType) => {
      return (
        // check if event is between from and to
        ((event.start >= parseInt(from) && event.end <= parseInt(to)) ||
          // check if event starts before from and ends after from
          (event.start <= parseInt(from) && event.end >= parseInt(from)) ||
          // check if event starts before to and ends after to
          (event.start <= parseInt(to) && event.end >= parseInt(to))) &&
        event.userId === userId
      );
    });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  if (from && to) {
    const eventsRes = events.filter((event: EventType) => {
      // check if event is between from and to
      return (
        // check if event is between from and to
        (event.start >= parseInt(from) && event.end <= parseInt(to)) ||
        // check if event starts before from and ends after from
        (event.start <= parseInt(from) && event.end >= parseInt(from)) ||
        // check if event starts before to and ends after to
        (event.start <= parseInt(to) && event.end >= parseInt(to))
      );
    });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  return Response.json({
    status: 200,
    data: events,
  });
}

export async function POST(request: Request) {
  const { title, description, allDay, start, end, userId } =
    await request.json();

  const newEvent = {
    id: uuidv4(),
    title,
    description,
    allDay,
    start,
    end,
    userId,
  };
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "lib",
      "data",
      "events.json"
    );
    const eventsData = readFileSync(filePath, "utf8");
    const events = JSON.parse(eventsData);

    events.push(newEvent);

    await writeFileSync(filePath, JSON.stringify(events, null, 2));

    return Response.json({
      status: 200,
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      data: error,
    });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { title, description, allDay, start, end, userId } =
    await request.json();

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "lib",
      "data",
      "events.json"
    );
    const eventsData = readFileSync(filePath, "utf8");
    const events = JSON.parse(eventsData);

    const event = events.find((event: EventType) => event.id === id);

    if (!event) {
      return Response.json({
        status: 404,
        data: "Event not found",
      });
    }

    // update the event
    event.title = title || event.title;
    event.description = description || event.description;
    event.allDay = allDay || event.allDay;
    event.start = start || event.start;
    event.end = end || event.end;
    event.userId = userId || event.userId;

    // save the updated event
    const updatedEvents = events.map((event: EventType) => {
      if (event.id === id) {
        return event;
      }

      return event;
    });

    await writeFileSync(
      filePath,
      JSON.stringify(updatedEvents, null, 2)
    );

    return Response.json({
      status: 201,
      data: event,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      data: error,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const FILE_DIRECTORY_PATH =
      process.env.FILE_DIRECTORY_PATH || "./src/lib/data";
    const eventsData = readFileSync(
      `${FILE_DIRECTORY_PATH}/events.json`,
      "utf8"
    );
    const events = JSON.parse(eventsData);

    const filteredEvents = events.filter((event: EventType) => event.id !== id);

    await writeFileSync(
      `${FILE_DIRECTORY_PATH}/events.json`,
      JSON.stringify(filteredEvents, null, 2)
    );

    return Response.json({
      status: 200,
      data: "Event deleted",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      data: error,
    });
  }
}
