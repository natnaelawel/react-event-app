export interface GetUserRequest {
  id: string;
}

const getUsers = async () => {
  const response = await fetch(`/api/users`);
  const { status, data } = await response.json();

  return data;
};

const getUser = async (params: GetUserRequest) => {
  const response = await fetch(`/api/users?id=${params.id}`);
  const { status, data } = await response.json();

  return data;
};

export const usersApi = {
  getUsers,
  getUser,
};
