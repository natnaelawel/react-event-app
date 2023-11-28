import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/User";

export async function GET(request: Request) {
  await dbConnect();
  const users = await User.find({});
  return Response.json({
    status: 200,
    data: users,
  });
}
