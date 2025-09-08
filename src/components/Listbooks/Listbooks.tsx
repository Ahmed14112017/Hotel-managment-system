import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  TableHead,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import ListIcon from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ListBaseBooks } from "../../Endpoint";
import type { Listbook } from "../../interfaces";
import DialogComponent from "../../ui/Dailog";
import { theme } from "../../App";
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

export default function Listbooks() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const token = localStorage.getItem("token");
  const [listbook, Setlisbook] = React.useState<Listbook[]>([]);

  console.log(listbook);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [Selectbook, SetSelectbook] = React.useState<Listbook | null>(null);
  const [bookidselect, Setbookidselect] = React.useState<string>("");
  const [anchor, setanchor] = React.useState<HTMLElement | null>();
  const [openDailog, setopenDailog] = React.useState<boolean>(false);
  const [typeDailog, settypeDailog] = React.useState<string>("");
  const [IsisLoading, SetIsisLoading] = React.useState(false);
  const [IsisLoadingDelete] = React.useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listbook.length) : 0;
  const open = Boolean(anchor);
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handelclick = (
    e: React.MouseEvent<HTMLElement>,
    bookingdata: React.SetStateAction<Listbook | null>,
    bookid: React.SetStateAction<string>
  ) => {
    SetSelectbook(bookingdata);
    Setbookidselect(bookid);
    setanchor(e.currentTarget);
  };
  const handelclosemenu = () => {
    setanchor(null);
  };
  const handelclickmodel = (type: "view" | "Delete") => {
    setopenDailog(true);
    settypeDailog(type);
  };
  const handelclosdailog = () => {
    setopenDailog(false);
  };
  const getAllListbook = async () => {
    SetIsisLoading(true);
    const res = await axios.get(ListBaseBooks, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    Setlisbook(res.data.data.booking);
    SetIsisLoading(false);
  };
  const DeleteBooking = async (id: string) => {
    const res = await axios.delete(
      `https://upskilling-egypt.com:3000/api/v0/admin/booking/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);
    getAllListbook();
  };
  React.useEffect(() => {
    getAllListbook();
  }, []);
  if (IsisLoading) {
    return <RoomSkeleton />;
  }
  return (
    <Stack>
      <Typography component={"p"} variant="h5">
        Booking Table Details
      </Typography>
      <Typography component={"p"}>You can check all details</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "160px" }} align="left">
                room
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="left">
                price
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="left">
                user
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listbook?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : listbook
            ).map((booking: Listbook) => (
              <TableRow key={booking._id}>
                <TableCell
                  sx={{ width: "160px" }}
                  align="left"
                  component="th"
                  scope="row"
                >
                  {booking?.room?.roomNumber}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {booking.totalPrice}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {booking.user.userName}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => handelclick(e, booking, booking._id)}
                  >
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
                count={listbook.length}
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
          <Menu open={open} onClose={handelclosemenu} anchorEl={anchor}>
            <MenuItem onClick={handelclosemenu} disableRipple>
              <IconButton
                onClick={() => handelclickmodel("view")}
                sx={{ color: "black", fontSize: "17px" }}
              >
                <VisibilityIcon
                  sx={{ marginRight: "10px", color: "black", fontSize: "17px" }}
                />
                view
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handelclosemenu} disableRipple>
              <IconButton
                onClick={() => handelclickmodel("Delete")}
                sx={{ color: "black", fontSize: "17px" }}
              >
                <DeleteIcon
                  sx={{ marginRight: "10px", color: "black", fontSize: "17px" }}
                />
                Delete
              </IconButton>
            </MenuItem>
          </Menu>
        </Table>
      </TableContainer>
      <DialogComponent
        handleClose={handelclosdailog}
        open={openDailog}
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">
          {typeDailog === "view" ? "view Booking" : "Delete Booking"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {typeDailog === "view" ? (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Viewing details of Booking ${Selectbook?.room.roomNumber}`}</Typography>
                <Box>
                  <label>room name</label>
                  <TextField
                    type="text"
                    value={Selectbook?.room.roomNumber}
                    fullWidth
                  >
                    Name
                  </TextField>
                  <label>status</label>
                  <TextField type="text" value={Selectbook?.status} fullWidth>
                    Name
                  </TextField>
                  <label>totalPrice</label>
                  <TextField
                    type="number"
                    value={Selectbook?.totalPrice}
                    fullWidth
                  >
                    Name
                  </TextField>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Are you sure to delete Facility ${Selectbook?.room.roomNumber}`}</Typography>
              </>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handelclosdailog}>Disagree</Button>
          {typeDailog === "Delete" ? (
            <Button
              onClick={() => {
                if (bookidselect) {
                  DeleteBooking(bookidselect);
                  setopenDailog(false);
                }
              }}
            >
              {IsisLoadingDelete ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Confirm Delete"
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  setopenDailog(false);
                }}
              >
                Confirm view
              </Button>
            </>
          )}
        </DialogActions>
      </DialogComponent>
    </Stack>
  );
}
