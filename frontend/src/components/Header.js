import React from "react";

import { styled } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const MyGrid = styled(Grid)({
  backgroundImage: `url("https://i.postimg.cc/m26HBGJ7/pn-dark.jpg")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  minHeight: "500px",
});

const Header = (props) => {
  const title = props.title;
  return (
    <div>
      <MyGrid container alignItems="center" justifyContent="flex-start">
        <h1 style={{ color: "white", marginLeft: "100px" }}>{title}</h1>
      </MyGrid>
    </div>
  );
};

export default Header;
