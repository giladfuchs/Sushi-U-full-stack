import React from "react";
import classes from "./Sushi.css";

const INGREDIENT_COLOR = {
  salmon: "#f87867",
  cheese: "#c8d37a",
  cucumber: "#c9c9ae",
  tuna: "#FC9F7E",
};

const sushi = (props) => {
  return (
    <div className={classes.sushi}>
      <div className={classes.content}>
        <div className={classes.sushi_container}>
          <div className={classes.seaweed}>
            <div className={classes.rice}>
              <div className={classes.rice_grain_1}></div>
              <div className={classes.rice_grain_2}></div>
              <div className={classes.rice_grain_3}></div>
              <div
                className={classes.fish}
                style={{ backgroundColor: INGREDIENT_COLOR[props.sushi.fish] }}
              >
                <div className={classes.part_1}></div>
                <div className={classes.part_2}></div>
              </div>
              <div>
                <div
                  className={classes.part_3}
                  style={{
                    backgroundColor: INGREDIENT_COLOR[props.sushi.veggie[0]],
                  }}
                ></div>
                <div
                  className={classes.part_4}
                  style={{
                    backgroundColor: INGREDIENT_COLOR[props.sushi.veggie[1]],
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sushi;
