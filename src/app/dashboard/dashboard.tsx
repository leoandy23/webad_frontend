"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/services/authService";
import { getRecentProjects } from "@/services/projectService";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ProjectCard from "@/components/projectCard";
import { User } from "@/models/user";
import { Project } from "@/models/project";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    created_at: "",
    updated_at: "",
  });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      const fetchProjects = async () => {
        const recentProjects = await getRecentProjects(parsedUser.id, token);
        setProjects(recentProjects);
      };

      fetchProjects();
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar></Sidebar>
        <div id="layoutSidenav_content">
          <div className="m-3">
            <h1>Proyectos Recientes</h1>
            <div className="row">
              {projects.map((project) => (
                <div className="col-md-4 mb-4" key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
