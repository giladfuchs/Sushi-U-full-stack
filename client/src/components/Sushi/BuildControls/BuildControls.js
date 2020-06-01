import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import BuildControlFish from "./BuildControl/BuildControlFish";

const controls_fish = [
  { label: "Tuna", type: "tuna", color: "#f87867" },
  { label: "Salmon", type: "salmon", color: "salmon" },
];
const controls_veg = [
  { label: "Cheese", type: "cheese" },
  { label: "Cucumber", type: "cucumber" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <h2>price: {props.price}</h2>
      <div className={classes.Controls}>
        <div style={{ display: "block" }}>
          <h2>Choose Vegetables</h2>
          {controls_veg.map((ctrl) => (
            <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              clickAdd={() => props.clickAdd(ctrl.type)}
              clickRemove={() => props.clickRemove(ctrl.type)}
              disabled={props.disabled}
              disabledAdd={props.disabledAdd}
            />
          ))}
        </div>
        <div>
          <h2>Choose Fish</h2>
          <div
            style={{
              display: "flex",
              margin: "8px 20px",
            }}
          >
            {controls_fish.map((ctrl) => (
              <BuildControlFish
                key={ctrl.label}
                label={ctrl.label}
                color={ctrl.color}
                clickAdd={() => props.setFish(ctrl.type)}
                clickRemove={() => props.clickRemove(ctrl.type)}
                disabledFish={props.disabledFish[ctrl.type]}
                disabledAdd={props.disabledAdd}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "Add to cart" : "sign in"}
      </button>
    </div>
  );
};

export default buildControls;
