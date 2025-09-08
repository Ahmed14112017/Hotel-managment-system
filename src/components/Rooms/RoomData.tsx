import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  InputBase,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import type { Addroom, UpdateRoom } from "../../interfaces";
import {
  useAddNewRoomMutation,
  useUpdateSelectRoomMutation,
} from "../../slices/Roomslice";
import { useGetAllFacilityQuery } from "../../slices/FacilitySlice";
// import { useState } from "react";
// import { UpdateRoom } from "../../interfaces";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "1px solid gray",
  borderRadius: "10px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      "&:focus": {
        width: "80%",
      },
    },
  },
}));
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function RoomData() {
  const initialState = {
    _id: "",
    roomNumber: "",
    price: "",
    capacity: "",
    discount: "",
    facilities: [],
    imgs: [],
  };
  const location = useLocation();
  const Editmodel = location.state?.type === "edit";
  const roomId = location?.state?.data._id;
  const navigate = useNavigate();
  const [newImages, setNewImages] = useState<File[]>([]); // Track NEW images separately
  const [Updateitem, { isLoading: loadingUpdate }] =
    useUpdateSelectRoomMutation();
  const [CreateRoom, { isLoading: LoadingAdd }] = useAddNewRoomMutation();
  const [Formdata, setFormdata] = useState<UpdateRoom | Addroom>(
    Editmodel ? { ...location.state.data } : { ...initialState }
  );
  const { data } = useGetAllFacilityQuery();
  const [Selectfac, SetSelectfac] = useState<string[]>([]);

  const appendformdata = (data: Addroom) => {
    const formdata = new FormData();

    formdata.append("roomNumber", data.roomNumber ?? "");
    formdata.append("price", data.price ?? "");
    formdata.append("capacity", data.capacity ?? "");
    formdata.append("discount", data.discount ?? "");
    if (data.facilities) {
      data.facilities.forEach((f) => {
        formdata.append("facilities[]", f._id ?? "");
      });
    }
    if (newImages.length > 0) {
      newImages.forEach((file) => {
        formdata.append("imgs", file);
      });
    }
    // if (data.images) {
    //   data.images.forEach((image) => {
    //     formdata.append("imgs", image);
    //   });
    // }
    return formdata;
  };
  // const AppendAddFormData = (data: Addroom) => {
  //   const Addformdata = new FormData();
  //   Addformdata.append("roomNumber", data.roomNumber ?? ""),
  //     Addformdata.append("capacity", data.capacity ?? ""),
  //     Addformdata.append("price", data.price ?? ""),
  //     Addformdata.append("discount", data.discount ?? ""),
  //     data.facilities?.forEach((f) => {
  //       Addformdata.append("facilities", f._id);
  //     });

  //   if (newImages.length > 0) {
  //     newImages.forEach((file) => {
  //       Addformdata.append("imgs", file);
  //     });
  //   }
  //   return Addformdata;
  // };

  const handelchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelImagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? Array.from(e.target.files) : [];
    setNewImages(file);
    setFormdata((prev) => {
      return {
        ...prev,
        imgs: newImages,
      };
    });
  };
  const onchangefacility = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;

    SetSelectfac(typeof value === "string" ? value.split(",") : value);
    console.log(Selectfac);
    setFormdata((prev) => {
      return {
        ...prev,
        facilities: Selectfac.map((id) => {
          const fullselect = data?.data?.facilities.find((e) => e._id === id);
          return fullselect!;
        }),
      };
    });
  };

  const handelsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (location.state?.type === "edit") {
        const Updateselectroom = appendformdata(Formdata);
        await Updateitem({
          id: roomId,
          updateProduct: Updateselectroom,
        }).unwrap();
        toast.success("Room updated successfully!");
      } else {
        const CreateNewRoom = appendformdata(Formdata);
        await CreateRoom({ Addroom: CreateNewRoom }).unwrap();
        toast.success("Room created successfully!");
      }
      navigate("/admin/rooms");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    if (Editmodel && location.state.data) {
      setFormdata({ ...location.state.data });
    } else {
      setFormdata({ ...initialState });
    }
  }, [location.state]);
  return (
    <Container>
      <Stack>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box
          display={"flex"}
          flexDirection={"column"}
          component={"form"}
          paddingBlock={"20px"}
          onSubmit={handelsubmit}
        >
          <label>roomNumber</label>
          <TextField
            type="text"
            sx={{ marginBlock: "10px" }}
            name="roomNumber"
            value={Formdata.roomNumber}
            onChange={handelchange}
          />
          <Box
            width={"full"}
            display={"flex"}
            flexDirection={"row"}
            gap={"10px"}
            sx={{ marginBlock: "10px" }}
          >
            <Box>
              <label>price</label>
              <TextField
                fullWidth
                type="number"
                name="price"
                value={Formdata.price}
                onChange={handelchange}
              />
            </Box>
            <Box>
              <label>capacity</label>
              <TextField
                fullWidth
                type="text"
                name="capacity"
                value={Formdata.capacity}
                onChange={handelchange}
              />
            </Box>
          </Box>
          <label>discount</label>
          <TextField
            fullWidth
            type="text"
            name="discount"
            value={Formdata.discount}
            onChange={handelchange}
          />
          <Select
            sx={{ marginBlock: "10px" }}
            value={Selectfac}
            onChange={onchangefacility}
            multiple
            renderValue={(selected) => (
              <Box sx={{ margin: "4px" }}>
                {selected.map((id) => {
                  const allselect = data?.data?.facilities?.find(
                    (f) => f._id === id
                  );
                  return (
                    <Chip
                      key={id}
                      label={allselect ? allselect.name : id}
                      onDelete={() =>
                        SetSelectfac((prev) => prev.filter((e) => e !== id))
                      }
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  );
                })}
              </Box>
            )}
          >
            {data?.data?.facilities?.map((v) => (
              <MenuItem key={v._id} value={v._id}>
                {v.name}
              </MenuItem>
            ))}
          </Select>

          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ height: "50px", marginBlock: "20px" }}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handelImagechange}
              multiple
              name="profileImage"
            />
          </Button>
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              onClick={() => {
                {
                  location?.state?.type === "edit"
                    ? setFormdata({ ...location?.state?.data })
                    : setFormdata({ ...initialState });
                }
              }}
            >
              cancel
            </Button>
            <Button
              variant="outlined"
              sx={{ marginRight: "10px" }}
              loading={
                location?.state?.type === "edit" ? loadingUpdate : LoadingAdd
              }
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
