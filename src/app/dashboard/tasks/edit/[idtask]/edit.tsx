// src/app/dashboard/tasks/edit/[idtask]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getTaskById,
  updateTask,
  updateAssignment,
} from "@/services/taskService";
import { Task, TaskStatus } from "@/models/task";
import { getAllUsers } from "@/services/userService";
import { User } from "@/models/user";
import { logout } from "@/services/authService";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import BackButton from "@/components/backButton";

const EditTask = () => {
  const router = useRouter();
  const { idtask } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [assignedTo, setAssignedTo] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskAndUsers = async () => {
      if (idtask) {
        try {
          const token = localStorage.getItem("access_token");
          if (!token) {
            router.push("/auth/login");
            return;
          }
          const taskData = await getTaskById(Number(idtask), token);
          setTask(taskData);
          setTitle(taskData.title);
          setDescription(taskData.description);
          setStatus(taskData.status);
          setAssignedTo(taskData.assigned_to?.id || null);

          const usersData = await getAllUsers(token);
          setUsers(usersData);
        } catch (error) {
          setError("No se pudo cargar la tarea o los usuarios");
        }
      }
    };

    fetchTaskAndUsers();
  }, [idtask, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const assignedUser =
          users.find((user) => user.id === assignedTo) || undefined;
        const updatedTask: Partial<Task> = {
          title,
          description,
          status,
          assigned_to: assignedUser,
        };

        await updateTask(task.id, updatedTask, token);

        if (assignedTo) {
          await updateAssignment(task.id, assignedTo, token);
        }
        router.push(`/dashboard/projects/view/${task.project_id}`);
      } catch (error) {
        setError("No se pudo actualizar la tarea");
      }
    }
  };

  if (!task) {
    return (
      <main>
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <div className="container mt-5">
              <h1>Cargando tarea...</h1>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="container mt-5">
            <BackButton></BackButton>
            <h1>Editar Tarea</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                  className="form-control"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  required>
                  <option value={TaskStatus.PENDING}>Pendiente</option>
                  <option value={TaskStatus.IN_PROGRESS}>En Progreso</option>
                  <option value={TaskStatus.COMPLETED}>Completada</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedTo">Asignar a</label>
                <select
                  className="form-control"
                  id="assignedTo"
                  value={assignedTo || ""}
                  onChange={(e) => setAssignedTo(Number(e.target.value))}>
                  <option value="">No asignado</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Actualizar Tarea
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditTask;
