import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./TasksPage.module.css";

interface TasksFiltersProps {
  getList: (filter: { search?: string; status?: string }) => void;
}
export const TasksFilters: React.FC<TasksFiltersProps> = ({ getList }) => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const handleStatusFilterChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearch(e.target.value);
  };

  const getListTasks = async () => {
    await getList({ status, search });
  };

  useEffect(() => {
    getListTasks();
  }, [status, search]);

  return (
    <div className={styles.FiltersContainer}>
      <Grid justify="space-between" container>
        <Grid item>
          <div className={styles.ControlContainer}>
            <FormControl style={{ width: "220px" }}>
              <TextField
                placeholder="Search..."
                value={search}
                onChange={handleSearchTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
        </Grid>

        <Grid item>
          <div className={styles.ControlContainer}>
            <FormControl style={{ width: "220px" }}>
              <Select
                value={status}
                onChange={handleStatusFilterChange}
                displayEmpty
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={"OPEN"}>Open</MenuItem>
                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                <MenuItem value={"DONE"}>Done</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
