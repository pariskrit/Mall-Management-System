import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import useFirestore from "../../firebase/useFirestore";

function Login() {
  const { docs } = useFirestore("User");
  const [formInput, setFormInput] = useState({ username: "", password: "" });
  const [userCredentials, setUserCredentials] = useState({});
  const history = useHistory();

  useEffect(() => {
    setUserCredentials(docs);
  }, [docs]);

  const handleSubmit = (e) => {
    const { username, password } = formInput;
    e.preventDefault();

    if (
      username === userCredentials[0].username &&
      password === userCredentials[0].password
    ) {
      localStorage.setItem("user", username);
      history.push("/admin/user");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <form className="form">
        <h1 className="addform__heading">Login</h1>
        <TextField
          value={formInput.username}
          label="Username"
          fullWidth
          onChange={(e) =>
            setFormInput({ ...formInput, username: e.target.value })
          }
        />
        <br />
        <br />
        <TextField
          value={formInput.password}
          type="password"
          label="Password"
          fullWidth
          onChange={(e) =>
            setFormInput({ ...formInput, password: e.target.value })
          }
        />
        <Button
          color="primary"
          variant="outlined"
          style={{ margin: "40px 0" }}
          onClick={handleSubmit}
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
