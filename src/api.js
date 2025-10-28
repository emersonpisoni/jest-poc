import axios from "axios";

export const users = {
  data: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }],
}

export async function getUsers() {
  return await axios.get(users)
}