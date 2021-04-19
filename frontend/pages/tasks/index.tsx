import { TasksPage } from "../../components/tasks/task-list/TasksPage";
import React from "react";

interface tasksProps {}

const tasks: React.FC<tasksProps> = () => {
  return <TasksPage />;
};

export default tasks;
