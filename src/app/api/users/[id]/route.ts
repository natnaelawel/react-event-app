import { readFileSync } from "fs";
import path from "path";

type UserType = {
  id: string;
  name: string;
  email: string;
};

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const filePath = path.join(process.cwd(), "src", "lib", "data", "users.json");

  const usersData = await readFileSync(filePath, "utf8");
  const users = JSON.parse(usersData);

  const user = users.find((user: UserType) => user.id === id);
  if (user) {
    return Response.json({
      status: 200,
      data: user,
    });
  } else {
    return Response.json({
      status: 404,
      data: "User not found",
    });
  }
}
