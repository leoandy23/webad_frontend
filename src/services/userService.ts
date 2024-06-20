import axios from "axios";
import { User } from "@/models/user";

const API_URL = "http://localhost:3001";

export const getAllUsers = async (token: string): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
