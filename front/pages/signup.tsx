import TopLayout from "../components/TopLayout";
import BottomLayout from "../components/BottomLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useInput from "../hooks/useInput";
import React, { useCallback, useState } from "react";
import { RiKakaoTalkLine } from "react-icons/ri";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { backUrl } from "../config/config";
import { getMyInfoAPI, signUpApi } from "../API/users";
import { GetServerSidePropsContext } from "next";
import { useMutation } from "react-query";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    textAlign: "center",
    marginTop: "30px",
  },
  wrapper: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  inputWrapper: {
    marginTop: "17px",
    marginBottom: "15px",
  },
  inputField: {
    width: "200px",
  },
  warningMessage: {
    color: "red",
  },
  snackbar: {
    marginBottom: "70px",
  },
  snackbar2: {
    marginTop: "350px",
  },
}));

const signup = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  const mutation = useMutation("signUp", signUpApi, {
    onError: (error: any) => {
      setErrorMessage(error.data);
      setIsError(true);
    },
    onSuccess: (response) => {
      if (response.status === 403) signUpFailure(response.data);
      else signUpSuccess();
    },
  });

  const signUpSuccess = useCallback(() => {
    alert("성공");
    router.push("/");
  }, []);

  const signUpFailure = useCallback((res: string) => {
    alert(res);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      const signUpData = {
        email: email,
        password: password,
        nickname: nickname,
      };
      mutation.mutate(signUpData);
    },
    [email, nickname, password, passwordCheck]
  );

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };

  return (
    <>
      <TopLayout></TopLayout>

      <div className={classes.mainWrapper}>
        <form onSubmit={onSubmitForm}>
          <div className={classes.inputWrapper}>
            <TextField label="Email" value={email} required onChange={onChangeEmail} className={classes.inputField}></TextField>
          </div>
          <div className={classes.inputWrapper}>
            <TextField label="Nickname" value={nickname} required onChange={onChangeNickname} className={classes.inputField}></TextField>
          </div>
          <div className={classes.inputWrapper}>
            <TextField label="Password" type="password" value={password} required onChange={onChangePassword} className={classes.inputField}></TextField>
          </div>
          <div className={classes.inputWrapper}>
            <TextField
              label="PasswordCheck"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
              className={classes.inputField}
            ></TextField>
          </div>
          {passwordError && <div className={classes.warningMessage}>비밀번호가 일치하지 않습니다.</div>}
          <div className={classes.inputWrapper}>
            <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.inputField}>
              SignUp
            </Button>
          </div>
        </form>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/kakao`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<RiKakaoTalkLine />}
          >
            카카오톡 회원가입
          </Button>
        </div>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/facebook`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<AiOutlineFacebook />}
          >
            페이스북 회원가입
          </Button>
        </div>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/google`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<AiOutlineGoogle />}
          >
            구글 회원가입
          </Button>
        </div>
      </div>
      <Snackbar open={isError} autoHideDuration={2000} className={classes.snackbar} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <BottomLayout value=""></BottomLayout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const response = await getMyInfoAPI();
  if (response?.data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default signup;