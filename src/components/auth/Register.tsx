import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useState } from "react";
import {
  registerValidate,
  type Registervalidation,
} from "../../validation/Validation";
import type { Iregister } from "../../interfaces";
import axios, { AxiosError } from "axios";
import { UserUrlBase } from "../../Endpoint";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Register() {
  const navigate = useNavigate();
  const [registerdata, Setregisterdata] = useState<Iregister>({
    userName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    role: "",
  });

  const [errors, seterrors] = useState<Registervalidation>({
    userName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const appendtoform = (data: Iregister) => {
    const formdata = new FormData();
    formdata.append("userName", data.userName);
    formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("country", data.country);
    formdata.append("password", data.password);
    formdata.append("confirmPassword", data.confirmPassword);
    if (data.role) formdata.append("role", data.role);
    if (data.profileImage) {
      formdata.append("profileImage", data.profileImage);
    }
    return formdata;
  };
  const [loading, setloading] = useState(false);
  const handelchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    Setregisterdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    Setregisterdata((prev) => {
      return {
        ...prev,
        profileImage: file,
      };
    });
    console.log(file);
  };
  const handelselectchange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    Setregisterdata((prev) => {
      return {
        ...prev,
        role: value,
      };
    });
  };
  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const registererror = registerValidate(registerdata);
    seterrors(registererror);
    console.log(registerdata);

    try {
      const registerform = appendtoform(registerdata);
      const res = await axios.post(UserUrlBase.createuser, registerform);
      console.log(res);
      toast(res.data.message);
      setloading(false);
      navigate("/auth");
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message);
    }
    setloading(false);
  };
  return (
    <Container maxWidth={"xl"} sx={{ maxHeight: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: {
              xs: "center",
              md: "flex-start",
              overflow: { xs: "auto", md: "hidden" },
            },

            px: { xs: 2, md: 6 },
          }}
        >
          <Typography component={"h4"} fontSize={"30px"} paddingBlock={"10px"}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              {" "}
              <span style={{ color: "#3252df" }}>Stay</span>cation.
            </Link>
          </Typography>
          <Stack
            direction={"column"}
            sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
          >
            <Typography component={"h2"} fontSize={"30px"}>
              sign up
            </Typography>
            <Typography>If you already have an account register</Typography>
            <Typography>
              You can{" "}
              <Link
                to={"/login"}
                style={{
                  color: "#EB5148",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Login here !
              </Link>
            </Typography>
            <Box component={"form"} onSubmit={handelsubmit}>
              <label htmlFor="User name">User name</label>
              <TextField
                id="User name"
                fullWidth
                size="small"
                placeholder="User name"
                sx={{ backgroundColor: "#e9ebf0ff", mb: 2 }}
                type="text"
                name="userName"
                value={registerdata.userName}
                onChange={handelchange}
                error={!!errors?.userName}
              />
              {errors.userName ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.userName}
                </FormHelperText>
              ) : (
                ""
              )}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
                <Box flex={1}>
                  <label htmlFor="phoneNumber">Phone number</label>
                  <TextField
                    id="phoneNumber"
                    fullWidth
                    size="small"
                    placeholder="Phone number"
                    sx={{ backgroundColor: "#F5F6F8" }}
                    type="text"
                    name="phoneNumber"
                    value={registerdata.phoneNumber}
                    onChange={handelchange}
                    error={!!errors?.phoneNumber}
                  />
                  {errors.phoneNumber && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.phoneNumber}
                    </FormHelperText>
                  )}
                </Box>
                <Box flex={1}>
                  <label htmlFor="country">Country</label>
                  <TextField
                    id="country"
                    fullWidth
                    size="small"
                    placeholder="Country"
                    sx={{ backgroundColor: "#F5F6F8" }}
                    type="text"
                    name="country"
                    value={registerdata.country}
                    onChange={handelchange}
                    error={!!errors?.country}
                  />
                  {errors.country && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.country}
                    </FormHelperText>
                  )}
                </Box>
              </Stack>

              <Box>
                <label htmlFor="role">role</label>
                <Select
                  value={registerdata.role}
                  id="role"
                  onChange={handelselectchange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value={"admin"}>admin</MenuItem>
                  <MenuItem value={"user"}>user</MenuItem>
                </Select>
              </Box>
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                fullWidth
                size="small"
                placeholder="email"
                sx={{
                  backgroundColor: "#F5F6F8",
                }}
                type="email"
                name="email"
                value={registerdata.email}
                onChange={handelchange}
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.email}
                </FormHelperText>
              )}
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                fullWidth
                size="small"
                placeholder="password"
                sx={{
                  backgroundColor: "#F5F6F8",
                }}
                type="password"
                name="password"
                value={registerdata.password}
                onChange={handelchange}
                error={!!errors.password}
              />
              {errors.password && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.password}
                </FormHelperText>
              )}
              <label htmlFor="confirm password">confirm password</label>
              <TextField
                id="confirm password"
                fullWidth
                size="small"
                placeholder="confirm password"
                sx={{
                  backgroundColor: "#F5F6F8",
                }}
                type="password"
                name="confirmPassword"
                value={registerdata.confirmPassword}
                onChange={handelchange}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.confirmPassword}
                </FormHelperText>
              )}
              <Button
                component="label"
                // role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handelimagechange}
                  multiple
                />
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#3252df",
                  width: "100%",
                  color: "#fff",
                  paddingBlock: "5px",
                  marginBlock: "5px",
                }}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "sign up"
                )}
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: "none", md: "inline" },
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              borderRadius: "20px",
              backgroundImage: `url("/src/assets/register.png")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  );
}
