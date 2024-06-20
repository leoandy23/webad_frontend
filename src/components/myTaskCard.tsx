import React from "react";
import { Task } from "@/models/task";

interface MyTaskCardProps {
  task: Task;
  goEditTask: (id: number) => void;
}

const MyTaskCard: React.FC<MyTaskCardProps> = ({ task, goEditTask }) => {
  const renderBadge = (status: string) => {
    let color = "secondary";
    if (status === "pendiente") color = "warning";
    else if (status === "en progreso") color = "primary";
    else if (status === "completada") color = "success";

    return <span className={`badge bg-${color}`}>{status}</span>;
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{task.title}</h5>
          {renderBadge(task.status)}
        </div>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Creado el {new Date(task.created_at).toLocaleString()}
          </small>
        </p>
        {task.assigned_to && (
          <p className="card-text">
            <small className="text-muted">
              Asignado a: {task.assigned_to.first_name}{" "}
              {task.assigned_to.last_name}
            </small>
          </p>
        )}
        <p className="card-text">
          <small className="text-muted">Proyecto: {task.project!.name}</small>
        </p>
      </div>
    </div>
  );
};

export default MyTaskCard;
