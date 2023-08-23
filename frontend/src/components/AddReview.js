// this will be the review card where you can add a review

import { React, useState, useEffect } from "react";

import * as db from "../database";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  padding: "0 30px",
  marginBottom: "50px",
  textAlign: "center",
  paddingBottom: "20px",
});

const AddReview = (props) => {
  const { user, bar } = props;

  const handleSubmit = async () => {
    const message = document.getElementById("standard-message").value;
    const review = {
      upvotes: 0,
      downvotes: 0,
      message: message,
      postedBy: user.multiFactor.user.displayName,
      bar: bar.name,
    };
    await db.createReview(review);
    alert("review is submitted");
    window.location.reload(false);
  };

  return (
    <MyCard>
      <CardContent>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-message"
            label="Enter your review"
            margin="normal"
            placeholder="Enter your review message here"
            variant="outlined"
            fullWidth
            size="large"
          />
        </form>
      </CardContent>
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </MyCard>
  );
};

export default AddReview;
