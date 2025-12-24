import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const navBtn = (path) => ({
    color: pathname === path ? "#1976d2" : "#fff",
    backgroundColor: pathname === path ? "#fff" : "transparent",
    marginLeft: 1,
    "&:hover": { backgroundColor: "#e3f2fd" }
  });

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          NGO Report System
        </Typography>
        <Box>
          <Button component={Link} to="/" sx={navBtn("/")}>Submit</Button>
          <Button component={Link} to="/upload" sx={navBtn("/upload")}>Upload</Button>
          <Button component={Link} to="/dashboard" sx={navBtn("/dashboard")}>Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
