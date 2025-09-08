import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Addfacility, FacilityData } from "../../interfaces";
import {
  useAddFacilityMutation,
  useDeleteFacilityMutation,
  useGetAllFacilityQuery,
  useUpdateFacilityMutation,
} from "../../slices/FacilitySlice";
import { useState } from "react";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TableHead,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

export default function index() {
  const { isLoading, data, error } = useGetAllFacilityQuery();
  console.log(isLoading, data, error);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectfacitlity, setselectfacitlity] = useState<string | null>(null);
  const [facilityforedit, setfacilityforedit] = useState<FacilityData | null>(
    null
  );
  const [AddFacility, SetAddFacility] = useState<Addfacility>({
    name: "",
  });
  const [DeleteFacility, { isLoading: IsisLoadingDelete }] =
    useDeleteFacilityMutation();
  const [updateFacility, { isLoading: IsisLoadingUpdate }] =
    useUpdateFacilityMutation();
  const [createnewfacility, { isLoading: IsisLoadingAdd }] =
    useAddFacilityMutation();
  const [opendailg, Setopendailg] = useState<boolean>(false);
  const [typeDailog, settypeDailog] = useState<string>("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const facilitiesLength = data?.data?.facilities?.length ?? 0;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - facilitiesLength) : 0;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    facitlityid: string,
    facitlitydata: FacilityData
  ) => {
    setAnchorEl(event.currentTarget);
    setselectfacitlity(facitlityid);
    setfacilityforedit(facitlitydata);
  };
  console.log(selectfacitlity, facilityforedit);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelclickmodel = (type: "view" | "edit" | "Delete" | "add") => {
    Setopendailg(true);
    settypeDailog(type);
  };
  const handelclosemodel = () => {
    Setopendailg(false);
  };
  const handelchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const namefacility = e.target.value;
    setfacilityforedit({ name: namefacility });
  };
  const handeladdchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const addfacility = e.target.value;
    SetAddFacility({ name: addfacility });
  };
  console.log(AddFacility);
  const handelsubmit = () => {
    if (selectfacitlity) {
      updateFacility({
        id: selectfacitlity,
        updatedata: { name: facilityforedit?.name ?? "" },
      });
    }
  };
  const handeladdsubmit = () => {
    if (AddFacility) {
      createnewfacility(AddFacility);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => handelclickmodel("add")}>
          Add Facility
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">createdAt</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? (data?.data?.facilities ?? []).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : []
            ).map((facitlity: FacilityData) => (
              <TableRow key={facitlity._id}>
                <TableCell style={{ width: 200 }} align="left">
                  {facitlity.name}
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  {facitlity.createdAt}
                </TableCell>
                <TableCell style={{ width: 200 }} align="right">
                  <IconButton
                    onClick={(e) =>
                      handleClick(e, facitlity._id ?? "", facitlity)
                    }
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
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data?.data.facilities.length ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem onClick={handleClose} disableRipple>
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
        handleClose={handelclosemodel}
        open={opendailg}
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">
          {typeDailog === "view"
            ? "view Facility"
            : typeDailog === "edit"
            ? "edit Facility"
            : "Delete Facility"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {typeDailog === "view" ? (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Viewing details of Facility ${facilityforedit?.name}`}</Typography>
                <Box component={"form"}>
                  <label>name</label>
                  <TextField
                    type="text"
                    value={facilityforedit?.name}
                    fullWidth
                  >
                    Name
                  </TextField>
                </Box>
              </>
            ) : typeDailog === "edit" ? (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Editing details of Facility ${facilityforedit?.name}`}</Typography>
                <Box component={"form"} onSubmit={handelsubmit}>
                  <label>name</label>
                  <TextField
                    type="text"
                    value={facilityforedit?.name}
                    onChange={handelchange}
                    fullWidth
                  >
                    Name
                  </TextField>
                </Box>
              </>
            ) : typeDailog === "Delete" ? (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Are you sure to delete Facility ${facilityforedit?.name}`}</Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  component={"h5"}
                >{`Adding  new of Facility`}</Typography>
                <Box component={"form"} onSubmit={handeladdsubmit}>
                  <label>name</label>
                  <TextField
                    type="text"
                    value={AddFacility?.name}
                    onChange={handeladdchange}
                    fullWidth
                  >
                    Name
                  </TextField>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelclosemodel}>Disagree</Button>
          {typeDailog === "Delete" ? (
            <Button
              onClick={() => {
                if (selectfacitlity) {
                  DeleteFacility(selectfacitlity).unwrap();
                  Setopendailg(false);
                }
              }}
            >
              {IsisLoadingDelete ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Confirm Delete"
              )}
            </Button>
          ) : typeDailog === "edit" ? (
            <Button
              onClick={() => {
                if (selectfacitlity) {
                  updateFacility({
                    id: selectfacitlity,
                    updatedata: { name: facilityforedit?.name ?? "" },
                  }).unwrap();
                  Setopendailg(false);
                }
              }}
            >
              {IsisLoadingUpdate ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Confirm Update"
              )}
            </Button>
          ) : typeDailog === "add" ? (
            <Button
              onClick={() => {
                if (AddFacility) {
                  createnewfacility({
                    name: AddFacility.name,
                  }).unwrap();
                  Setopendailg(false);
                  SetAddFacility({ name: "" });
                }
              }}
            >
              {IsisLoadingAdd ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Add Facility"
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  Setopendailg(false);
                }}
              >
                Ok
              </Button>
            </>
          )}
        </DialogActions>
      </DialogComponent>
    </>
  );
}
