import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Index from '../components/accounts/LogoutPage/index.js';
import { Button, TextField } from '@material-ui/core';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])
const initialState = {
  authReducer: {
    access_token: 'token'
  }
}
var store
var component

beforeEach(() => {
  store = mockStore(initialState)
  component = mount(
    <Provider store={store}><Index/></Provider>
  ).find('LogoutPage')
})

it('matches previous snapshot', () => {
  expect(toJson(component)).toMatchSnapshot()
});

it('has return to login button', () => {
  expect(component.find(Button)).toHaveLength(1)
})

it('contains goodbye message', () => {
  expect(component.contains('You have logged out')).toEqual(true)
  expect(component.contains('Thanks for visiting.')).toEqual(true)
})