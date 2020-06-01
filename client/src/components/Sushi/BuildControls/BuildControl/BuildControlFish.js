import React from "react";

import classes from "./BuildControlFish.css";
const buildControlFish = props => {
  return (
    <div className={classes.BuildControl}>
      <button
        className={classes.button}
        onClick={props.clickAdd}
        disabled={props.disabledFish}
        style={{ backgroundColor: props.color }}
      >
        {props.label}
      </button>
    </div>
  );
};

export default buildControlFish;
