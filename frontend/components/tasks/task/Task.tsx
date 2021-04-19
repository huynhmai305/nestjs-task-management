import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./Task.module.css";
import { deleteTask, updateTaskStatus } from "../../../pages/api";
import { TaskStatus } from "../../../pages/api";

interface TaskProps {
  id?: string;
  status?: TaskStatus;
  title?: string;
  description?: string;
  getList: () => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  status,
  title,
  description,
  getList,
}) => {
  const token = localStorage.getItem("accessToken");

  const handleDeleteTask = async () => {
    await deleteTask(id, token);
    await getList();
  };

  const handleStatusChange = async (e) => {
    const data = { status: e.target.value };
    await updateTaskStatus(id, data, token);
    await getList();
  };

  return (
    <div className={styles.CardContainer}>
      <Card>
        <CardContent>
          <div className={styles.CardTitle}>{title}</div>
          {description}
        </CardContent>
        <CardActions style={{ padding: "14px" }} disableSpacing>
          <Grid justify="space-between" container>
            <Grid item>
              <FormControl style={{ width: "140px" }}>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value={"OPEN"}>Open</MenuItem>
                  <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                  <MenuItem value={"DONE"}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <IconButton onClick={handleDeleteTask}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};
