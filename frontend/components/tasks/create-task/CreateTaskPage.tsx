import React, { useState } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import { addTask } from "../../../pages/api";
import { useRouter } from "next/router";
import styles from "./CreateTaskPage.module.css";

interface CreateTaskPageProps {}

export const CreateTaskPage: React.FC<CreateTaskPageProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter();

  const handleSubmitTask = async () => {
    try {
      const data = {
        title,
        description,
      };
      const token = localStorage.getItem("accessToken");
      await addTask(data, token);
      router.push("/tasks");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className={styles.FormWrapper}>
      <div className={styles.FormContainer}>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          style={{ marginTop: "10px" }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
      </div>
    </div>
  );
};
