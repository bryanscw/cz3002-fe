import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Index from '../components/accounts/LoginPage/index.js';
import { Button, TextField } from '@material-ui/core';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])
const initialState = {}
var store
var component

beforeEach(() => {
  store = mockStore(initialState)
  component = mount(
    <Provider store={store}><Index/></Provider>
  ).find('LoginPage')
  component.handleSubmit = jest.fn()
  component.handleChange = jest.fn()
})

it('matches previous snapshot', () => {
  expect(toJson(component)).toMatchSnapshot()
});

it('has submit button', () => {
  expect(component.find(Button)).toHaveLength(1)
})

it('has two input fields', () => {
  expect(component.find(TextField)).toHaveLength(2)
  // not possible to check field ids due to wrappers
})