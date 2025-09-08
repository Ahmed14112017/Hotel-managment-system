import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUrlBase } from "../../Endpoint";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Resetvalidate } from "../../validation/Validation";
import forgetpassword from "../../assets/forgetpassword.png";
interface Iresetpassword {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export default function RestPassword() {
  const navigate = useNavigate();
  const [resetdata, Setresetdata] = useState<Iresetpassword>({
    email: "",
    seed: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, Seterrors] = useState<Iresetpassword | null>({
    email: "",
    seed: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setloading] = useState(false);

  const onhandelchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    Setresetdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resterror = Resetvalidate(resetdata);
    Seterrors(resterror);
    if (
      errors?.password ||
      errors?.confirmPassword ||
      errors?.email ||
      errors?.seed
    ) {
      return;
    }
    setloading(true);
    try {
      const res = await axios.post(UserUrlBase.resetpassword, resetdata);
      console.log(res.data);
      toast(res.data.message);
      setloading(false);
      navigate("/auth");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast(error.message);
      setloading(false);
    }
  };

  return (
    <Container maxWidth={"xl"} sx={{ height: "100vh" }}>
      <Typography component={"h3"} fontSize={"30px"}>
        <span style={{ color: "#3252df" }}>Stay</span>cation.
      </Typography>
      <Stack
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "flex-start" },
          flexDirection: "row",
          height: "100%",
        }}
      >
        <Box
          marginLeft={"5rem"}
          marginBlock={"50px"}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 6,
            xs: { md: { width: "100%" } },
          }}
        >
          <Typography component={"h3"} fontSize={"30px"} marginBottom={"22px"}>
            Reset Password
          </Typography>
          <Typography component={"p"} lineHeight={"40px"}>
            If you already have an account register
          </Typography>
          <Typography component={"p"} sx={{ marginBottom: "10px" }}>
            You can{" "}
            <Link
              to={"/auth"}
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
            <label>Email</label>
            <TextField
              sx={{ marginTop: "10px", backgroundColor: "#e9ebf0ff" }}
              fullWidth
              size="small"
              type="email"
              name="email"
              value={resetdata.email}
              onChange={onhandelchange}
              error={!!errors?.email}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors?.email}
            </FormHelperText>
            <label>seed</label>
            <TextField
              sx={{ marginTop: "10px", backgroundColor: "#e9ebf0ff" }}
              fullWidth
              size="small"
              type="text"
              name="seed"
              value={resetdata.seed}
              onChange={onhandelchange}
              error={!!errors?.seed}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors?.seed}
            </FormHelperText>
            <label>Password</label>
            <TextField
              sx={{ marginTop: "10px", backgroundColor: "#e9ebf0ff" }}
              fullWidth
              size="small"
              type="Password"
              name="password"
              value={resetdata.password}
              onChange={onhandelchange}
              error={!!errors?.password}
            />
            <FormHelperText>{errors?.password}</FormHelperText>
            <label>confirmPassword</label>
            <TextField
              sx={{ marginTop: "10px", backgroundColor: "#e9ebf0ff" }}
              fullWidth
              size="small"
              type="password"
              name="confirmPassword"
              value={resetdata.confirmPassword}
              onChange={onhandelchange}
              error={!!errors?.confirmPassword}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors?.confirmPassword}
            </FormHelperText>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ marginBlock: "40px" }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },

            backgroundImage: `url(${forgetpassword}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "50%",
            height: "90%",
            borderRadius: "20px",
            flex: 1,
          }}
        ></Box>
      </Stack>
    </Container>
  );
}
