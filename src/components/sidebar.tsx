"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setFullName(`${user.first_name} ${user.last_name}`);
    }
  }, []);

  const isProjectsPath = pathname.startsWith("/dashboard/projects");
  const isTasksPath = pathname.startsWith("/dashboard/tasks");
  const isChatPath = pathname.startsWith("/dashboard/chat");

  return (
    <div id="layoutSidenav_nav">
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Principal</div>
            <a
              className={`nav-link ${isProjectsPath ? "active" : "collapsed"}`}
              href="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapseDashboards"
              aria-expanded={isProjectsPath ? "true" : "false"}
              aria-controls="collapseDashboards">
              <div className="nav-link-icon">
                <i className="bi bi-bar-chart-fill fs-5"></i>
              </div>
              Proyectos
              <div className="sidenav-collapse-arrow">
                <i className="bi bi-caret-up-fill fs-5"></i>
              </div>
            </a>
            <div
              className={`collapse ${isProjectsPath ? "show" : ""}`}
              id="collapseDashboards"
              data-bs-parent="#accordionSidenav">
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavPages">
                <Link
                  href="/dashboard/projects"
                  className={`nav-link ${
                    pathname === "/dashboard/projects" ? "active" : ""
                  }`}>
                  <i className="bi bi-folder fs-5 me-2"></i> Mis proyectos
                </Link>
                <Link
                  href="/dashboard/projects/create"
                  className={`nav-link ${
                    pathname === "/dashboard/projects/create" ? "active" : ""
                  }`}>
                  <i className="bi bi-folder-plus fs-5 me-2"></i> Agregar
                  Proyecto
                </Link>
              </nav>
            </div>

            <a
              className={`nav-link ${isTasksPath ? "active" : "collapsed"}`}
              href="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTasks"
              aria-expanded={isTasksPath ? "true" : "false"}
              aria-controls="collapseTasks">
              <div className="nav-link-icon">
                <i className="bi bi-check2-square fs-5"></i>
              </div>
              Tareas
              <div className="sidenav-collapse-arrow">
                <i className="bi bi-caret-up-fill fs-5"></i>
              </div>
            </a>
            <div
              className={`collapse ${isTasksPath ? "show" : ""}`}
              id="collapseTasks"
              data-bs-parent="#accordionSidenav">
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavTasks">
                <Link
                  href="/dashboard/tasks/me"
                  className={`nav-link ${
                    pathname === "/dashboard/tasks/me" ? "active" : ""
                  }`}>
                  <i className="bi bi-list-task fs-5 me-2"></i> Ver mis tareas
                </Link>
              </nav>
            </div>

            <Link
              href="/dashboard/chat"
              className={`nav-link ${isChatPath ? "active" : ""}`}>
              <div className="nav-link-icon">
                <i className="bi bi-chat-dots fs-5"></i>
              </div>
              Chat
            </Link>
          </div>
        </div>
        {/* Sidenav Footer */}
        <div className="sidenav-footer">
          <div className="sidenav-footer-content">
            <div className="sidenav-footer-subtitle">Inicio Sesión como:</div>
            <div className="sidenav-footer-title">{fullName}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
