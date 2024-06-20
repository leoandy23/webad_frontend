import axios from "axios";
import { Project } from "@/models/project";

const API_URL = "http://localhost:3001"; // Asegúrate de que esta sea la URL correcta de tu API

export const getRecentProjects = async (
  userId: number,
  token: string
): Promise<Project[]> => {
  const response = await axios.get(`${API_URL}/projects/recent/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProjectsByUser = async (
  userId: number,
  token: string
): Promise<Project[]> => {
  const response = await axios.get(`${API_URL}/projects/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createProject = async (
  project: Partial<Project>,
  token: string,
  userId: number
): Promise<Project> => {
  const response = await axios.post(
    `${API_URL}/projects`,
    { ...project, created_by: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getProjectById = async (
  id: number,
  token: string
): Promise<Project> => {
  const response = await axios.get(`${API_URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProject = async (
  id: number,
  token: string
): Promise<void> => {
  await axios.delete(`${API_URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = async (
  id: number,
  project: Partial<Project>,
  token: string
): Promise<Project> => {
  const response = await axios.patch(`${API_URL}/projects/${id}`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
