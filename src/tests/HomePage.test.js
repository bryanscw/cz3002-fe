import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Index from '../components/common/HomePage/index.js';
import { Button } from '@material-ui/core';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])
const initialState = {
    "authReducer": {
        "userLoading": false,
        "userFailed": false,
        "user": {
            "email": "admin1@test.com",
            "role": "ROLE_ADMIN",
            "name": "admin1",
            "dob": "2005-05-02T00:00:00.000+00:00",
            "gender": "MALE"
        },
        "access_token": "7d7e96c7-044f-4ffd-9c9d-deddb30c5bce",
        "refresh_token": "9a9926d5-a1c0-4ba3-bce5-9cb2c62abf7e",
        "expires_in": 7199,
        "time_token_acquired": "2021-04-02T08:08:51.000Z"
    },
    "usersReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "errorsReducer": {
        "errors": []
    },
    "resultsReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "diagnosisReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "accGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "timeGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    }
}
var store
var component

beforeEach(() => {
  store = mockStore(initialState)
  component = mount(
    <Provider store={store}><Index/></Provider>
  ).find('HomePage')
})

it('matches previous snapshot', () => {
  expect(toJson(component)).toMatchSnapshot()
});

it('contains welcome message', () => {
  expect(component.contains('Trail Making Test')).toEqual(true)
})

it('contains button to dashboard', () => {
    expect(component.find(Button)).toHaveLength(1)
})