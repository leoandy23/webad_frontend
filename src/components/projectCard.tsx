import React from "react";
import Link from "next/link";
import { Project } from "@/models/project";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link
      href={`/dashboard/projects/view/${project.id}`}
      className="text-decoration-none">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <p className="card-text">{project.description}</p>
          <p className="card-text">
            <small className="text-muted">
              Creado el {new Date(project.created_at).toLocaleString()}
            </small>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
