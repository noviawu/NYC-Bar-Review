// this is a bar card component that will be used in the allbars page and the profile page
// add a button to save the bar to favorites -> would need who is the user when visiting this page

import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";

import * as db from "../database";

const MyCard = styled(Card)({
  padding: "20 0px",
  marginBottom: "100px",
  marginTop: "40px",
});

const Bar = (props) => {
  const { user, bar } = props;

  const handleSave = async () => {
    const userId = await db.getUserIdByEmail(user.multiFactor.user.email);
    await db.saveBar(userId, bar);
    alert("Bar is saved");
  };

  return (
    <div>
      <MyCard>
        <Grid container>
          <Grid item>
            <ButtonBase>
              <img
                width={400}
                height={250}
                src="https://i.postimg.cc/PxxHt0B8/pr.png"
                alt="bar"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs="12" sm container spacing={16}>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <CardHeader
                  style={{ marginTop: "80px", marginLeft: "60px" }}
                  color="black"
                  title={bar.name}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs="1" alignContent="center">
            <Button
              style={{ marginTop: "90px" }}
              size="small"
              variant="contained"
              color="primary"
            >
              <Link
                to={`/barpage/${bar.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                More
              </Link>
            </Button>
          </Grid>
          <Grid item xs="1" alignContent="center">
            <Button
              size="small"
              style={{ marginTop: "90px" }}
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </MyCard>
    </div>
  );
};

export default Bar;
