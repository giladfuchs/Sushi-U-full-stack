import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Sushi Builder</NavigationItem>
    <NavigationItem link="/items">Sushi Combination</NavigationItem>

    {props.isAuth ? (
      <NavigationItem link="/orders"> Orders</NavigationItem>
    ) : null}
    {props.isAuth ? (
      <NavigationItem link="/checkout"> Cart</NavigationItem>
    ) : null}
    {props.isAuth ? (
      <NavigationItem link="/logout"> Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth"> login</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
