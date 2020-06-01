import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("burgerBuilder ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
  });
  it(" shoud render buildcontrol ", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
