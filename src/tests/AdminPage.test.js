import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Index from '../components/accounts/AdminPage/index.js';
import { Button, TextField } from '@material-ui/core';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])
const initialState = {
  usersReducer: {
    isLoading: false
  },
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
  ).find('AdminPage')
})

// it('matches previous snapshot', () => {
//   expect(toJson(component)).toMatchSnapshot()
// });

it('has users list', () => {
  expect(component.contains('All Users')).toEqual(true)
})

it('has correct table columns', () => {
  expect(component.contains('Actions')).toEqual(true)
  expect(component.contains('Email')).toEqual(true)
  expect(component.contains('Name')).toEqual(true)
  expect(component.contains('Password')).toEqual(true)
  expect(component.contains('Role')).toEqual(true)
  expect(component.contains('Date of Birth')).toEqual(true)
  expect(component.contains('Gender')).toEqual(true)
})