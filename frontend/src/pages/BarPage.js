// this is the bar detail page
// here we can view the reviews for a specific bar
// we can also add a review for a specific bar

import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Review from "../components/Review";
import AddReview from "../components/AddReview";

import Grid from "@material-ui/core/Grid";

import * as db from "../database";

const BarPage = (props) => {
  const [allReviews, setAllReviews] = useState([]);
  const [bar, setBar] = useState(null);
  const barId = useParams().barId;

  const getBar = async () => {
    const bar = await db.getBar(barId);
    setBar(bar);
    const allReviews = await db.getAllReviewsForBar(bar.name);
    setAllReviews(allReviews);
  };

  useEffect(() => {
    getBar();
  }, []);

  return (
    <div>
      <div>
        <Header title="Bar Detail" />
        <div style={{ padding: "100px 150px" }}>
          <Grid container direction="column" alignItems="stretch">
            <h4>Bar Info</h4>
            <Grid item xs={12} style={{ marginLeft: "50px" }}>
              <p> <b>Bar name:</b> {bar ? bar.name : null}</p>
              <p> <b>Address:</b> {bar ? bar.address : null}</p>
            </Grid>
            <Grid item xs={12}>
              <h4>Reviews</h4>
              {allReviews
                ? allReviews.map((review) => {
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
              <h4>Submit a New Review</h4>
              <AddReview user={props.user} bar={bar} />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BarPage;
