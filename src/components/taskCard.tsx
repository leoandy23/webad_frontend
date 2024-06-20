import React from "react";
import { Task } from "@/models/task";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  goEditTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  goEditTask,
  deleteTask,
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pendiente":
        return "badge bg-warning text-dark";
      case "en progreso":
        return "badge bg-primary";
      case "completada":
        return "badge bg-success";
      default:
        return "badge bg-info text-dark";
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title m-0">{task.title}</h5>
          <span className={getStatusBadgeClass(task.status)}>
            {task.status}
          </span>
        </div>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Creado el {new Date(task.created_at).toLocaleString()}
          </small>
        </p>
        {task.assigned_to ? (
          <p className="card-text">
            <small className="text-muted">
              Asignado a: {task.assigned_to.first_name}{" "}
              {task.assigned_to.last_name}
            </small>
          </p>
        ) : (
          <p className="card-text">
            <small className="text-muted">No asignado</small>
          </p>
        )}
      </div>
      <div className="card-footer">
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => goEditTask(task.id)}>
          <i className="bi bi-pencil-square fs-5"></i>
        </button>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteTask(task.id)}>
          <i className="bi bi-trash fs-5"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
