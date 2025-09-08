import { Box, Container, List, ListItem, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        borderTop: "1px solid  gray",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 4, md: 6 },
        py: 4,
      }}
    >
      <Box sx={{ flexGrow: 2 }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,

            display: { xs: "flex" },
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
        <Typography color="gray" width={{ xs: "100%", md: "300px" }} mt={1}>
          We kaboom your beauty holiday instantly and memorable.
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography mb={"5px"} component={"h4"}>
          For Beginners
        </Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href="/auth/register"
              >
                New Account
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                Start Booking a Room
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                Use Payments
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {" "}
        <Typography mb={"5px"}>Explore Us</Typography>
        <Box>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href="/auth/register"
              >
                Our Careers
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                Privacy
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                Terms & Conditions
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {" "}
        <Typography mb={"5px"}>Connect Us</Typography>
        <Box>
          <List sx={{ p: "0" }}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                support@staycation.id
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                021 - 2208 - 1996
              </Typography>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Typography
                sx={{ textDecoration: "none" }}
                component={"a"}
                href=""
              >
                Staycation, Kemang, Jakarta
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
}
