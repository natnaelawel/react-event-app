import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/User";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await dbConnect();

  const user = await User.findById(id);

  return Response.json({
    status: 200,
    data: user,
  });
}
