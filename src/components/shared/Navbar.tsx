import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { MyToken } from "../../interfaces";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let decodedtoken: MyToken | null = null;
  if (token) {
    decodedtoken = jwtDecode<MyToken>(token);
  }
  const pages = decodedtoken
    ? ["home", "explore", "reviews", "favorite"]
    : ["home", "explore"];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <>
        {/* ...................guste navbar...........................*/}

        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            color: "#000",
            marginBottom: "20px",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#152C5B",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                cation
              </Typography>
              {/* ...................mobile menu...........................*/}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        component={Link}
                        to={`/${page}`}
                        sx={{ textAlign: "center", textDecoration: "none" }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                  {decodedtoken && (
                    <Button
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      logout
                    </Button>
                  )}
                </Menu>
                {decodedtoken === null && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px", height: "40px" }}
                      onClick={() => navigate("/auth/register")}
                    >
                      Register
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px", height: "40px" }}
                      onClick={() => navigate("/auth")}
                    >
                      Login
                    </Button>
                  </Box>
                )}
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#152C5B",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                cation
              </Typography>
              {/*........................................full screen menu .............................*/}
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "flex-end",
                  },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/${page}`);
                    }}
                    sx={{
                      my: 2,
                      color: "#152C5B",
                      display: "block",
                      fontWeight: "500",
                    }}
                  >
                    {page}
                  </Button>
                ))}
                {decodedtoken && (
                  <Button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    logout
                  </Button>
                )}
                {decodedtoken === null && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px", height: "40px" }}
                      onClick={() => navigate("/auth/register")}
                    >
                      Register
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px", height: "40px" }}
                      onClick={() => navigate("/auth")}
                    >
                      Login
                    </Button>
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    </>
  );
}
