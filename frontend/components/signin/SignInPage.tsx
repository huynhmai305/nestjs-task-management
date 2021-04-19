import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@material-ui/core";
import styles from "./SignInPage.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { signIn } from "../../pages/api";

export const SignInPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter();

  const goToSignUp = () => {
    router.push("/signup");
  };

  const submit = async () => {
    setErrorMessage(null);

    try {
      const data = {
        username,
        password,
      };
      const result = await signIn(data);
      if (result.data && result.data.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        router.push("/tasks");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.fullscreenWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Hello!</h1>
        <p>Fill in your username and password to sign in.</p>
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
        <hr />
        <div>
          <Button
            style={{ marginBottom: "10px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            SIGN IN
          </Button>

          <Button fullWidth onClick={goToSignUp}>
            Don't have an account? Sign up now!
          </Button>
        </div>
      </div>
    </div>
  );
};
