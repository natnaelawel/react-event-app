import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/model/Event";

type EventType = {
  id: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: number;
  end: number;
  userId: string;
  color?: string;
};

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await dbConnect();

  const eventsRes = await Event.find((event: EventType) => event.id === id);
  return Response.json({
    status: 200,
    data: eventsRes,
  });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await dbConnect();

  const { title, description, allDay, start, end, userId, color } =
    await request.json();

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        allDay,
        start,
        end,
        userId,
        color,
      },
      { new: true }
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

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const event = await Event.findByIdAndDelete(id);

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
