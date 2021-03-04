import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/action";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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

function InfoUpdate(props) {
  const { loginSuccess, response } = useSelector((state) => state.User);
  const member = response.rData.member;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email] = useState(member.email);
  const [name, setName] = useState(member.name);
  const [contactA, setContactA] = useState(member.contactA);
  const [contactB, setContactB] = useState(member.contactB);
  const [phoneError, setPhoneError] = useState();

  if (!loginSuccess) return <Redirect to="/login" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (contactA === null || contactA === "") {
      return setPhoneError("연락처는 필수입력 사항입니다. ");
    }

    let body = {
      email,
      name,
      contactA,
      contactB,
    };
    dispatch(updateUser(body)).then((res) => {
      const rCode = res.payload.rCode;
      switch (rCode) {
        case "SUCCESS":
          alert("수정완료");
          props.history.push("/");
          break;
        case "FAIL":
          alert("ERROR");
          break;
        default:
          console.log("somthing's going wrong...");
          break;
      }
    });
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeContactA = (e) => {
    setContactA(e.target.value);
  };
  const onChangeContactB = (e) => {
    setContactB(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          개인정보수정
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                value={email}
                variant="outlined"
                fullWidth
                id="email"
                label="email"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={name}
                fullWidth
                label="name"
                id="name"
                required
                autoComplete="name"
                onChange={onChangeName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={contactA}
                fullWidth
                label="contactA"
                id="contactA"
                type="number"
                autoComplete="contactA"
                autoFocus
                onChange={onChangeContactA}
              />
              {phoneError && <div style={{ color: "red" }}>{phoneError} </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={contactB}
                fullWidth
                type="number"
                label="비상연락처"
                id="contactB"
                autoComplete="contactB"
                onChange={onChangeContactB}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            수정하기
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                비밀번호수정
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default InfoUpdate;
