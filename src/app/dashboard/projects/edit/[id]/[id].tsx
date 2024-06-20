"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProjectById, updateProject } from "@/services/projectService";
import { Project } from "@/models/project";
import { logout } from "@/services/authService";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import BackButton from "@/components/backButton";

const EditProject = () => {
  const router = useRouter();
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const token = localStorage.getItem("access_token");
          if (!token) {
            router.push("/auth/login");
            return;
          }
          const projectData = await getProjectById(Number(id), token);
          setProject(projectData);
          setName(projectData.name);
          setDescription(projectData.description);
        } catch (error) {
          setError("No se pudo cargar el proyecto");
        }
      }
    };

    fetchProject();
  }, [id, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (token && id) {
        await updateProject(Number(id), { name, description }, token);
        router.push(`/dashboard/projects/view/${id}`);
      }
    } catch (error) {
      setError("No se pudo actualizar el proyecto");
    }
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
            <h1>Editar Proyecto</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleUpdateProject}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre del Proyecto
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Actualizar Proyecto
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProject;
