import { readFileSync } from "fs";

type UserType = {
  id: string;
  name: string;
  email: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const FILE_DIRECTORY_PATH =
    process.env.FILE_DIRECTORY_PATH || "./src/lib/data";

  const usersData = await readFileSync(
    `${FILE_DIRECTORY_PATH}/users.json`,
    "utf8"
  );
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
