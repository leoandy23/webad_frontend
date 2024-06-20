"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProjectById, deleteProject } from "@/services/projectService";
import { getTasksByProjectId, deleteTask } from "@/services/taskService";
import { Project } from "@/models/project";
import { Task } from "@/models/task";
import { logout } from "@/services/authService";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import BackButton from "@/components/backButton";
import TaskCard from "@/components/taskCard";

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = useParams(); // Usamos useParams para obtener el id de la ruta

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      if (id) {
        try {
          const token = localStorage.getItem("access_token");
          if (!token) {
            router.push("/auth/login");
            return;
          }
          const projectData = await getProjectById(Number(id), token);
          setProject(projectData);
          const tasksData = await getTasksByProjectId(Number(id), token);
          setTasks(tasksData);
        } catch (error) {
          setError("No se pudo cargar el proyecto o las tareas");
        }
      }
    };

    fetchProjectAndTasks();
  }, [id, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleDeleteProject = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token && id) {
        await deleteProject(Number(id), token);
        router.push("/dashboard/projects");
      }
    } catch (error) {
      setError("No se pudo eliminar el proyecto");
    } finally {
      setShowProjectModal(false);
    }
  };

  const handleEditProject = () => {
    router.push(`/dashboard/projects/edit/${project?.id}`);
  };

  const handleCreateTask = () => {
    router.push(`/dashboard/tasks/create/${project?.id}`);
  };

  const handleEditTask = (taskId: number) => {
    router.push(`/dashboard/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await deleteTask(taskId, token);
        const tasksData = await getTasksByProjectId(Number(id), token);
        setTasks(tasksData);
      }
    } catch (error) {
      setError("No se pudo eliminar la tarea");
    } finally {
      setShowTaskModal(false);
      setTaskToDelete(null);
    }
  };

  const openDeleteTaskModal = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowTaskModal(true);
  };

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <p>No hay tareas para mostrar</p>;
    }

    return (
      <div className="my-3 row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <TaskCard
              task={task}
              goEditTask={(id: number) => handleEditTask(id)}
              deleteTask={(id: number) => openDeleteTaskModal(id)}
            />
          </div>
        ))}
      </div>
    );
  };

  if (!project) {
    return (
      <main>
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <div className="container mt-5">
              <h1>Cargando proyecto...</h1>
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
            <h1>Detalles del Proyecto</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{project.name}</h5>
                  <div>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={handleEditProject}>
                      <i className="bi bi-pencil me-2"></i>Editar{" "}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowProjectModal(true)}>
                      <i className="bi bi-trash me-2"></i> Eliminar Proyecto
                    </button>
                  </div>
                </div>
                <p className="card-text">{project.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Creado el {new Date(project.created_at).toLocaleString()}
                  </small>
                </p>
              </div>
            </div>
            {/* Mostrar Tareas */}
            <div className="my-3">
              <div className="d-flex justify-content-between align-items-center">
                <h3>Tareas</h3>
                <button
                  className="btn btn-sm btn-info "
                  onClick={handleCreateTask}>
                  <i className="bi bi-file-earmark-plus-fill fs-5 me-2"></i>
                  Crear Tarea
                </button>
              </div>

              {renderTasks()}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación para Eliminar Proyecto */}
      {showProjectModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProjectModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowProjectModal(false)}>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteProject}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar Tarea */}
      {showTaskModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTaskModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTaskModal(false)}>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(taskToDelete!)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectDetail;
