import React from "react";
import classes from "./Logo.css";

import burgerLogo from "../../assets/images/shusi.jpg";

const logo = (props) => (
  <div
    className={classes.Logo}
    style={{ height: props.height, marginBottom: "12px" }}
  >
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
