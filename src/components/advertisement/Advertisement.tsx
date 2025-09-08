import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TableHead,
  TextField,
  Typography,
  useMediaQuery,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAddAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useGetAlladsQuery,
  useUpdateAdvertisementMutation,
} from "../../slices/Advertisement";
import { type AdvertismentData } from "../../interfaces";
import type {
  Advertisementdatahandel,
  Advertisementdatahandelupdata,
} from "../../interfaces";
import DialogComponent from "../../ui/Dailog";
import { theme } from "../../App";
import ListIcon from "@mui/icons-material/List";
import { useGetAllRoomsQuery } from "../../slices/Roomslice";
import { toast } from "react-toastify";
import RoomSkeleton from "../Skeleton/RoomSkeleton";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Advertisement() {
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, SetanchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { isLoading, data } = useGetAlladsQuery();
  const [DeleteAdv, { isLoading: isLoadingDeleteAdv }] =
    useDeleteAdvertisementMutation();
  const [AddAdv] = useAddAdvertisementMutation();
  const [updatadatafun] = useUpdateAdvertisementMutation();
  const { data: datarooms } = useGetAllRoomsQuery({
    page: page + 1,
    size: 8,
  });
  const [Ads, SetAds] = useState<AdvertismentData[]>([]);
  const [SelectAdv, SetSelectAdv] = useState<string | null>(null);
  const [AdvData, setAdvData] = useState<AdvertismentData | null>(null);
  const [FormAdvData, setFormAdvData] = useState<Advertisementdatahandel>({
    room: "",
    discount: 0,
    isActive: false,
  });
  const [FormAdvDataupdata, setFormAdvDataupdata] =
    useState<Advertisementdatahandelupdata>({
      discount: AdvData?.room?.discount ?? 0,
      isActive: AdvData?.isActive ?? false,
    });
  console.log(AdvData);
  console.log(FormAdvDataupdata);
  console.log(FormAdvData);
  const [TypeDailog, setTypeDailog] = useState<string>("");
  const [OpenDailog, setOpenDailog] = useState(false);
  React.useEffect(() => {
    if (data?.data.ads) {
      SetAds(data?.data.ads);
    }
  }, [data?.data.ads]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Ads.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    console.log(event) };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    SetanchorEl(null);
  };
  const handelclick = (
    e: React.MouseEvent<HTMLElement>,
    Advid: string,
    Adv: AdvertismentData
  ) => {
    SetanchorEl(e.currentTarget);
    SetSelectAdv(Advid);
    setAdvData(Adv);
  };
  const handelclickmodel = (type: "view" | "edit" | "delete" | "add") => {
    setTypeDailog(type);
    setOpenDailog(true);
  };
  const handelclosemodel = () => {
    setOpenDailog(false);
  };

  /* *************handelupdate*************** */
  const handelupdatechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormAdvDataupdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  /* *************handelselectupdate*************** */

  // const handelselectupdata = (e: SelectChangeEvent) => {
  //   setFormAdvDataupdata((prev) => {
  //     return {
  //       ...prev,
  //       isActive: e.target.value === "true",
  //     };
  //   });
  // };

  // const handelUpdatasubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (SelectAdv) {
  //     updatadatafun({ id: SelectAdv, updatadata: FormAdvDataupdata }).unwrap();
  //   }
  // };
  /* *************handeladdchange*************** */

  const handeladdchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormAdvData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  /* *************handeladdselect*************** */
  const handelchangeselect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormAdvData((prev) => {
      return {
        ...prev,
        [name]: name === "isActive" ? value === "true" : value,
      };
    });
  };
  /* *************handeladdsubmit*************** */

  // const handeladdsubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   AddAdv(FormAdvData)
  //     .unwrap()
  //     .then((res) => {
  //       toast.success(res.message);
  //       handelclosemodel();
  //     })
  //     .catch((err) => {
  //       toast.error(err.data.message);
  //     });
  // };
  useEffect(() => {
    if (AdvData) {
      setFormAdvDataupdata({
        discount: AdvData.room?.discount ?? 0,
        isActive: AdvData.isActive ?? false,
      });
    }
  }, [AdvData]);
  console.log(SelectAdv);
  if (isLoading) {
    return <RoomSkeleton />;
  }
  return (
    <>
      <Box display="flex" justifyContent="end">
        <Button
          type="button"
          variant="contained"
          onClick={() => handelclickmodel("add")}
        >
          {" "}
          Add Advertisment
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="right">isActive</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">discount</TableCell>
              <TableCell align="right">updatedAt</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? Ads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : Ads
            ).map((Adv) => (
              <TableRow key={Adv._id}>
                <TableCell style={{ width: 160 }} align="left">
                  {Adv.room.roomNumber}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {Adv.isActive ? (
                    <Typography>true</Typography>
                  ) : (
                    <Typography>false</Typography>
                  )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {Adv.room.price}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {Adv.room.discount}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {Adv.updatedAt}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <IconButton onClick={(e) => handelclick(e, Adv._id, Adv)}>
                    <ListIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={Ads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem onClick={handleClose} disableRipple>
              <IconButton
                onClick={() => handelclickmodel("view")}
                sx={{ color: "black", fontSize: "17px" }}
              >
                <VisibilityIcon
                  sx={{
                    marginRight: "10px",
                    color: "black",
                    fontSize: "17px",
                  }}
                />
                view
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <IconButton
                onClick={() => handelclickmodel("edit")}
                sx={{ color: "black", fontSize: "17px" }}
              >
                <EditIcon
                  sx={{
                    marginRight: "10px",
                    color: "black",
                    fontSize: "17px",
                  }}
                />
                Edit
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <IconButton
                onClick={() => handelclickmodel("delete")}
                sx={{ color: "black", fontSize: "17px" }}
              >
                <DeleteIcon
                  sx={{
                    marginRight: "10px",
                    color: "black",
                    fontSize: "17px",
                  }}
                />
                Delete
              </IconButton>
            </MenuItem>
          </Menu>
        </Table>

        <DialogComponent
          fullScreen={fullScreen}
          handleClose={handelclosemodel}
          open={OpenDailog}
        >
          <DialogTitle>
            {TypeDailog === "view"
              ? "view Advertisment"
              : TypeDailog === "edit"
              ? "edit Advertisment"
              : "Delete Advertisment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {TypeDailog === "view" ? (
                <>
                  <Typography
                    variant="h5"
                    component={"h5"}
                  >{`Viewing details of Advertisment ${AdvData?.room.roomNumber}`}</Typography>
                  <Box component={"form"}>
                    <label>name</label>
                    <TextField
                      type="text"
                      value={AdvData?.room.roomNumber}
                      fullWidth
                    />
                    <label>discount</label>
                    <TextField
                      type="text"
                      value={AdvData?.room.discount}
                      fullWidth
                    />

                    <label>isActive</label>
                    <TextField
                      type="text"
                      value={AdvData?.isActive}
                      fullWidth
                    />
                  </Box>
                </>
              ) : TypeDailog === "edit" ? (
                <>
                  <Typography
                    variant="h5"
                    component={"h5"}
                  >{`Editing details of Advertisment ${FormAdvData?.room}`}</Typography>
                  <Box>
                    <label>discount</label>
                    <TextField
                      type="number"
                      name="discount"
                      value={FormAdvDataupdata?.discount}
                      onChange={handelupdatechange}
                      fullWidth
                    />

                    <InputLabel id="demo-simple-select-label">
                      isActive
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="isActive"
                      value={FormAdvData.isActive ? "true" : "false"}
                      fullWidth
                      onChange={handelchangeselect}
                    >
                      <MenuItem value="true">true</MenuItem>
                      <MenuItem value="false">false</MenuItem>
                    </Select>
                    {/* <DialogActions>
                      <Button onClick={handelclosemodel}>Cancel</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Confirm Update
                      </Button>
                    </DialogActions> */}
                  </Box>
                </>
              ) : TypeDailog === "delete" ? (
                <>
                  <Typography
                    variant="h5"
                    component={"h5"}
                  >{`Are you sure to delete Advertisment ${AdvData?.room.roomNumber}`}</Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    component={"h5"}
                  >{`Adding  new of Advertisment`}</Typography>
                  <Box>
                    <InputLabel>room</InputLabel>
                    <Select
                      type="text"
                      name="room"
                      value={FormAdvData?.room}
                      onChange={handelchangeselect}
                      fullWidth
                    >
                      {datarooms?.data.rooms.map((room) => {
                        return (
                          <MenuItem value={room._id}>
                            {room.roomNumber}
                          </MenuItem>
                        );
                      })}
                    </Select>

                    <label>discount</label>
                    <TextField
                      type="text"
                      name="discount"
                      value={FormAdvData?.discount}
                      onChange={handeladdchange}
                      fullWidth
                    />

                    <InputLabel id="demo-simple-select-label">
                      isActive
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="isActive"
                      value={FormAdvData?.isActive ? "true" : "false"}
                      onChange={handelchangeselect}
                      fullWidth
                    >
                      <MenuItem value={"true"}>true</MenuItem>
                      <MenuItem value={"false"}>false</MenuItem>
                    </Select>
                  </Box>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handelclosemodel}>Disagree</Button>
            {TypeDailog === "delete" ? (
              <Button
                onClick={() => {
                  if (SelectAdv) {
                    DeleteAdv(SelectAdv).unwrap();
                    toast.success("ads is deleted successfully");

                    setOpenDailog(false);
                  }
                }}
              >
                {isLoadingDeleteAdv ? <CircularProgress /> : "Confirm Delete"}
              </Button>
            ) : TypeDailog === "edit" ? (
              <Button
                onClick={() => {
                  if (SelectAdv) {
                    updatadatafun({
                      id: SelectAdv,
                      updatadata: FormAdvDataupdata,
                    }).unwrap();
                    toast.success("ads updated successfully");
                    setOpenDailog(false);
                  }
                }}
                type="submit"
              >
                Confirm Update
              </Button>
            ) : TypeDailog === "add" ? (
              <Button
                onClick={() => {
                  AddAdv(FormAdvData)
                    .unwrap()
                    .then((res) => {
                      toast.success(res.message);
                      handelclosemodel();
                    })
                    .catch((err) => {
                      toast.error(err.data.message);
                    });
                }}
                type="submit"
              >
                Add Advertisement
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setOpenDailog(false);
                  }}
                >
                  Ok
                </Button>
              </>
            )}
          </DialogActions>
        </DialogComponent>
      </TableContainer>
    </>
  );
}
