import axios from "axios";
import { Task } from "@/models/task";

const API_URL = "http://localhost:3001";

export const getTasksByProjectId = async (
  projectId: number,
  token: string
): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
  return response.data;
};

export const createTask = async (
  task: Partial<Task>,
  token: string
): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const assignTask = async (
  taskId: number,
  userId: number,
  token: string
): Promise<void> => {
  await axios.post(
    `${API_URL}/task-assignments`,
    {
      task_id: taskId,
      user_id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTaskById = async (
  taskId: number,
  token: string
): Promise<Task> => {
  const response = await axios.get(`${API_URL}/tasks/gettask/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTask = async (
  taskId: number,
  task: Partial<Task>,
  token: string
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAssignment = async (
  taskId: number,
  userId: number,
  token: string
): Promise<void> => {
  await axios.patch(
    `${API_URL}/task-assignments/${taskId}`,
    {
      user_id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTask = async (
  taskId: number,
  token: string
): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasksByUserId = async (
  userId: number,
  token: string
): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
  return response.data;
};
