import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItem from "../NavigationItems/NavigtionItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  const attachedClasses = props.open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItem isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
