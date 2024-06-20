import { Project } from "./project";
import { User } from "./user";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  project_id: number;
  created_at: string;
  updated_at: string;
  assigned_to?: User;
  project?: Project;
}

export enum TaskStatus {
  PENDING = "pendiente",
  IN_PROGRESS = "en progreso",
  COMPLETED = "completada",
}
