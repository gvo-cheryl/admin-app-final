import React, { useState } from "react";
import { isEmail } from "../component/Check";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Link, Redirect, withRouter } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../component/css/copyright";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../store/action";
import { logout } from "../store/reducer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { loginSuccess, response } = useSelector((state) => state.User);
  //dispatch(logout());
  if (loginSuccess) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password == null || email == null) {
      return setError(true);
    }
    setEmailError(!isEmail(email));
    dispatch(loginUser({ email, password })).then((res) => {
      console.log(res);

      switch (res.payload.rCode) {
        case "SUCCESS":
          const getMember = res.payload.rData.member;
          switch (getMember.role) {
            case "USER":
              dispatch(logout());
              alert("승인대기중입니다.");
              break;
            case "ADMIN":
            case "TOP":
              props.history.push("/");
              break;
            default:
              setError(res.payload.rMessage);
              break;
          }
          break;
        default:
          setError(res.payload.rMessage);
          break;
      }
    });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value.trim());
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Til21 Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
          />
          {emailError && (
            <div style={{ color: "red" }}>이메일 형식이 맞지 않습니다. </div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangePassword}
          />
          {error && <div style={{ color: "red" }}>{error} </div>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to={{ pathname: "/signup" }} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
