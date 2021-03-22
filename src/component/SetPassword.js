import React, { useState } from "react";
import { isPassword } from "../component/Check";
import { TextField, Grid, makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(100),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SetPassword() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordValid(!isPassword(password));
  };
  const onChangePasswordChk = (e) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
            />
            {passwordValid && (
              <div style={{ color: "red" }}>
                비밀번호는 8 ~ 10자 영문, 숫자 조합이어야 합니다.{" "}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordChk"
              label="passwordChk"
              type="password"
              id="passwordChk"
              autoComplete="current-password"
              onChange={onChangePasswordChk}
            />
            {passwordError && (
              <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SetPassword;
