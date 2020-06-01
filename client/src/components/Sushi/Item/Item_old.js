import React from "react";

import classes from "./Item.css";
import Button from "../../UI/Button/Button";
let auth = true;
const item = (props) => {
  const manger_button = auth ? (
    <div>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        DELETE
      </Button>
      <Button btnType="Success">EDIT</Button>
    </div>
  ) : null;
  return (
    <div className={classes.item}>
      <h3 className={classes.item__title}>{props.title}</h3>
      <h1 className={classes.item__meta}>{props.price} </h1>
      <img src={props.image} />
      <p>{props.content}</p>
      <Button btnType="Success" clicked={(auth) => (this.auth = !auth)}>
        ADD
      </Button>
      {manger_button}
    </div>
  );
};
export default item;
