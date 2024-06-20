"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasksByUserId } from "@/services/taskService";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MyTaskCard from "@/components/myTaskCard";

const MyTasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("access_token");
      if (userData && token) {
        const user = JSON.parse(userData);
        setUser(user);
        try {
          const tasksData = await getTasksByUserId(user.id, token);
          setTasks(tasksData);
        } catch (error) {
          setError("No se pudo cargar las tareas");
        }
      } else {
        router.push("/auth/login");
      }
    };

    fetchTasks();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    router.push("/auth/login");
  };

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="container mt-5">
            <h1>Mis Tareas</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
              {tasks.length === 0 ? (
                <p>No tienes tareas asignadas.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-4">
                    <MyTaskCard
                      task={task}
                      goEditTask={() =>
                        router.push(`/dashboard/tasks/edit/${task.id}`)
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyTasks;
