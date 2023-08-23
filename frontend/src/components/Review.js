// this will be the review card in the my profile page, and the bar detail page

import { React, useState, useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/styles";

import * as db from "../database";

const MyCard = styled(Card)({
  padding: "0 30px",
  marginBottom: "50px",
});

const Review = (props) => {
  const [upvotes, setUpvotes] = useState(props.review.upvotes);
  const [downvotes, setDownvotes] = useState(props.review.downvotes);
  const [deleted, setDeleted] = useState(false);

  const handleUpvote = async (review) => {
    const newUpvote = await db.upVote(review);
    setUpvotes(newUpvote);
    window.location.reload(false);
  };

  const handleDownvote = async (review) => {
    const newDownvote = await db.downVote(review);
    setDownvotes(newDownvote);
    window.location.reload(false);
  };

  const handleDelete = async (review) => {
    await db.deleteReview(review);
    setDeleted(!deleted);
    alert("review is deleted");
    window.location.reload(false);
  };

  useEffect(() => {
    console.log("refreshed page by use effect. ");
  }, [deleted]);

  return (
    <div>
      <MyCard>
        <Grid container direction="row">
          <Grid item xs="9">
            <CardHeader
              title="Review"
              subheader={`Upvotes: ${upvotes}  |  Downvotes: ${downvotes}  |  Posted by: ${
                props.review ? props.review.postedBy : null
              }`}
            />
            <CardMedia src="../../assets/pr.png" title="PR" />
            <CardContent>
              <Typography component="p">
                {props.review ? props.review.message : null}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs="1" alignContent="center">
            <IconButton
              style={{ marginTop: "50px" }}
              size="small"
              onClick={() => {
                handleUpvote(props.review);
              }}
            >
              <ThumbUpIcon />
            </IconButton>
          </Grid>
          <Grid item xs="1" alignContent="center">
            <IconButton
              style={{ marginTop: "50px" }}
              size="small"
              onClick={() => {
                handleDownvote(props.review);
              }}
            >
              <ThumbDownIcon />
            </IconButton>
          </Grid>
          <Grid item xs="1" alignContent="center">
            <IconButton
              style={{ marginTop: "50px" }}
              size="small"
              onClick={() => {
                handleDelete(props.review);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MyCard>
    </div>
  );
};

export default Review;
