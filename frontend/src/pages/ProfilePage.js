// this is the USER PROFILE page
// will be populated with bar cards
// will be able to save a bar to favorites

import { React, useState, useEffect } from "react";

import Bar from "../components/Bar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Review from "../components/Review";
import * as db from "../database";
import Grid from "@material-ui/core/Grid";

const ProfilePage = (props) => {
  const [savedBars, setSavedBars] = useState([]);
  const [allReviewsForUser, setAllReviewsForUser] = useState([]);

  const getSavedBars = async () => {
    const userId = await db.getUserIdByEmail(props.user.multiFactor.user.email);
    const savedBarsIdList = await db.getSavedBars(userId); // a list of bar ids
    setSavedBars(savedBarsIdList);
  };

  const getAllReviewsForUser = async () => {
    const allReviewsForUser = await db.getAllReviewsForUser(props.user);
    setAllReviewsForUser(allReviewsForUser);
  };

  useEffect(() => {
    getSavedBars();
    getAllReviewsForUser();
  }, []);

  return (
    <div>
      <div>
        <Header title="My Account" />
        <div style={{ padding: "100px 170px" }}>
          <Grid container direction="column">
            <h4>My Info</h4>
            <Grid item xs={12} style={{ marginLeft: "50px" }}>
              <p>
                {" "}
                <b>Name: </b> {props.user.displayName}{" "}
              </p>
              <p>
                {" "}
                <b>Email: </b> {props.user.email}
              </p>
              <p>
                {" "}
                <b>ID: </b> {props.user.uid}{" "}
              </p>
            </Grid>
            <Grid item xs={12}>
              <h4>My Reviews</h4>
              {allReviewsForUser
                ? allReviewsForUser.map((review) => {
                    return (
                      <Review
                        key={review.id}
                        review={review}
                        user={props.user}
                      />
                    );
                  })
                : null}
            </Grid>
            <Grid item xs={12}>
              <h4>Saved Bars</h4>
              {savedBars
                ? savedBars.map((bar) => {
                    return <Bar key={bar.id} user={props.user} bar={bar} />;
                  })
                : null}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
