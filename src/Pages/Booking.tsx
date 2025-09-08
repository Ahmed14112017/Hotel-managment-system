import { Box, Button, Container, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function Booking() {
  const param = useParams();

  const [loading] = useState(false);
  const jwt = localStorage.getItem("token");
  const stripe = useStripe();
  const element = useElements();
  const handelsubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!element || !stripe) return;

    const cardElement = element.getElement(CardElement);
    if (!cardElement) return;
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      console.log({ error: result.error });
      return;
    }
    console.log(result.token.id);
    if (!param.id) return;
    await paybook(param?.id, result.token.id);
  };
  console.log(param.id);
  const paybook = async (bookid: string, token: string) => {
    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/booking/${bookid}/pay`,
        { token },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log(res);
      toast.success(res.data.booking.message);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        borderRadius: "10px",
        backgroundColor: "#f1f5f9",
      }}
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          Width: "500px",
        }}
        onSubmit={handelsubmit}
      >
        <Typography variant="h6">Checkout</Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "500px",
          }}
        >
          <CardElement />
        </Box>
        {/* <Box
          sx={{
            borderRadius: "5px",

            width: "500px",
          }}
        >
          <label>User Name</label>
          <TextField type="text" fullWidth size="small" />
        </Box> */}
        {/* <Box
          sx={{
            borderRadius: "5px",

            width: "500px",
          }}
        >
          <label>Country or region</label>
          <Select fullWidth size="small">
            {countries.map((coun) => (
              <MenuItem value={coun.label}>{coun.label}</MenuItem>
            ))}
          </Select>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={!stripe || loading}
            fullWidth
            sx={{ marginBottom: "10px" }}
          >
            {loading ? "Processing..." : "Pay"}
          </Button>
          <Button
            variant="contained"
            type="button"
            disabled={!stripe || loading}
            fullWidth
            sx={{ marginBottom: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
