import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import styles from "./SignUpPage.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { signUp } from "../../pages/api";

export const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter();

  const submit = async () => {
    try {
      const data = {
        username,
        password,
      };
      const result = await signUp(data);
      if (result.data) {
        router.push("/signin");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.fullscreenWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Join us!</h1>
        <p>Start managing tasks easily.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div>
          <TextField
            className={styles.formField}
            label="Username"
            margin="dense"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <TextField
            className={styles.formField}
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case
          letter and one number OR special charracter.
        </p>
        <hr />
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
};
