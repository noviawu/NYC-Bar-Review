import * as React from "react";
import { Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const MyButton = styled(Link)({
  padding: "0 30px",
  display: "inline-block",
  textDecoration: "none",
});

export default function Navbar(props) {
  const isSignedIn = props.isSignedIn;

  if (!isSignedIn) {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NYC Bar Review
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <MyButton to="/">
              <Typography
                color="secondary"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                NYC Bar Review
              </Typography>
            </MyButton>
          </Box>
          <Box>
            <MyButton to="/">
              <Typography
                color="secondary"
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                All Bars
              </Typography>
            </MyButton>
            <MyButton to="/profile">
              <Typography
                color="secondary"
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                My Profile
              </Typography>
            </MyButton>
          </Box>
          <Box>
            <MyButton
              to="/"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              <Typography
                color="secondary"
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                LogOut
              </Typography>
            </MyButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
