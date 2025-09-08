import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TableHead,
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
import axios from "axios";
import { UserBase } from "../../Endpoint";
import type { Users } from "../../interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DialogComponent from "../../ui/Dailog";
import { theme } from "../../App";

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

export default function ListUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [Allusers, SetAllusers] = React.useState<Users[]>([]);
  const [Selectuserdata, SetSelectuserdata] = React.useState<Users | null>(
    null
  );
  const [selectuserid, Setselectuserid] = React.useState<string | null>(null);
  const [dailog, Setdailog] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  console.log(selectuserid);
  const token = localStorage.getItem("token");
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Allusers.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    console.log(event);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handelclick = (Selectuser: Users, userid: string) => {
    SetSelectuserdata(Selectuser);
    Setselectuserid(userid);
    Setdailog(true);
  };
  // const handelclosemenu = () => {
  //   SetAnchor(null);
  // };
  // const handelclickmodel = () => {
  //   Setdailog(true);
  // };
  const handelclosdailog = () => {
    Setdailog(false);
  };
  // const openDailog=()=>{
  //   Setdailog(true)
  // }
  const getAllListUsers = async () => {
    const res = await axios.get(UserBase, {
      headers: { Authorization: `Bearer ${token}` },
    });

    SetAllusers(res.data.data.users);
  };
  React.useEffect(() => {
    getAllListUsers();
  }, []);
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
                userName
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="left">
                profileImage
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="left">
                country
              </TableCell>

              <TableCell sx={{ width: "160px" }} align="left">
                email
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="left">
                role
              </TableCell>
              <TableCell sx={{ width: "160px" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? Allusers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : Allusers
            ).map((users) => (
              <TableRow key={users._id}>
                <TableCell component="th" sx={{ width: "160px" }} align="left">
                  {users.userName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {users.profileImage ? (
                    <img
                      src={users.profileImage}
                      alt="profileimage"
                      style={{ width: "60px" }}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {users.country}
                </TableCell>

                <TableCell style={{ width: 160 }} align="left">
                  {users.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {users.role}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <IconButton
                    onClick={() => handelclick(users, users._id)}
                    sx={{ fontSize: "20px" }}
                  >
                    <VisibilityIcon
                      sx={{ fontSize: "20px", marginRight: "5px" }}
                    />
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
                count={Allusers.length}
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
          {/* <Menu open={open} onClose={handelclosemenu} anchorEl={Anchor}>
            <MenuItem onClick={handelclosemenu} disableRipple>
              <IconButton
                onClick={handelclickmodel}
                sx={{ color: "black", fontSize: "17px" }}
              >
                view
              </IconButton>
            </MenuItem>
          </Menu> */}
        </Table>
      </TableContainer>
      <DialogComponent
        handleClose={handelclosdailog}
        open={dailog}
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">view details of user</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h5"
              component={"h5"}
            >{`Viewing details of user ${Selectuserdata?.userName}`}</Typography>
            <Box width={"100%"}>
              <Typography fontSize={"20px"}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  username:
                </span>
                {Selectuserdata?.userName}
              </Typography>
              <Typography fontSize={"20px"}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Email:
                </span>
                {Selectuserdata?.email}
              </Typography>
              <Typography fontSize={"20px"}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Phone Number:
                </span>
                {Selectuserdata?.phoneNumber}
              </Typography>
              <Typography fontSize={"20px"}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Country:
                </span>
                {Selectuserdata?.country}
              </Typography>
              <Typography fontSize={"20px"}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  role:
                </span>
                {Selectuserdata?.role}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handelclosdailog}>Disagree</Button>
          <Button
            onClick={() => {
              Setdailog(false);
            }}
          >
            Confirm view
          </Button>
        </DialogActions>
      </DialogComponent>
    </Stack>
  );
}
