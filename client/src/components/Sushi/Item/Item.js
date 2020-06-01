import React from "react";

import myStyle from "./Item.css";

const item = (props) => {
  return (
    <div className={myStyle.product}>
      <div className={myStyle.title}>
        <p>{props.title}</p>
        <hr />
      </div>

      <div className={myStyle.image}>
        <img src={props.image} alt="Mountain" />
      </div>

      <div className={myStyle.description}>
        <p>Price: {props.price}</p>
        {props.content}
      </div>

      <div className={myStyle.buttons}>
        <button onClick={() => props.btnAddToCart(props.itemId)}>
          Add to Cart
        </button>
        <button onClick={() => props.btnDelete(props.itemId)}>delete</button>
        <button>edit</button>
      </div>
    </div>
  );
};
export default item;
