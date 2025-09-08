import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import type { AxiosError } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type { IRoom } from "../interfaces";
import { addDays } from "date-fns";
import type { DateRangeState } from "../ui/Calender";
import Calender from "../ui/Calender";
import DialogComponent from "../ui/Dailog";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";

const facilityroom = [
  {
    img: "/src/assets/ic_ac 1.png",
    name: "7 unit ready",
  },
  {
    img: "/src/assets/ic_bedroom (1).png",
    name: "bedroom",
  },
  {
    img: "/src/assets/ic_diningroom 1.png",
    name: "1 dining room",
  },
  {
    img: "/src/assets/ic_kulkas.png",
    name: "2 refigrator",
  },
  {
    img: "/src/assets/ic_livingroom.png",
    name: "1 living room",
  },
  {
    img: "/src/assets/ic_tv.png",
    name: "4 television",
  },
  {
    img: "/src/assets/ic_wifi 1.png",
    name: "wifi",
  },
];
interface rateData {
  roomId?: string;
  rating: number;
  review: string;
}
interface Commentdata {
  roomId?: string;
  comment: string;
}
export interface Bookingdata {
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
}
export default function RoomDetails() {
  const { id } = useParams();
  console.log(id);
  const token = localStorage.getItem("token");
  const [searchaparam] = useSearchParams();
  const startDate = searchaparam.get("startDate");
  const endDate = searchaparam.get("endDate");
  const [Loading, Setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDailog, SetopenDailog] = useState(false);
  const [RoomDetails, SetRoomDetails] = useState<IRoom | null>(null);
  console.log(RoomDetails);
  const [value, setValue] = useState<rateData>({
    roomId: id,
    rating: 0,
    review: "",
  });
  const [messagecomment, Setmessagecomment] = useState<Commentdata>({
    roomId: id,
    comment: "",
  });
  console.log(value);
  const [range, setRange] = useState<DateRangeState[]>([
    {
      startDate: new Date(2025, 0, 1),
      endDate: addDays(new Date(2025, 0, 1), 7),
      key: "selection",
    },
  ]);
  const Opencalender = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    SetopenDailog(false);
  };
  const handleBooking = async () => {
    const bookingData: Bookingdata = {
      startDate: range[0].startDate?.toISOString() ?? "",
      endDate: range[0].endDate?.toISOString() ?? "",
      room: RoomDetails?._id ?? "",
      totalPrice: RoomDetails?.price ?? 0,
    };
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/booking",
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      const bookingId = res.data.data.booking._id;

      navigate(`/booking/${bookingId}`);
    } catch (err) {
      const error = err as AxiosError;

      console.log(error);
    }
  };
  const getRoomDetails = async () => {
    Setloading(true);
    try {
      const res = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/rooms/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        }
      );
      SetRoomDetails(res.data.data.room);
      Setloading(false);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
    Setloading(false);
  };
  const handelchangerateing = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    console.log(event);
    setValue((prev) => {
      return {
        ...prev,
        rating: newValue ?? 0, // null => 0
      };
    });
  };
  const handelchangereview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newreview = e.target.value;
    setValue((prev) => {
      return {
        ...prev,
        review: newreview,
      };
    });
  };
  const handelchangecomment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    Setmessagecomment((prev) => {
      return {
        ...prev,
        comment: e.target.value,
      };
    });
  };
  const handelsubmitrate = async (
    e: React.FormEvent<HTMLFormElement>,
    data: rateData
  ) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-reviews",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      toast("thank you fo your rate");
      setValue({
        roomId: id,
        rating: 0,
        review: "",
      });
      getRoomDetails();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  console.log(value);
  const handelsubmitcomment = async (
    e: React.FormEvent<HTMLFormElement>,
    data: Commentdata
  ) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-comments",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);

      Setmessagecomment({
        comment: "",
        roomId: id,
      });
      toast("thank you fo your comment");
      getRoomDetails();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };
  useEffect(() => {
    getRoomDetails();
  }, [id]);
  if (Loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader
          color={"#000"}
          loading={Loading}
          size={"200px"}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Box>
    );
  }

  return (
    <Container maxWidth={"lg"}>
      <Box>
        {/* <Typography textAlign={"center"} variant="h3" component={"h3"}>
        {RoomDetails?.roomNumber}
      </Typography> */}
        <Box
          marginBlock={"20px"}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
          }}
        >
          {RoomDetails?.images.map((image) => (
            <Box width={"50%"}>
              <Typography
                variant="h3"
                component={"h3"}
                color="#152C5B"
                textAlign={"center"}
              >
                {RoomDetails?.roomNumber}
              </Typography>
              <img
                src={`${image}`}
                width={"100%"}
                style={{ borderRadius: "20px" }}
                loading="lazy"
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Box color={"gray"}>
              <Typography lineHeight={"25px"} marginBottom={"10px"}>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Typography>
              <Typography lineHeight={"25px"} marginBottom={"10px"}>
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
              </Typography>
              <Typography lineHeight={"25px"} marginBottom={"10px"}>
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              flexWrap={"wrap"}
            >
              {facilityroom.map((fac) => (
                <Box width={"150px"}>
                  <Box margin={"10px"}>
                    <img src={`${fac.img}`} />
                  </Box>
                  <Box>
                    {" "}
                    <Typography>{fac.name}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h5" component={"h5"} marginBlock={"10px"}>
              Start Booking
            </Typography>
            <Typography
              variant="h3"
              component={"h3"}
              marginBlock={"10px"}
              color="gray"
            >
              <span style={{ color: "#1ABC9C" }}>{RoomDetails?.price}</span> per
              night
            </Typography>
            <Typography
              variant="h5"
              component={"h5"}
              marginBlock={"10px"}
              color="#FF1612"
            >
              Discount {RoomDetails?.discount} off
            </Typography>
            <Box>
              <Button onClick={Opencalender}>Pick a Date</Button>

              <Calender
                handleSubmit={handleBooking}
                range={range}
                setRange={setRange}
                open={open}
                Opencalender={Opencalender}
                closecalender={Opencalender}
                children="Continue Book "
              />

              <Typography
                component={"h5"}
                variant="h5"
                textAlign={"center"}
                marginBlock={"10px"}
                color={"#152C5B"}
              >{`YOU Will pay${RoomDetails?.price} for one person`}</Typography>
            </Box>
          </Box>
        </Box>
        <DialogComponent
          handleClose={handleClose}
          open={openDailog}
          fullScreen={undefined}
        >
          <DialogTitle id="alert-dialog-title">Booking Room</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sorry you have to Login !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
          </DialogActions>
        </DialogComponent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBlock: "20px",
            gap: "20px",
          }}
        >
          <Box
            component={"form"}
            onSubmit={(e) => handelsubmitrate(e, value)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Typography component="legend">Rate</Typography>
            <Rating
              name="simple-controlled"
              value={value?.rating}
              onChange={handelchangerateing}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={"10"}
              placeholder="message"
              style={{ width: "100%" }}
              name="review"
              value={value.review}
              onChange={handelchangereview}
            />
            <Button variant="contained" type="submit">
              rate
            </Button>
          </Box>
          <Box
            sx={{
              width: "1px",
              backgroundColor: "gray",
              alignSelf: "stretch",
              display: { xs: "none", md: "block" },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              flex: 1,
              width: { xs: "100%", md: "50%" },
            }}
            component={"form"}
            onSubmit={(e) => handelsubmitcomment(e, messagecomment)}
          >
            <Typography> Add Your Comment</Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={"10"}
              placeholder="comment"
              style={{ width: "100%" }}
              name="review"
              value={messagecomment.comment}
              onChange={handelchangecomment}
            />
            <Button variant="contained" type="submit">
              send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
