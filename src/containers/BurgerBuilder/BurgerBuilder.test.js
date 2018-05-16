import React from 'react';
//Enzyme runs only this component independent from all application
import { configure, shallow } from 'enzyme';//Shallow let us not import child components 
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

//connecting enzyme
configure({ adapter: new Adapter() });

//It will be imported when test command is run by.
//first param is the string that will be shown 
//second param function to run for test case
describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});