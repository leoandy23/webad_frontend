"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createTask, assignTask } from "@/services/taskService";
import { getProjectById } from "@/services/projectService";
import { getAllUsers } from "@/services/userService";
import { Project } from "@/models/project";
import { TaskStatus } from "@/models/task";
import { User } from "@/models/user";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import BackButton from "@/components/backButton";

const CreateTask = () => {
  const router = useRouter();
  const { idproject } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [project, setProject] = useState<Project | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedUser, setAssignedUser] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAndUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/auth/login");
          return;
        }
        const projectData = await getProjectById(Number(idproject), token);
        setProject(projectData);
        const usersData = await getAllUsers(token);
        setUsers(usersData);
      } catch (error) {
        setError("No se pudo cargar el proyecto o los usuarios");
      }
    };

    fetchProjectAndUsers();
  }, [router, idproject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      const newTask = await createTask(
        { title, description, status, project_id: Number(idproject) },
        token
      );

      if (assignedUser) {
        await assignTask(newTask.id, assignedUser, token);
      }

      router.push(`/dashboard/projects/view/${idproject}`);
    } catch (error) {
      setError("No se pudo crear la tarea");
    }
  };

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="container mt-5">
            <BackButton />
            <h1>Crear Tarea</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título de la Tarea</label>
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
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                  <option value={TaskStatus.PENDING}>Pendiente</option>
                  <option value={TaskStatus.IN_PROGRESS}>En Progreso</option>
                  <option value={TaskStatus.COMPLETED}>Completada</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedUser">Asignar a</label>
                <select
                  className="form-control"
                  id="assignedUser"
                  value={assignedUser || ""}
                  onChange={(e) => setAssignedUser(Number(e.target.value))}>
                  <option value="">Seleccionar usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>
              {project && (
                <div className="form-group">
                  <label>Proyecto</label>
                  <input
                    type="text"
                    className="form-control"
                    value={project.name}
                    disabled
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary mt-3">
                Crear Tarea
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateTask;
