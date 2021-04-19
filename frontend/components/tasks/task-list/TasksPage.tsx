import React, { useEffect, useState } from "react";
import { Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import { Task } from "../task/Task";
import { TasksFilters } from "./TasksFilters";
import { GetTask } from "../../../pages/api";
import { useRouter } from "next/router";
import styles from "./TasksPage.module.css";

interface TasksPageProps {}

export const TasksPage: React.FC<TasksPageProps> = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const getList = async (filter = {}) => {
    const token = localStorage.getItem("accessToken");
    const list = await GetTask(filter, token);
    if (list && list.data) {
      setTasks(list.data);
    } else {
      console.log(list.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const handleSignOut = async () => {
    await localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  const renderTasks = () => {
    if (!tasks.length) {
      return (
        <p className={styles.EmptyTasksPlaceholder}>
          No tasks available. Create one?
        </p>
      );
    }

    return tasks.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
        getList={getList}
      />
    ));
  };

  return (
    <div className={styles.TasksWrapper}>
      <div className={styles.TasksHeader}>
        <h1 className={styles.Title}>Get things done.</h1>

        <div className={styles.CreateButtonContainer}>
          <Fab variant="extended" onClick={() => router.push("/tasks/create")}>
            <AddIcon />
            Create Task
          </Fab>

          <div className={styles.SignOutIconContainer}>
            <IconButton onClick={handleSignOut}>
              <SignOutIcon className="signOutIcon" />
            </IconButton>
          </div>
        </div>
      </div>

      <TasksFilters getList={getList} />

      <div className={styles.TasksContainer}>{renderTasks()}</div>
    </div>
  );
};
