import { User } from "./user";

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: User;
}
