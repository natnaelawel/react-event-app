import { readFileSync } from "fs";

type UserType = {
  id: string;
  name: string;
  email: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const usersData = await readFileSync("./src/lib/data/users.json", "utf8");
  const users = JSON.parse(usersData);

  if (id) {
    const res = users.filter((user: UserType) => user.id === id);
    return Response.json({
      status: 200,
      data: res,
    });
  }

  return Response.json({
    status: 200,
    data: users,
  });
}
