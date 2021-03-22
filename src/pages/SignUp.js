import { React, useState } from "react";
import { isEmail, isPassword } from "../component/Check";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import Copyright from "../component/css/copyright";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinUser } from "../store/action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
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

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phone, setPhone] = useState(false);
  const [termError, setTermError] = useState(false);
  const [nameError, setNameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const { loginSuccess } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  if (loginSuccess) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    /* 검증 로직
     * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증
     * 2. 약관 동의를 확인
     */
    if (
      password !== passwordCheck ||
      password === null ||
      passwordCheck === null
    ) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    if (name === null || name === "") {
      return setNameError("이름은 필수입력 사항입니다. ");
    } else if (phone === null || phone === "") {
      return setPhoneError("연락처는 필수입력 사항입니다. ");
    }
    setEmailError(isEmail(email) ? "" : "이메일 형식이 맞지 않습니다. ");

    let body = {
      email,
      password,
      checkPassword: passwordCheck,
      contactA: phone,
      name,
    };
    dispatch(joinUser(body)).then((response) => {
      console.log(response);
      var rCode = response.payload.rCode;
      var rMessage = response.payload.rMessage;
      switch (rCode) {
        case "SUCCESS":
          alert("회원가입을 축하합니다!");
          history.push("/login");
          break;
        case "FAIL":
          alert(rMessage);
          setEmailError(rMessage);
          break;
        default:
          alert("[ERROR] 에러코드로 오류유형 잡아주기/ 아이디중복 등...");
          break;
      }
    });
  };

  // Coustom Hook 이전
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordValid(!isPassword(password));
  };
  const onChangePasswordChk = (e) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };
  const onChangeTerm = (e) => {
    //체크박스 초기화
    setTermError(false);
    setTerm(e.target.checked);
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                onChange={onChangeEmail}
                autoFocus
              />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            </Grid>
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
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="name"
                onChange={onChangeName}
              />
              {nameError && <div style={{ color: "red" }}>{nameError} </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="phone"
                type="number"
                id="phone"
                autoComplete="phone"
                onChange={onChangePhone}
              />
              {phoneError && <div style={{ color: "red" }}>{phoneError} </div>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={onChangeTerm}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
              {termError && (
                <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
