import { readFileSync } from "fs";
import path from "path";

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "src", "lib", "data", "users.json");

  const usersData = await readFileSync(filePath, "utf8");
  const users = JSON.parse(usersData);

  return Response.json({
    status: 200,
    data: users,
  });
}
