"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/services/projectService";
import { User } from "@/models/user";
import { logout } from "@/services/authService";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const CreateProject = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("User not authenticated");
      router.push("/auth/login");
      return;
    }

    try {
      const project = { name, description };
      await createProject(project, token, user.id);
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project");
    }
  };

  const userName = `${user.first_name} ${user.last_name}`;
  const userEmail = user.email;

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h1>Crear Proyecto</h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nombre del Proyecto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                  <button type="submit" className="btn btn-primary mt-3">
                    Crear Proyecto
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

export default CreateProject;
