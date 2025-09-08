import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Ilogin } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { fetchuserdata, getuserselector } from "../../slices/Userslice";
// import axios, { type AxiosResponse } from "axios";
// import { UserUrlBase } from "../../Endpoint";
import type { AppDispatch } from "../../Store";
import { Loginvalidate } from "../../validation/Validation";
export default function Login() {
  // const navigate = useNavigate();
  // const [loading, Setloading] = useState(false);
  const { pending } = useSelector(getuserselector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loginformdata, Setloginformdata] = useState<Ilogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Ilogin | null>({
    email: "",
    password: "",
  });

  const handelonchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    Setloginformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Setloading(true);
    // try {
    //   const res = await axios.post<AxiosResponse>(
    //     UserUrlBase.login,
    //     loginformdata
    //   );
    //   const jtwtoken: string = res.data.data.token;
    //   const token = jtwtoken.slice(7);
    //   console.log(token);
    //   localStorage.setItem("token", token);

    //   Setloading(false);
    //   navigate("/");
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
    const validationErrors = Loginvalidate(loginformdata);

    setErrors(validationErrors);
    if (validationErrors.email || validationErrors.password) {
      return;
    }

    dispatch(fetchuserdata(loginformdata));
  };
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token]);
  return (
    <Box sx={{ overflow: "hidden", height: "100vh", width: "100%" }}>
      <Grid
        container
        sx={{ height: "100%", overflow: "hidden" }}
        maxWidth={"xl"}
      >
        {/* leftside */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography component={"h3"} sx={{ fontSize: "30px" }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span style={{ color: "#3252df" }}></span>Stay
            </Link>
            cation.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: "40px",
              marginLeft: "110px",
            }}
          >
            <Typography variant="h2" gutterBottom>
              sign in
            </Typography>
            <Typography variant="body1">
              If you don’t have an account register
            </Typography>
            <Typography
              sx={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
                paddingBlock: "20px",
              }}
            >
              {" "}
              you can{" "}
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                {" "}
                Register here !
              </Link>
            </Typography>

            <Stack
              component={"form"}
              display={"flex"}
              flexDirection={"column"}
              onSubmit={handelsubmit}
            >
              <label htmlFor="email"> email</label>
              <TextField
                type="email"
                name="email"
                value={loginformdata.email}
                onChange={handelonchange}
                placeholder="please type here"
                sx={{ width: "full", backgroundColor: "#F5F6F8" }}
                error={!!errors?.email}
                helperText={errors?.email}
              />

              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                name="password"
                value={loginformdata.password}
                onChange={handelonchange}
                error={!!errors?.password}
                id="password"
                type={showPassword ? "text" : "password"}
                sx={{
                  backgroundColor: "#F5F6F8",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors?.password ? (
                <Typography color="error">{errors.password}</Typography>
              ) : (
                ""
              )}
              <Link
                to={"/auth/forget-password"}
                style={{
                  textAlign: "end",
                  padding: "12px",
                  textDecoration: "none",
                  color: "#4d4d4d",
                }}
              >
                Forget Password ?
              </Link>
              <Button
                sx={{
                  backgroundColor: "#3252df",
                  color: "#fff",
                  marginBlock: "20px",
                  padding: "10px",
                }}
                type="submit"
                disabled={pending}
              >
                {pending ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "login"
                )}
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: {
              xs: "none",
              md: "block",
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundImage: `url("src/assets/login-img.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
