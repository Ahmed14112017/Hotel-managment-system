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
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

import LastPageIcon from "@mui/icons-material/LastPage";
import { useState } from "react";
import {
  useDeleteSelectRoomMutation,
  useGetAllRoomsQuery,
} from "../../slices/Roomslice";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TableHead,
  useMediaQuery,
} from "@mui/material";
import DialogComponent from "../../ui/Dailog";
import { Link, useNavigate } from "react-router-dom";
import type { IRoom } from "../../interfaces";
import RoomSkeleton from "../Skeleton/RoomSkeleton";
export default function Rooms() {
  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [Roomnumber, setRoomnumber] = useState<string | null>(null);
  const [roomdata, Seteoomdata] = useState<IRoom | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [Opendailog, SetOpendialog] = useState(false);
  const [typedialog, Settypedialog] = useState<
    "view" | "edit" | "delete" | null
  >(null);
  console.log(anchorEl);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    roomId: string,
    roomnumber: string,
    room: IRoom
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(roomId);
    setRoomnumber(roomnumber);
    Seteoomdata(room);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpen = (type: "view" | "edit" | "delete") => {
    Settypedialog(type);
    SetOpendialog(true);
  };
  const handelclosedialog = () => {
    SetOpendialog(false);
  };
  const [deleteRoom] = useDeleteSelectRoomMutation();

  const [page, Setpage] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(6);
  const { isLoading, data, error } = useGetAllRoomsQuery({
    page: page + 1,
    size: RowsPerPage,
  });
  console.log(isLoading, data, error);
  const rooms = data?.data.rooms;

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   Setpage(0);
  // };
  if (isLoading) {
    return <RoomSkeleton />;
  }
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => navigate("/admin/rooms/AddRooms")}
        >
          Add Rooms
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>roomNumber</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">capacit</TableCell>
              <TableCell align="right">discount</TableCell>
              <TableCell align="right">userName</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms?.map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room.roomNumber}</TableCell>
                {room.images ? (
                  <TableCell align="right">
                    <img src={room.images[0]} alt="" width={"50px"} />
                  </TableCell>
                ) : (
                  ""
                )}
                <TableCell align="right">{room.price}</TableCell>
                <TableCell align="right">{room.capacity}</TableCell>
                <TableCell align="right">{room.discount}%</TableCell>
                <TableCell align="right">{room.createdBy.userName}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) =>
                      handleClick(e, room._id, room.roomNumber, room)
                    }
                  >
                    <ListIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data?.data.totalCount ?? 0}
                rowsPerPage={RowsPerPage}
                page={page}
                onPageChange={(_, newPage) => Setpage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  Setpage(0);
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <IconButton size="small" onClick={() => handleClickOpen("view")}>
              <VisibilityIcon fontSize="small" style={{ marginRight: 8 }} />
              View
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton
              size="small"
              onClick={() => {
                handleClickOpen("edit");
              }}
            >
              <Link
                to={`/admin/rooms/${selectedRoom}`}
                state={{ type: "edit", data: roomdata }}
                style={{ textDecoration: "none", color: "#6c6c6c" }}
              >
                {" "}
                <EditIcon fontSize="small" style={{ marginRight: 8 }} /> Update
              </Link>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton size="small" onClick={() => handleClickOpen("delete")}>
              <DeleteIcon fontSize="small" style={{ marginRight: 8 }} /> Delete
            </IconButton>
          </MenuItem>
        </Menu>
        <DialogComponent
          handleClose={handelclosedialog}
          open={Opendailog}
          fullScreen={fullScreen}
        >
          <DialogTitle id="alert-dialog-title">
            {typedialog === "view"
              ? "View Room"
              : typedialog === "edit"
              ? "Eidt Room"
              : "Delete Room"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {typedialog === "view"
                ? `Viewing details of room ${Roomnumber}`
                : typedialog === "edit"
                ? `Editing details of room ${Roomnumber}`
                : `Are you sure to delete room ${Roomnumber}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handelclosedialog}>Disagree</Button>
            {typedialog === "delete" && (
              <Button
                onClick={() => {
                  if (selectedRoom) {
                    deleteRoom(selectedRoom);
                    SetOpendialog(false);
                  }
                }}
              >
                Confirm Delete
              </Button>
            )}
            {/* {typedialog === "edit" && (
              <Button
                onClick={() => {
                  if (selectedRoom) {
                    EditRoom(selectedRoom);
                    SetOpendialog(false);
                  }
                }}
              >
                Confirm edit
              </Button>
            )} */}
          </DialogActions>
        </DialogComponent>
      </TableContainer>
    </>
  );
}
