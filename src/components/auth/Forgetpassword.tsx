import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUrlBase } from "../../Endpoint";
import { toast } from "react-toastify";

export default function Forgetpassword() {
  const navigate = useNavigate();
  const [emaildata, Setemaildata] = useState({
    email: "",
  });
  const [loading, setloading] = useState(false);

  const onhandelemailchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    Setemaildata({ email: e.target.value });
  };
  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post(UserUrlBase.forgetpassword, emaildata);
      console.log(res.data);
      toast(res.data.message);
      setloading(false);
      navigate("/reset-password");
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
            Forget Password
          </Typography>
          <Typography component={"p"} lineHeight={"40px"}>
            If you already have an account register
          </Typography>
          <Typography component={"p"} sx={{ marginBottom: "10px" }}>
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
            <label>Email</label>
            <TextField
              sx={{ marginTop: "10px", backgroundColor: "#e9ebf0ff" }}
              fullWidth
              size="small"
              type="email"
              name="email"
              value={emaildata.email}
              onChange={onhandelemailchange}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ marginBlock: "63px" }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Send Email"
              )}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },

            backgroundImage: `url("src/assets/forgetpassword.png")`,
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
