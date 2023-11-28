import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/model/Event";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (userId && !from && !to) {
    const eventsRes = await Event.find({ userId });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  if (from && to && userId) {
    const eventsRes = await Event.find({
      $or: [
        {
          start: {
            $gte: parseInt(from),
          },
          end: {
            $lte: parseInt(to),
          },
        },
        {
          start: {
            $lte: parseInt(from),
          },
          end: {
            $gte: parseInt(from),
          },
        },
        {
          start: {
            $lte: parseInt(to),
          },
          end: {
            $gte: parseInt(to),
          },
        },
      ],
      userId,
    });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  if (from && to) {
    const eventsRes = await Event.find({
      $or: [
        {
          start: {
            $gte: parseInt(from),
          },
          end: {
            $lte: parseInt(to),
          },
        },
        {
          start: {
            $lte: parseInt(from),
          },
          end: {
            $gte: parseInt(from),
          },
        },
        {
          start: {
            $lte: parseInt(to),
          },
          end: {
            $gte: parseInt(to),
          },
        },
      ],
    });

    return Response.json({
      status: 200,
      data: eventsRes,
    });
  }

  const eventsRes = await Event.find({});

  return Response.json({
    status: 200,
    data: eventsRes,
  });
}

export async function POST(request: Request) {
  const { title, description, allDay, start, end, userId, color } =
    await request.json();
  await dbConnect();

  try {
    const event = new Event({
      title,
      description,
      allDay,
      start,
      end,
      userId,
      color,
    });

    const newEvent = await event.save();

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
