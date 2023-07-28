import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signInFoto from "../../assets/image/background/signIn.svg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/showMessage";
import { postLogin } from "../../redux/store/features/authSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { registerMessage, isLogin } = useAppSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    if (registerMessage) {
      showSuccess(registerMessage);
    }
    if (isLogin === true) {
      navigate("/project");
    }
  }, [isLogin]);

  const emailRef = useRef<HTMLInputElement>(null);

  const PasswordRef = useRef<HTMLInputElement>(null);

  const [emailCheck, setEmailCheck] = useState({
    helperText: "",
    error: false,
  });

  const [passwordCheck, setPasswordCheck] = useState({
    helperText: "",
    error: false,
  });
  const [values, setValues] = React.useState({
    amount: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRef.current) {
      if (emailRef.current.value === "") {
        setEmailCheck({ helperText: "mail bos ola bilemez", error: true });
      } else {
        setEmailCheck({ helperText: "", error: false });
      }
    }
    if (PasswordRef.current) {
      if (PasswordRef.current.value === "") {
        setPasswordCheck({
          helperText: "sifre mail bos ola bilemez",
          error: true,
        });
      } else {
        setPasswordCheck({ helperText: "", error: false });
      }
    }

    event.preventDefault();

    if (emailRef.current && PasswordRef.current) {
      if (emailRef.current.value !== "" && PasswordRef.current.value !== "") {
        const loginData = {
          email: emailRef.current.value,
          password: PasswordRef.current.value,
        };
        dispatch(postLogin(loginData));
        // console.log(loginData);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            //   'url(https://source.unsplash.com/random)'
            backgroundImage: "url(" + signInFoto + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t: any) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "auto", //cover
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                // required
                fullWidth
                id="email outlined-error-helper-text"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                error={emailCheck.error}
                inputRef={emailRef}
                helperText={emailCheck.helperText}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password outlined-error-helper-text"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  inputRef={PasswordRef}
                  error={passwordCheck.error}
                  // helpertext={passwordCheck.helperText}
                />
                {passwordCheck.helperText && (
                  <FormHelperText error id="password">
                    {passwordCheck.helperText}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
