// this will be the home page after logging in (page that has all bars)

import { React, useState, useEffect } from "react";

import Bar from "../components/Bar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as db from "../database";

import Grid from "@material-ui/core/Grid";

const Home = (props) => {
  const [allBars, setAllBars] = useState([]);

  const getBars = async () => {
    const allBars = await db.getAllBars();
    setAllBars(allBars);
  };

  useEffect(() => {
    getBars();
  }, []);

  return (
    <div>
      <div>
        <Header title="Explore the Best Bars in Town" />
        <div style={{ padding: "100px 150px" }}>
          <Grid container direction="column" alignItems="stretch">
            <Grid item xs={12}>
              {allBars.map((bar) => {
                return <Bar key={bar.id} user={props.user} bar={bar} />;
              })}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
