import React from 'react';
//Enzyme runs only this component independent from all application
import { configure, shallow } from 'enzyme';//Shallow let us not import child components 
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//connecting enzyme
configure({ adapter: new Adapter() });

//It will be imported when test command is run by.
//first param is the string that will be shown 
//second param function to run for test case
describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => { 
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 <NavigationItem /> elements if authenticated', () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render logout button if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    //enzyme method combined with jest
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});