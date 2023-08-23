import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import BarPage from "./pages/BarPage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import * as db from "./database";

import grey from "@material-ui/core/colors/grey";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const firebaseConfig = {
  apiKey: "AIzaSyC-ZqoS2imk7Dhzjr0JBm6o5jp8uXsH5ZE",
  authDomain: "milestone3-winning-team.firebaseapp.com",
  projectId: "milestone3-winning-team",
  storageBucket: "milestone3-winning-team.appspot.com",
  messagingSenderId: "55840998385",
  appId: "1:55840998385:web:d3fff9e2ad20b8e427fa50",
};
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: "#eeeeee",
      light: "#f5f5f5",
    },
  },
});

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        setIsSignedIn(!!user);
        if (user) {
          await db.createUser({
            name: user.multiFactor.user.displayName,
            email: user.multiFactor.user.email,
          });
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Navbar isSignedIn={isSignedIn} />
          <Header title="Join Today to Explore the Best Bars in Town!" />
          <div style={{ padding: 150 }}>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
          <Footer />
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar isSignedIn={isSignedIn} />
          <Routes>
            <Route
              path="/"
              element={<Home user={firebase.auth().currentUser} />}
            ></Route>
            <Route
              path="/profile"
              element={<ProfilePage user={firebase.auth().currentUser} />}
            ></Route>
            <Route
              path="/barpage/:barId"
              element={<BarPage user={firebase.auth().currentUser} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
